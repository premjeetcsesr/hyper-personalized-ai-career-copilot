const mongoose = require('mongoose');
const { isMemoryStore } = require('../config/db');

// In-memory backing collections for zero-setup demo resilience
const memoryStores = {
  users: new Map(),
  profiles: new Map(),
  skillEvidences: new Map(),
  skillGaps: new Map(),
  roadmaps: new Map(),
  projectMissions: new Map(),
  interviewSessions: new Map(),
  readinessSnapshots: new Map(),
  auditLogs: new Map(),
};

function generateId() {
  return new mongoose.Types.ObjectId().toString();
}

/**
 * Creates a dual-mode model proxy that uses Mongoose if connected,
 * or resilient in-memory collection if MongoDB is disconnected.
 */
function createModelWrapper(modelName, collectionKey, mongooseModel) {
  return {
    get isLiveDb() {
      return !isMemoryStore() && mongoose.connection.readyState === 1;
    },

    async find(filter = {}) {
      if (this.isLiveDb) {
        return mongooseModel.find(filter).lean();
      }
      const items = Array.from(memoryStores[collectionKey].values());
      return items.filter(item => matchFilter(item, filter));
    },

    async findOne(filter = {}) {
      if (this.isLiveDb) {
        return mongooseModel.findOne(filter).lean();
      }
      const items = Array.from(memoryStores[collectionKey].values());
      return items.find(item => matchFilter(item, filter)) || null;
    },

    async findById(id) {
      if (this.isLiveDb) {
        return mongooseModel.findById(id).lean();
      }
      return memoryStores[collectionKey].get(id?.toString()) || null;
    },

    async create(data) {
      if (this.isLiveDb) {
        const doc = await mongooseModel.create(data);
        return doc.toObject();
      }
      const id = data._id ? data._id.toString() : generateId();
      const now = new Date();
      const doc = {
        _id: id,
        ...data,
        createdAt: data.createdAt || now,
        updatedAt: now
      };
      memoryStores[collectionKey].set(id, doc);
      return doc;
    },

    async findByIdAndUpdate(id, update, options = { new: true }) {
      if (this.isLiveDb) {
        return mongooseModel.findByIdAndUpdate(id, update, options).lean();
      }
      const strId = id?.toString();
      const existing = memoryStores[collectionKey].get(strId);
      if (!existing) return null;
      
      const payload = update.$set ? { ...update.$set } : { ...update };
      const updated = {
        ...existing,
        ...payload,
        updatedAt: new Date()
      };
      memoryStores[collectionKey].set(strId, updated);
      return updated;
    },

    async updateOne(filter, update) {
      if (this.isLiveDb) {
        return mongooseModel.updateOne(filter, update);
      }
      const target = await this.findOne(filter);
      if (!target) return { matchedCount: 0, modifiedCount: 0 };
      const payload = update.$set ? { ...update.$set } : { ...update };
      const updated = { ...target, ...payload, updatedAt: new Date() };
      memoryStores[collectionKey].set(target._id.toString(), updated);
      return { matchedCount: 1, modifiedCount: 1 };
    },

    async deleteMany(filter = {}) {
      if (this.isLiveDb) {
        return mongooseModel.deleteMany(filter);
      }
      const items = Array.from(memoryStores[collectionKey].values());
      let count = 0;
      items.forEach(item => {
        if (matchFilter(item, filter)) {
          memoryStores[collectionKey].delete(item._id.toString());
          count++;
        }
      });
      return { deletedCount: count };
    },

    async findOneAndDelete(filter = {}) {
      if (this.isLiveDb) {
        return mongooseModel.findOneAndDelete(filter).lean();
      }
      const item = await this.findOne(filter);
      if (item) {
        memoryStores[collectionKey].delete(item._id.toString());
      }
      return item;
    },

    // In-memory debug / inspect helper
    _getMemoryItems() {
      return Array.from(memoryStores[collectionKey].values());
    },

    _clearMemory() {
      memoryStores[collectionKey].clear();
    }
  };
}

function matchFilter(item, filter) {
  if (!filter || Object.keys(filter).length === 0) return true;
  for (const [key, val] of Object.entries(filter)) {
    if (key === '_id') {
      if (item._id?.toString() !== val?.toString()) return false;
      continue;
    }
    if (typeof val === 'object' && val !== null) {
      if (val.$in && Array.isArray(val.$in)) {
        if (!val.$in.includes(item[key])) return false;
        continue;
      }
      if (val.$ne !== undefined) {
        if (item[key] === val.$ne) return false;
        continue;
      }
    }
    if (item[key]?.toString() !== val?.toString()) {
      return false;
    }
  }
  return true;
}

module.exports = {
  createModelWrapper,
  memoryStores
};

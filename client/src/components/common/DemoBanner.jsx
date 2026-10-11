import React, { useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';
import { useCareerData } from '../../context/CareerDataContext';
import Button from './Button';
import './DemoBanner.css';

export default function DemoBanner() {
  const { resetDemoData } = useCareerData();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setShowConfirm(false);
  };

  return (
    <>
      <aside className="demo-banner" aria-label="Prototype demo status banner">
        <div className="demo-banner__inner">
          <div className="demo-banner__left">
            <span className="demo-banner__pulse">
              <span className="demo-banner__pulse-ring" />
              <span className="demo-banner__pulse-dot" />
            </span>
            <span className="demo-banner__brand-title">AI Career Co-Pilot</span>
            <span className="demo-banner__separator">•</span>
            <span className="demo-banner__subtitle">Evidence-Based Career Intelligence</span>
            <span className="demo-banner__separator hidden sm:inline">•</span>
            <span className="demo-banner__prototype-tag">
              Prototype Mode: Deterministic rubric evaluations & rule-based adaptation
            </span>
          </div>

          <div className="demo-banner__right">
            <span className="demo-banner__learner-pill">
              Demo Learner: Aarav Sharma
            </span>
            <button
              onClick={() => setShowConfirm(true)}
              className="demo-banner__reset-btn"
              aria-label="Reset prototype demo data"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Reset Confirmation Dialog */}
      {showConfirm && (
        <div className="demo-modal-backdrop">
          <div className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="modal-reset-title">
            <div className="demo-modal__header">
              <div className="demo-modal__icon-wrap">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 id="modal-reset-title" className="demo-modal__title">Reset Demo State?</h3>
                <span className="demo-modal__subtitle">Restore default demo learner profile</span>
              </div>
            </div>

            <p className="demo-modal__body">
              This will restore Aarav Sharma's default initial state: Target role set to Full-Stack Developer, HTML & CSS demonstrated, JavaScript probable, React and REST APIs claimed, Database and Testing unknown, and reset mock interview histories.
            </p>

            <div className="demo-modal__actions">
              <Button variant="ghost" size="sm" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleReset}>
                Yes, Reset Demo Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

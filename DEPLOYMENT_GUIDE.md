# 🚀 Deployment Guide: Vercel (Frontend) & Render (Backend)

इस गाइड में आपके प्रोजेक्ट (**Client on Vercel** और **Server on Render**) को आसानी से deploy करने के पूरे स्टेप्स दिए गए हैं।

---

## 📋 Table of Contents
1. [Backend Deployment (Render)](#1-backend-deployment-render)
2. [Frontend Deployment (Vercel)](#2-frontend-deployment-vercel)
3. [Environment Variables Reference](#3-environment-variables-reference)
4. [Testing & Verification](#4-testing--verification)

---

## 1. Backend Deployment (Render)

Render पर Server को Node.js Web Service के रूप में deploy किया जाएगा:

### Steps:
1. **[render.com](https://render.com/)** पर लॉगिन करें।
2. **New +** बटन पर क्लिक करके **Web Service** चुनें (या **Blueprint** चुनकर सीधे `render.yaml` से deploy कर सकते हैं)।
3. अपना GitHub Repository कनेक्ट करें: `hyper-personalized-ai-career-copilot`
4. निम्नलिखित सेटिंग्स भरें:
   - **Name**: `technovoo-career-copilot-backend` (या अपनी पसंद का नाम)
   - **Region**: Oregon (US West) या Frankfurt
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (या `node server.js`)
   - **Instance Type**: Free

5. **Environment Variables** (Render Dashboard में `Environment` टैब में add करें):
   | Key | Value | Note |
   |---|---|---|
   | `NODE_ENV` | `production` | Production mode |
   | `PORT` | `10000` | Render default port |
   | `MONGODB_URI` | `mongodb+srv://<user>:<password>@cluster0.mongodb.net/technova_career_copilot?retryWrites=true&w=majority` | MongoDB Atlas URI (from your server/.env) |
   | `JWT_SECRET` | `technovoo1_super_secure_jwt_secret_key_2026` | Secret for auth tokens |
   | `GEMINI_API_KEY` | `your_gemini_api_key_here` | Gemini API Key (from your server/.env) |
   | `OPENAI_API_KEY` | *(optional)* | OpenAI API key |
   | `GITHUB_TOKEN` | `your_github_token_here` | GitHub token for rate limit extension |
   | `CLIENT_URL` | `https://<your-vercel-app>.vercel.app` | Vercel frontend URL (CORS allowlist) |
   | `ENABLE_DEMO_FALLBACK` | `false` | Live AI & DB |

6. **Create Web Service** पर क्लिक करें।
7. Deploy होने के बाद Render आपको एक URL देगा, जैसे:
   👉 `https://technovoo-career-copilot-backend.onrender.com`
   *(इस URL को कॉपी कर लें, यह Vercel में काम आएगा)*

---

## 2. Frontend Deployment (Vercel)

Vercel पर Client को Vite React App के रूप में deploy किया जाएगा:

### Steps:
1. **[vercel.com](https://vercel.com/)** पर लॉगिन करें।
2. **Add New...** -> **Project** पर क्लिक करें।
3. अपना GitHub Repository (`hyper-personalized-ai-career-copilot`) Import करें।
4. **Project Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client` *(Edit पर क्लिक करके `client` सेलेक्ट करें)*
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables** (Vercel में Environment Variables सेक्शन खोलें):
   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://technovoo-career-copilot-backend.onrender.com` *(Render पर मिला backend URL)* |

   > **Note**: URL के अंत में `/api` लगाने की आवश्यकता नहीं है, कोड अपने आप `/api` जोड़ लेता है।

6. **Deploy** पर क्लिक करें।
7. 1-2 मिनट में Vercel पर साइट लाइव हो जाएगी (उदा. `https://your-project.vercel.app`)।

8. **अंतिम स्टेप (CORS Sync)**:
   Vercel URL को कॉपी करके Render Dashboard में `CLIENT_URL` में डाल दें, ताकि CORS security पूरी तरह sync हो जाए।

---

## 3. Important Features Configured

- ✅ **Vercel SPA Routing (`vercel.json`)**: React Router के सभी routes (जैसे `/dashboard`, `/missions`, `/login`) पेज रिफ्रेश होने पर 404 नहीं होंगे।
- ✅ **Dynamic API Base URL**: `client/src/services/api.js` स्वचालित रूप से `VITE_API_URL` को पहचानता है। लोकल डेवलपमेंट में यह बिना किसी बदलाव के Vite Proxy (`localhost:5000`) पर काम करता है।
- ✅ **Render Reverse Proxy & Cold Start Optimization**:
  - `trust proxy` सेट किया गया है ताकि rate limiting Render load balancers के पीछे सही चले।
  - Axios timeout को 60 सेकंड किया गया है ताकि Render free-tier cold start पर request fail न हो।
- ✅ **Health Check Endpoints**:
  - `/health` और `/api/health` Render zero-downtime health checking के लिए उपलब्ध हैं।
- ✅ **Security & `.gitignore`**:
  - `.env` फाइल्स GitHub पर गलती से पुश न हों, इसके लिए comprehensive `.gitignore` बना दिया गया है।

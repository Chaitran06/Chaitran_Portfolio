# V. Sree Chaitran: Portfolio + AI Assistant

Personal portfolio with two AI features for recruiters:

- **Chaitran AI**: a chat assistant that answers questions about my background, grounded only in my profile.
- **JD Match**: paste a job description and get a weighted fit score (skills 40%, experience 25%, projects 20%, education 15%), matched and missing skills, strengths, gaps and suggested interview questions.

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS. The AI runs in Vercel serverless functions (`/api`) that call Groq (`openai/gpt-oss-120b`, falling back to `openai/gpt-oss-20b` when rate-limited). The API key stays on the server.

## Updating content

Everything on the site **and** everything the AI knows comes from one file: [`src/data/profile.ts`](src/data/profile.ts). Edit it, and both the site and the AI update. Replace `public/V_Sree_Chaitran_Resume.pdf` to update the downloadable resume.

## Run locally

```bash
npm install
cp .env.example .env      # then put your Groq key in .env
npm run dev               # http://localhost:5173
```

The dev server also serves `/api/chat` and `/api/match`, so the AI features work locally exactly as they do on Vercel.

## Deploy to Vercel

1. Push this folder to GitHub (ideally as its own repo, e.g. `portfolio`).
2. Go to <https://vercel.com/new>, sign in with GitHub and **Import** the repo.
   - If the folder lives inside a bigger repo, set **Root Directory** to its path (e.g. `week2/hirechaitran/portfolio`).
   - Vercel detects the Vite framework automatically. Leave the build settings at their defaults.
3. Under **Environment Variables**, add `GROQ_API_KEY` = your key from <https://console.groq.com/keys>.
4. Click **Deploy**. You'll get a URL like `https://<project-name>.vercel.app`.
   Pick a clean project name (e.g. `sreechaitran`) to get a nice URL. You can change it later under Settings → Domains.

Every `git push` redeploys automatically.

## Limits

Groq's free tier allows about 8,000 tokens per minute per model, which is roughly two JD analyses per minute on `gpt-oss-120b`, plus more on the fallback model. That's enough for recruiter traffic. If you ever need more, upgrade the Groq tier. Each API also has a basic per-IP rate limit and input-size caps.

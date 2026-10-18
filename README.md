# SkillMitra

### Your personalized learning guide

SkillMitra is a learning and career-readiness platform prototype that helps students see their skill gaps, follow a role-focused learning roadmap, practice through projects, and track progress toward a career goal.

**[Open the live demo](https://skillmitra-learning-hub.netlify.app/)** · **[View the GitHub repository](https://github.com/oneANSHUMAN07/SkillMitra)**

> SkillMitra is a hackathon prototype. Student and partner dashboards use curated demo data; progress is saved in the browser. Live YouTube search is available for SQL learning when the Netlify environment variable is configured.

## Preview

### Landing page

![SkillMitra landing page](screenshots/multi_muqt76sf-flwu/01.jpg)

## What you can explore

- **Student dashboard:** career-readiness score, skill overview, learning progress, and suggested next steps.
- **Animated landing hero:** staggered headline reveal with a moving glow, floating dashboard preview, and gentle CTA motion.
- **Skill analysis and gaps:** compare a learner's current profile with the skills associated with a target role.
- **Personalized roadmap:** explore learning paths for Data Analyst and other career goals, with courses, videos, and practice.
- **Projects and assessments:** work through sample projects and assessments that demonstrate the validation flow.
- **Career readiness:** see progress toward the selected role and the skills still to build.
- **Institution and industry views:** preview cohort insights and role requirements.
- **Responsive mobile navigation:** open the compact sidebar drawer from the top bar when needed.
- **Ask SkillMitra:** try the in-app learning assistant panel.
- **Live SQL videos:** fetch current public YouTube videos through a Netlify Function when configured.

## Try the demo

Open the [live demo](https://skillmitra-learning-hub.netlify.app/) and choose a demo workspace from the login screen. No account is needed to explore the prototype.

## Run locally

This project uses Vite to bundle the React app and Netlify Functions to provide live YouTube search.

1. Install [Node.js](https://nodejs.org/) and the Netlify CLI:

   ```bash
   npm install --global netlify-cli
   ```

2. Clone the repository and enter the project folder:

   ```bash
   git clone https://github.com/oneANSHUMAN07/SkillMitra.git
   cd SkillMitra
   ```

3. Install dependencies, then sign in to Netlify CLI and link the folder to the Netlify site if prompted:

   ```bash
   npm install
   netlify login
   netlify link
   ```

4. Start the local site:

   ```bash
   netlify dev
   ```

   Netlify CLI prints the local URL when the site is ready. The main prototype can be explored without an API key; live SQL video search needs the setup below.

## Configure live YouTube search

The SQL learning page calls `/.netlify/functions/youtube-search`. The function reads `YOUTUBE_API_KEY` on the server and never needs the key in browser code.

1. Enable **YouTube Data API v3** in Google Cloud and create a restricted API key.
2. For local development, put the key in a root `.env` file (already ignored by Git):

   ```env
   YOUTUBE_API_KEY=your_restricted_api_key
   ```

3. For the deployed site, add `YOUTUBE_API_KEY` under the site's **Netlify environment variables**, then redeploy.

Never commit `.env` or put the key in frontend code. Restrict the key to YouTube Data API v3. If a key has ever been committed or shared, revoke it and create a new one.

## Deploy to Netlify

The included [`netlify.toml`](netlify.toml) sets the build command to `npm run build`, publishes the generated `dist` folder, and discovers functions in `netlify/functions`. Connect the GitHub repository containing this project to Netlify; use the repository root as the base directory. If Netlify asks for build settings, enter:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `netlify/functions`

Add `YOUTUBE_API_KEY` in the Netlify site's environment variables to enable live SQL video search. The site itself can deploy without this key; only live YouTube search needs it.

## Project structure

```text
.
├── app/                 # React UI, pages, styles, and demo data
├── assets/img/          # Image assets
├── netlify/functions/   # Server-side YouTube search function
├── screenshots/         # Project previews
├── index.html           # Frontend entry point
└── netlify.toml          # Netlify publish and function settings
```

## Built with

- React 18 and JavaScript
- CSS
- Netlify Functions
- YouTube Data API v3


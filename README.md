# Worship Song Manager

A simple web app for church worship teams to manage songs, track usage, get recommendations, and search YouTube.

## Tech Stack

- **Next.js 14** (App Router) with TypeScript
- **Prisma** with SQLite for the database
- **React** for UI components
- Simple CSS (no framework) – easy to extend later

## Features

1. **Song management** – Add, edit, view songs with title, artist, key, tags, lyrics, notes
2. **Service tracking** – Record which songs were used in each service
3. **Play tracking** – Automatically updates `lastPlayedDate` and `playCount`
4. **Recommendations** – Shows songs that haven't been played recently
5. **YouTube search** – Search for videos by song title (requires API key)

---

## Getting Started (Local Development)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

Copy the example environment file and generate Prisma client:

```bash
# The .env file should already exist, but if not:
cp .env.example .env

# Generate Prisma client and create the SQLite database
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## YouTube API Setup (Optional)

To enable YouTube search:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or use an existing one)
3. Enable the **YouTube Data API v3**
4. Create an API key under **APIs & Services > Credentials**
5. Add the key to your `.env` file:

```env
YOUTUBE_API_KEY="your_api_key_here"
```

If not configured, the app still works – the YouTube section will show a friendly message.

---

## Project Structure

```
Louvor/
├── prisma/
│   └── schema.prisma      # Database schema (Song, Service, ServiceSong)
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   │   ├── songs/     # CRUD for songs
│   │   │   ├── services/  # Create services with songs
│   │   │   ├── recommendations/
│   │   │   └── youtube-search/
│   │   ├── songs/         # Song pages (list, detail, edit, new)
│   │   ├── recommendations/
│   │   ├── youtube/
│   │   ├── layout.tsx     # Root layout with navbar
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   ├── layout/        # Navbar
│   │   ├── home/          # LatestServiceSection
│   │   ├── songs/         # SongForm
│   │   └── youtube/       # YouTubeSearchClient
│   └── lib/
│       └── prisma.ts      # Prisma client singleton
├── .env                   # Environment variables (not committed)
├── .env.example           # Example env file
├── package.json
├── tsconfig.json
└── next.config.mjs
```

---

## Deployment (Free Hosting with Custom Domain)

### Option 1: Vercel (Recommended for Next.js)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/Louvor.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click **"New Project"** and import your repository

4. Configure environment variables:
   - `DATABASE_URL` = `file:./dev.db`
   - `YOUTUBE_API_KEY` = your key (optional)

5. Deploy! Vercel will build and host your app.

6. **Custom domain**: In your Vercel project settings, go to **Domains** and add your custom domain. Update your domain's DNS to point to Vercel.

> **Note**: SQLite works for small-scale use. For production with multiple users, consider switching to a hosted database like [Turso](https://turso.tech/) (SQLite-compatible) or PostgreSQL on [Supabase](https://supabase.com/) / [Neon](https://neon.tech/).

### Option 2: Netlify

1. Push to GitHub (same as above)

2. Go to [netlify.com](https://netlify.com) and sign in

3. Click **"Add new site"** > **"Import an existing project"**

4. Select your GitHub repo

5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

6. Add environment variables in **Site settings > Environment variables**

7. **Custom domain**: In **Domain settings**, add your custom domain and configure DNS.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/songs` | List all songs |
| POST | `/api/songs` | Create a song |
| GET | `/api/songs/:id` | Get song details |
| PUT | `/api/songs/:id` | Update a song |
| DELETE | `/api/songs/:id` | Delete a song |
| GET | `/api/services` | List all services |
| POST | `/api/services` | Create a service with songs |
| GET | `/api/recommendations` | Get top 10 least-played songs |
| GET | `/api/youtube-search?q=query` | Search YouTube |

---

## Extending the App

### Adding new fields to Song

1. Edit `prisma/schema.prisma` – add your field to the `Song` model
2. Run `npx prisma migrate dev --name add_field_name`
3. Update `SongForm.tsx` to include the new field
4. Update API routes if needed

### Adding new pages

1. Create a new folder in `src/app/` (e.g., `src/app/setlists/`)
2. Add a `page.tsx` file
3. Add a link in `Navbar.tsx`

### Improving styling

- Edit `src/app/globals.css` or add Tailwind CSS
- Components are structured for easy styling updates

---

## Commands Reference

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npx prisma studio    # Open Prisma database GUI
npx prisma migrate dev --name <name>  # Create migration
```

---

## License

MIT – Use freely for your church or worship team!

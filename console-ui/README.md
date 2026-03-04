# AI Content Generator - Frontend

Next.js-based web application for generating blogs, Instagram captions, and YouTube descriptions from any topic using AI.

## Tech Stack

- **Framework**: Next.js 16 (Pages Router)
- **UI Library**: Material-UI (MUI)
- **Styling**: Bootstrap, Emotion
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
console-ui/
├── components/
│   ├── layout/          # Main layout component
│   └── ui/              # Reusable UI components
├── pages/
│   ├── api/             # API routes
│   ├── _app.tsx         # App wrapper
│   └── index.tsx        # Home page
├── styles/              # Global styles
└── public/              # Static assets
```

## Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables** (`.env`):
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

3. **Run development server**:
```bash
npm run dev
```

4. **Open browser**:
Navigate to `http://localhost:3000`

## Features

- Generate blog content from bullet points
- Create Instagram captions
- Generate YouTube descriptions
- Support for any topic (travel, fitness, lifestyle, etc.)
- Real-time AI content generation
- Responsive design with Material-UI

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Dependencies

- **@mui/material**: UI components
- **react-markdown**: Markdown rendering
- **lucide-react**: Icon library
- **bootstrap**: CSS framework

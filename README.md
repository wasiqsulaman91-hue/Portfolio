# Wasiq's Portfolio

A personal portfolio website built to showcase my projects, experience, and skills as a Computer Engineering student.

🔗 **Live site:** _add your deployed URL here_

## Built With

- **[TanStack Start](https://tanstack.com/start)** — full-stack React framework
- **[TanStack Router](https://tanstack.com/router)** — type-safe file-based routing
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Radix UI** — accessible headless component primitives
- **GSAP** — scroll-triggered animations
- **Supabase** — backend/auth integration
- **Vite** — dev server & build tool

## Sections

- **Hero** — introduction
- **About** — skills overview
- **Experience** — work history and certifications
- **Projects** — a showcase of six builds, including:
  - Vertex Job Portal
  - Noodle of Doom (arcade snake game)
  - Social Network Analyzer
  - Library Management System
  - Voice AI Ordering Agent
  - Code Claw Machine
- **Contact** — get in touch form

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended) or [Bun](https://bun.sh/)

### Installation

```bash
# Clone the repository
git clone <this-repository-url>
cd Portfolio

# Install dependencies
bun install
# or
npm install
```

### Environment Variables

Create a `.env` file in the root directory with your Supabase credentials:

```
SUPABASE_PROJECT_ID=your_project_id
SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=your_supabase_url
```

### Running Locally

```bash
bun dev
# or
npm run dev
```

The app will be available at `http://localhost:8080`.

### Build for Production

```bash
bun run build
# or
npm run build
```

## Project Structure

```
src/
├── components/       # Page sections (Hero, About, Experience, Projects, Contact, Nav, Footer)
├── assets/           # Images, PDFs, and other static files
├── integrations/     # Supabase client & auth setup
├── lib/              # Utility functions
├── routes/           # TanStack Router route files
└── styles.css        # Global styles
```

## Author

**Wasiq**
Computer Engineering Student, COMSATS University Islamabad, Lahore Campus

- GitHub: [@wasiqsulaman91-hue](https://github.com/wasiqsulaman91-hue)
- LinkedIn: [wasiqsulaman](https://www.linkedin.com/in/wasiqsulaman)

## License

This project is open source. Feel free to explore the code, but please don't copy the content/design directly for your own portfolio.

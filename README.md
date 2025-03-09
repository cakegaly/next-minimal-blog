# Next.js Minimal Blog Template

A lightweight, minimalistic blog template built with Next.js 15, MDX, Tailwind CSS, and shadcn/ui.

---

## Tech Stack

- **[Next.js](https://nextjs.org/)** – App Router, v15
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** – Beautiful, customizable UI components
- **[MDX](https://mdxjs.com/)** – Markdown + React components
- **[Rehype Pretty Code](https://rehype-pretty.pages.dev/)** – Code syntax highlighting
- **[Vercel](https://vercel.com/)** – Hosting & deployment
- **ESLint** + **Prettier** – Code formatting & linting
<!-- - **[Storybook](https://storybook.js.org/)** – UI component testing -->

## Project Philosophy

This project follows a **minimalist approach** to building a **Next.js-based MDX blog**.

- **Official-First**: Uses only **official Next.js libraries** whenever possible.
- **Minimal & Fast**: Keeps dependencies **lightweight** and **performance-focused**.

## Running Locally

Follow these steps to set up and run the project on your local machine.

### Clone the repository

```sh
git clone git@github.com:cakegaly/next-minimal-blog.git
cd next-minimal-blog
```

### Install dependencies & set up environment variables

```sh
pnpm install
cp .env.example .env.local
```

### Build the project

```sh
pnpm build
```

### 4️. Start the development server

```sh
pnpm dev
```

### 5️. Open in your browser

Visit **[http://localhost:8888](http://localhost:8888)** to see the site in action 🎅

<!-- ### 6️. Run Storybook

```sh
pnpm storybook
```

### 7️. Open Storybook

Visit **[http://localhost:6006](http://localhost:6006)** to preview UI components. -->

## Deployment

This project is automatically deployed on **[Vercel](https://vercel.com/)** using Static Site Generation (SSG).

## License

This project is licensed under the **MIT License**.

---

If you find this project useful, consider giving it a ⭐ on GitHub!

# Next.js Minimal Blog Template

![next-minimal-blog og image](/src/app/opengraph-image.png)

This is a lightweight, minimalistic blog template built with Next.js 15, MDX, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **[Next.js](https://nextjs.org/)** – App Router, v15.2.3
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** – Beautiful, customizable UI components
- **[MDX](https://mdxjs.com/)** – Markdown + React components
- **[Rehype Pretty Code](https://rehype-pretty.pages.dev/)** – Code syntax highlighting with customizable themes
- **[Vercel](https://vercel.com/)** – Hosting & deployment
- **ESLint** + **Prettier** (Flat Config) – Code formatting & linting

## Project Philosophy

This project follows a **minimalist approach** to building a **Next.js-based MDX blog**.

- **Official-First**: Prioritize using **official Next.js libraries** to ensure stability and maintainability.
- **Minimal & Fast**: Keep the project **lightweight and fast**, avoiding unnecessary dependencies.

## Running Locally

Follow these steps to set up and run the project on your local machine.

### Clone the repository

```sh
git clone git@github.com:cakegaly/next-minimal-blog.git
cd next-minimal-blog
```

### Install dependencies & Set up environment variables

```sh
pnpm install
cp .env.example .env.local
```

### Build the project

```sh
pnpm build
```

### Start the development server

```sh
pnpm dev
```

### Open in your browser

Visit **[http://localhost:8888](http://localhost:8888)** to see the site in action 🎅

## Deployment

This project is automatically deployed on **[Vercel](https://next-minimal-blog-delta.vercel.app/)**.

## License

This project is licensed under the **MIT License**.

## Thanks

This project was inspired by and heavily influenced by the following open-source projects:

- [shadcn/taxonomy](https://github.com/shadcn-ui/taxonomy) – A well-structured and minimal approach to building content-driven applications with Next.js and shadcn/ui.
- [astro-nomy](https://github.com/mickasmt/astro-nomy) – A beautifully designed Astro blog template that influenced the content and design philosophy of this project.

---

If you find this project useful, feel free to give it a ⭐ on GitHub!

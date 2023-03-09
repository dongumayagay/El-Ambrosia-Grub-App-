El Ambrosia Ordering and Supply Management System (GrubApp)
===========================================================

GrubApp is an online web-based ordering and supply management system developed by Software Corps for El Ambrosia, a small starting shawarma business. The system is built using SvelteKit, TailwindCSS, DaisyUI, and Supabase. It also uses PostgreSQL as the database, Vite as the bundler and web server, and PNPM as the package manager. Additionally, it utilizes Playwright for end-to-end testing, Sentry.io for error monitoring, Vercel for deployment and analytics, Xendit for payment, Nodemailer and Gmail for email notifications, and ChecklyHQ for running E2E tests.

Technologies Used
-----------------

GrubApp is built using the following technologies:

- [SvelteKit](https://kit.svelte.dev/) - A framework for building web applications using Svelte.
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for building custom designs.
- [DaisyUI](https://daisyui.com/) - A component library for TailwindCSS that provides ready-to-use UI components.
- [Supabase](https://supabase.io/) - An open-source alternative to Firebase that provides a PostgreSQL database and serverless functions.
- [PostgreSQL](https://www.postgresql.org/) - An open-source relational database management system.
- [Vite](https://vitejs.dev/) - A build tool and development server that serves the project at lightning-fast speeds.
- [PNPM](https://pnpm.io/) - A fast and space-efficient package manager for JavaScript projects.
- [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that adds static typing to the language.
- [Playwright](https://playwright.dev/) - A Node.js library for browser automation that provides end-to-end testing capabilities.
- [Xendit](https://www.xendit.co/) - A payment gateway that allows customers to pay for orders securely and seamlessly.
- [Nodemailer](https://nodemailer.com/about/) - A Node.js library for sending emails.
- [Sentry](https://sentry.io/) - A platform for error monitoring and performance tracking.
- [Vercel](https://vercel.com/) - A cloud platform for deploying web projects.
- [Vercel Analytics](https://vercel.com/docs/analytics) - A web analytics tool for monitoring project performance.
- [Checkly](https://checklyhq.com/) - A platform for running end-to-end tests on web applications.
- [Vitest](https://vitest.dev/) - A lightweight and flexible testing library for JavaScript and TypeScript.
GrubApp is built using the following technologies:

Installation
------------

1. Clone this repository
2. Install pnpm: `npm install -g pnpm`
3. Install dependencies: `pnpm install`
4. Rename the `.env.example` file to `.env`
5. Update the environment variables in the `.env` file to match your Supabase credentials, Xendit API keys, and Nodemailer settings
6. Start the development server: `pnpm run dev`
7. Navigate to `http://localhost:5173` in your browser

Features
--------

GrubApp includes the following features:

- User authentication using Supabase
- Online ordering system for customers
- Real-time tracking of orders and inventory using Supabase Realtime
- Automated email notifications using Nodemailer with Gmail
- Detailed reporting and analytics using Supabase SQL and Vercel Analytics
- Integration with Xendit to accept online payments
- Uses Tailwind CSS with DaisyUI for easy and customizable styling
- E2E testing with Playwright using Checkly
- Error monitoring with Sentry
- Typescript for type checking

File Structure
--------------

```code
├── lib/components/   # Reusable Svelte components
├── src/routes/       # SvelteKit pages and and api routes
├── static/       # Static assets (e.g. images)
├── tailwind.config.js  # Tailwind CSS configuration file
└── vercel.json   # Vercel deployment configuration file
```

API Documentation
-----------------

GrubApp includes the following serverless functions:

- `sendConfirmationEmail`: Sends a confirmation email to the customer when they place an order.
- `updateInventory`: Updates the inventory in real-time when an order is placed.

Deployment
----------

GrubApp is deployed on Vercel. To deploy your own version of GrubApp:

1. Create an account on [Vercel](https://vercel.com/)
2. Create a new project in Vercel
3. Follow the steps to link your Github repository to your Vercel project
4. Update the environment variables in your Vercel project settings to match your Supabase credentials, Xendit API keys, and Nodemailer settings
5. Deploy the project

Testing
-------

GrubApp includes e2e tests using Playwright with [Checkly](https://www.checklyhq.com/). To run the tests:

1. Ensure that the development server is running: `pnpm run dev`
2. Run the tests: `pnpm run test:e2e`

Error Monitoring
----------------

GrubApp uses Sentry for error monitoring. To set up Sentry:

1. Create an account on [Sentry](https://sentry.io/)
2. Follow the instructions to set up a new project in Sentry
3. Update the `SENTRY_DSN` environment variable in the `.env` file with your Sentry DSN
4. Deploy the project to see errors in Sentry

Analytics
---------

GrubApp uses Vercel Analytics for detailed reporting and analytics. To view the analytics:

1. Log in to your Vercel account
2. Navigate to your project's dashboard
3. Click on the Analytics tab to view your analytics data

Contribution Guidelines
-----------------------

We welcome contributions from everyone! Please follow the guidelines below when contributing to GrubApp:

1. Fork the repository and create a new branch for your changes
2. Make your changes and commit them with a descriptive commit message
3. Push your changes to your forked repository
4. Create a pull request from your forked repository to this repository's main branch
5. Wait for your changes to be reviewed and merged

License
-------

GrubApp is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

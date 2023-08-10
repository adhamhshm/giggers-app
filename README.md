This is a Dribble clone project via an online tutorial. The application can allow you to showcase your work and get hired without hassle. The application was deployed on Vercel. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will need to use [Grafbase](https://grafbase.com/) for this application. In this project, the Grafbase setup as below:

```bash
# to install Grafbase to project
npm install @grafbase/sdk --save-dev

# to initialize setup
npx grafbase init --config-format typescript

# to start dev environment via http://127.0.0.1:4000
npx grafbase@0.24 dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


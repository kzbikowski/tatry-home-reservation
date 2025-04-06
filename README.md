# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2e1177fa-f500-4240-b5c0-f46539f2c098

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2e1177fa-f500-4240-b5c0-f46539f2c098) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2e1177fa-f500-4240-b5c0-f46539f2c098) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Local Development with API Functions

To run the project locally with working API functions:

1. Install the required dependencies for the API server:
   ```
   npm install express cors dotenv
   ```

2. Run the frontend and API server in separate terminals:
   
   **Terminal 1** - Frontend development server:
   ```
   npm run dev
   ```
   
   **Terminal 2** - API development server:
   ```
   npm run api:dev
   ```

The frontend will run on port 3000 (or another port if 3000 is busy) and the API server will run on port 3001.

Make sure your `.env` file contains all required environment variables, including `RESEND_API_KEY`.

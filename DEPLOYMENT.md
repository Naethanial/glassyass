# GitHub Pages Deployment Guide

This guide explains how to deploy the liquid-glass-example to GitHub Pages.

## Prerequisites

1. Your repository should be named `liquidglassreact-true` (or update the `basePath` in `next.config.ts`)
2. GitHub Pages should be enabled in your repository settings

## Setup Steps

### 1. Repository Setup

1. Push your code to a GitHub repository named `liquidglassreact-true`
2. Go to your repository settings
3. Navigate to "Pages" section
4. Under "Source", select "GitHub Actions"

### 2. Configuration Files

The following files have been configured for GitHub Pages deployment:

- **`next.config.ts`**: Configured for static export with proper base path
- **`.github/workflows/deploy.yml`**: GitHub Actions workflow for automated deployment
- **`public/.nojekyll`**: Prevents Jekyll processing
- **`package.json`**: Updated with export script

### 3. Deployment

The deployment is automatic:

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Your site will be available at: `https://[username].github.io/liquidglassreact-true/`

### 4. Manual Deployment

You can also trigger deployment manually:

1. Go to the "Actions" tab in your repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

## Local Development

For local development, the site will run normally:

```bash
npm run dev
```

The base path configuration only applies to production builds.

## Build for Production

To test the production build locally:

```bash
npm run build
```

This will create an `out` directory with the static files.

## Troubleshooting

1. **404 errors**: Ensure the repository name matches the `basePath` in `next.config.ts`
2. **Broken styles**: Make sure all assets use relative paths
3. **Build failures**: Check the Actions tab for detailed error logs

## Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the `public` directory with your domain name
2. Update the `basePath` and `assetPrefix` in `next.config.ts` to use your custom domain
3. Configure your DNS settings to point to GitHub Pages 
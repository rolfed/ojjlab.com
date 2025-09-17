# GitHub Pages Deployment Guide

## Overview

This project is configured for automated deployment to GitHub Pages using GitHub Actions. The setup includes:

- Static site hosting via GitHub Pages
- Automated build and deployment with GitHub Actions
- Contact form integration with Formspree
- Hash-based routing for GitHub Pages compatibility

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Source: Select "GitHub Actions"
4. Save the configuration

### 2. Configure Formspree (Contact Form)

1. Go to [Formspree.io](https://formspree.io) and create a free account
2. Create a new form for "Oregon Jiu Jitsu Lab"
3. Copy your form endpoint (e.g., `https://formspree.io/f/xyzypgko`)
4. Update the form action in `src/templates/contact.html` with your endpoint
5. Configure email settings in Formspree dashboard

### 3. Custom Domain (Optional)

If you want to use a custom domain (e.g., ojjlab.com):

1. Purchase domain from a registrar
2. In GitHub repository: Settings → Pages → Custom domain
3. Enter your domain name (e.g., ojjlab.com)
4. Update DNS records at your registrar:

   ```
   Type: CNAME
   Name: www
   Value: username.github.io

   Type: A
   Name: @
   Values:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

5. Update the `_next` URL in contact form to use your custom domain

## Deployment Process

### Automatic Deployment

- Push to `main` branch triggers automatic deployment
- GitHub Actions builds the site with Vite
- Deploys to GitHub Pages automatically
- Site is available at: `https://username.github.io/ojjlab.com/`

### Manual Testing

To test the build locally:

```bash
npm run build
npm run preview
```

## Configuration Details

### Router Configuration

- Uses hash-based routing (`#/contact`) for GitHub Pages compatibility
- Routes are defined in `src/main.ts`
- Template loading handled by custom router

### Build Configuration

- Vite configured for GitHub Pages in `vite.config.ts`
- Base path set to `/ojjlab.com/` for GitHub Pages
- Production builds to `dist/` directory

### Contact Form Features

- Formspree integration for email delivery
- Success message handling
- Spam protection with honeypot field
- Professional email formatting

## Cost Breakdown

- GitHub Pages: **Free**
- Custom Domain: ~$12-15/year
- Formspree: **Free** for up to 50 submissions/month
- **Total: ~$1-2/month**

## Next Steps After Deployment

1. **Test the contact form** by submitting a test message
2. **Verify email delivery** in your Formspree dashboard
3. **Set up Google Analytics** (optional) for traffic tracking
4. **Configure SEO** by updating meta tags in templates
5. **Add sitemap.xml** for better search engine indexing

## Troubleshooting

### Common Issues

- **404 on direct URL access**: Hash routing prevents this issue
- **Form not working**: Check Formspree endpoint URL
- **Build failures**: Check GitHub Actions logs in Actions tab
- **Styling issues**: Verify Tailwind CSS is building correctly

### Support Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Formspree Documentation](https://help.formspree.io/)
- [Vite Documentation](https://vitejs.dev/guide/)

## Monitoring

- GitHub Actions provide build status and logs
- Formspree dashboard shows form submission statistics
- GitHub Pages provides basic traffic analytics

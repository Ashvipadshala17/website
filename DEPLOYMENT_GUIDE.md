# 🚀 Complete Deployment Guide - Vercel

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Add Your Content

### Photos
- Place photos in `/public/images` folder
- Name them: `1.jpg`, `2.jpg`, `3.jpg`, etc.
- Recommended size: 800x800px

### Music
- Place `happy-birthday.mp3` in `/public` folder
- Optional: Add `celebration.mp3` for candle sound

### Letter
- Edit `/public/letter.txt` with your personal message

## Step 3: Test Locally

```bash
npm run dev
```

Open http://localhost:3000 and test all features.

## Step 4: Deploy to Vercel

### Option A: Vercel CLI (Easiest)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? [Your account]
   - Link to existing project? **N**
   - Project name: `moxa-birthday-surprise`
   - Directory: `./`
   - Override settings? **N**

5. Your site is live! 🎉

### Option B: Vercel Dashboard

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Add New Project"
4. Import your repository
5. Click "Deploy"

### Option C: Drag & Drop

1. Build the project:
```bash
npm run build
```

2. Go to https://vercel.com
3. Drag the `dist` folder to the dashboard
4. Your site deploys instantly

## Step 5: Get Your URL

After deployment, Vercel will provide:
- Primary URL: `https://moxa-birthday-surprise.vercel.app`
- Custom domain option available

## Step 6: Generate QR Code

1. Open your deployed website
2. Wait 3 seconds for QR code to appear (bottom-left)
3. Click "Download QR" button
4. Share with Moxa!

## Step 7: Update QR Code (If URL Changes)

The QR code automatically uses the current URL. If you change domains:
1. Open the new URL
2. Download the new QR code
3. Replace the old one

## Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Fails
- Check all files are committed to Git
- Verify package.json is correct
- Ensure no syntax errors

### Music Not Playing
- Verify audio files are in `/public` folder
- Check file names match exactly
- Test audio files play locally

### Photos Not Loading
- Ensure photos are in `/public/images` folder
- Check file names: `1.jpg`, `2.jpg`, etc.
- Verify file formats (jpg, jpeg, png, gif, webp)

## Custom Domain (Optional)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Production Checklist

- [ ] Dependencies installed
- [ ] Photos added to `/public/images`
- [ ] Music files added to `/public`
- [ ] Letter customized in `/public/letter.txt`
- [ ] Tested locally with `npm run dev`
- [ ] Deployed to Vercel
- [ ] QR code downloaded
- [ ] Tested on mobile devices
- [ ] Shared with Moxa! 🎂

## Support

If you encounter issues:
- Check Vercel deployment logs
- Verify all files are in correct locations
- Test with different browsers
- Ensure mobile devices are tested

## Success! 🎉

Your birthday surprise website is now live and ready to share with Moxa!

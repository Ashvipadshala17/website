# 🎂 Moxa's Birthday Surprise Website

A beautiful, interactive birthday surprise website for Moxa with animations, music, photo gallery, cake cutting, and more!

## ✨ Features

- 🎵 **Music Player** - Play/Pause controls with volume adjustment
- 🎬 **Landing Page** - Floating hearts, sparkles, and typewriter animation
- 📸 **Photo Gallery** - Heart-shaped frames with carousel slider
- 🎂 **Birthday Cake** - Blow candles and cut the cake with animations
- 💌 **Envelope Letter** - Open to reveal a heartfelt message
- 🎆 **Final Surprise** - Fireworks and emotional ending
- 📱 **Mobile Optimized** - Works perfectly on all devices
- 📱 **QR Code** - Share the website easily

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add your photos:
   - Place your photos in `/public/images` folder
   - Name them: `1.jpg`, `2.jpg`, `3.jpg`, etc.
   - Supported formats: jpg, jpeg, png, gif, webp

3. Add birthday music:
   - Place `happy-birthday.mp3` in `/public` folder
   - Optional: Add `celebration.mp3` for candle blowing sound

4. Customize the letter:
   - Edit `/public/letter.txt` with your personal message

5. Run locally:
```bash
npm run dev
```

6. Open http://localhost:3000

## 📦 Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - Project name: `moxa-birthday-surprise` (or your choice)
   - Directory: `./`
   - Settings: Use defaults

5. Your website will be live at: `https://moxa-birthday-surprise.vercel.app`

### Method 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Click "Deploy"
6. Wait for deployment to complete

### Method 3: Drag and Drop

1. Build the project:
```bash
npm run build
```

2. Go to [vercel.com](https://vercel.com)
3. Drag the `dist` folder to the dashboard
4. Your site will be deployed instantly

## 📱 QR Code Generation

After deployment:

1. Open your deployed website
2. The QR code will appear in the bottom-left corner
3. Click "Download QR" to save it
4. Share the QR code with Moxa!

The QR code automatically points to your deployed URL and can be scanned with any phone camera.

## 🎵 Music Files

### Required:
- `happy-birthday.mp3` - Main birthday song

### Optional:
- `celebration.mp3` - Sound effect when blowing candles

Place these files in the `/public` folder.

### Free Music Sources:
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- [Free Music Archive](https://freemusicarchive.org)
- [Pixabay Music](https://pixabay.com/music)

## 📸 Photo Guide

1. Resize photos to 800x800px (square) for best results
2. Name them sequentially: `1.jpg`, `2.jpg`, `3.jpg`, etc.
3. Place in `/public/images` folder
4. The gallery will automatically load all photos

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` to customize the color scheme.

### Modify Text
Edit component files in `/src/components` to change messages.

### Add More Animations
Components use Framer Motion - check their docs for more animations.

## 📱 Mobile Testing

Test on:
- Android Chrome
- Samsung Internet
- Safari (iPhone)
- Edge Mobile

The site is fully responsive and optimized for all screen sizes.

## 🐛 Troubleshooting

### Music not playing?
- Modern browsers block autoplay - the "Open Your Birthday Surprise" button handles this
- Ensure music files are in `/public` folder
- Check file names match exactly

### Photos not showing?
- Ensure photos are in `/public/images` folder
- Check file names are numbered: 1.jpg, 2.jpg, etc.
- Verify file formats are supported

### QR code not working?
- Ensure website is deployed (not localhost)
- QR code appears 3 seconds after opening the site
- Check the URL is correct

## 📄 License

This project is created for personal use.

## ❤️ Made with Love

For Moxa's Special Day! 🎂✨

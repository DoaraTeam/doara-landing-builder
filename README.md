# 🚀 Multi Landing Page Builder

A powerful, flexible CMS platform for creating and managing multiple landing pages. Built with Next.js 14, TypeScript, and TailwindCSS.

## ✨ Features

- **🎨 Multiple Landing Pages** - Manage unlimited landing pages from one dashboard
- **📱 Fully Responsive** - Mobile-first design that looks great on all devices
- **🎭 Multiple Themes** - Modern, Dark, and Minimal themes included
- **🧩 Component Library** - Hero, Features, Pricing, Testimonials, CTA, Footer
- **⚡ Server-Side Rendering** - Fast page loads with Next.js SSR
- **🔍 SEO Optimized** - Built-in SEO configuration for each page
- **💾 JSON Configuration** - Simple file-based data storage
- **🎯 Type-Safe** - Full TypeScript support

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser:

- **Admin Dashboard**: http://localhost:3000/admin
- **Landing Pages**:
  - http://localhost:3000/saas-platform
  - http://localhost:3000/ai-startup
  -...

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── public/
│   ├── data/
│   │   └── landing-config.json     # All pages configuration
│   └── assets/images/              # Uploaded images
├── src/
│   ├── app/
│   │   ├── admin/                  # Admin dashboard
│   │   ├── landing/[slug]/         # Public landing pages (SSR)
│   │   └── api/                    # API routes
│   ├── components/
│   │   ├── landing/                # Landing components
│   │   └── ui/                     # UI components (shadcn)
│   ├── types/
│   │   └── landing.ts              # TypeScript types
│   └── lib/

```

## 🎨 Available Components

- **Hero** - Eye-catching headers with CTAs
- **Features** - Showcase features in grid/list layout
- **Pricing** - Display pricing plans and tiers
- **Testimonials** - Customer reviews with ratings
- **CTA** - Call-to-action sections
- **Footer** - Multi-column footer with social links

## 🎭 Themes

- **Modern** - Clean, professional blue theme
- **Dark** - Sleek dark mode with indigo accents
- **Minimal** - Simple black & white design

## 📖 Documentation

For detailed development instructions, see [BOT-DEVELOPMENT-GUIDE.md](./BOT-DEVELOPMENT-GUIDE.md)

Topics covered:

- Adding new components
- Creating pages
- Theme customization
- Type system
- Best practices
- Testing checklist

## 🔧 Configuration

All configuration is stored in `public/data/landing-config.json`. Edit this file to:

- Add/edit pages
- Configure components
- Customize themes
- Update SEO settings

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI**: shadcn/ui
- **Icons**: Lucide React

## 🎯 Roadmap

- [ ] Visual drag & drop editor
- [ ] Real-time preview
- [ ] Advanced component editor
- [ ] Image upload UI
- [ ] Theme customization panel
- [ ] Page duplication
- [ ] Export/Import
- [ ] Analytics integration

## 📝 License

MIT License

---

**Built with ❤️ using Next.js, TypeScript, and TailwindCSS**

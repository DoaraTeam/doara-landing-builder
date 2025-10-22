import { ComponentConfig } from "@/types/landing";

export interface LandingPageTemplate {
  id: string;
  name: string;
  description: string;
  category: "business" | "saas" | "ecommerce" | "agency" | "portfolio";
  thumbnail?: string;
  components: Omit<ComponentConfig, "id" | "order">[];
}

export const landingPageTemplates: LandingPageTemplate[] = [
  {
    id: "modern-business",
    name: "Modern Business",
    description: "Professional business template with hero, features, and CTA",
    category: "business",
    components: [
      {
        type: "hero",
        visible: true,
        config: {
          title: "Transform Your Business Today",
          subtitle: "Innovation • Growth • Success",
          description: "We help businesses scale with cutting-edge solutions and expert guidance. Join thousands of satisfied clients worldwide.",
          primaryCTA: {
            text: "Get Started Free",
            link: "#contact",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "Watch Demo",
            link: "#demo",
            style: "secondary" as const,
          },
          image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
          alignment: "center" as const,
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#3b82f6",
              to: "#8b5cf6",
              direction: "to-br" as const,
            },
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 800,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "features",
        visible: true,
        config: {
          title: "Why Choose Us",
          subtitle: "Everything you need to succeed",
          description: "Comprehensive solutions designed for modern businesses",
          features: [
            {
              title: "Fast & Reliable",
              description: "Lightning-fast performance with 99.9% uptime guarantee",
              icon: "⚡",
            },
            {
              title: "Secure & Safe",
              description: "Enterprise-grade security to protect your data",
              icon: "🔒",
            },
            {
              title: "24/7 Support",
              description: "Round-the-clock customer support whenever you need",
              icon: "💬",
            },
            {
              title: "Easy Integration",
              description: "Seamlessly integrate with your existing tools",
              icon: "🔗",
            },
            {
              title: "Analytics Dashboard",
              description: "Real-time insights and detailed analytics",
              icon: "📊",
            },
            {
              title: "Scalable Solution",
              description: "Grow without limits as your business expands",
              icon: "📈",
            },
          ],
          layout: "grid" as const,
          columns: 3,
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 100,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "pricing",
        visible: true,
        config: {
          title: "Simple, Transparent Pricing",
          subtitle: "Choose the plan that's right for you",
          description: "No hidden fees. Cancel anytime.",
          plans: [
            {
              name: "Starter",
              price: "$29",
              period: "/month",
              description: "Perfect for small businesses",
              features: [
                "Up to 10 users",
                "5GB storage",
                "Basic support",
                "Email integration",
                "Mobile app access",
              ],
              cta: {
                text: "Start Free Trial",
                link: "#signup",
              },
              highlighted: false,
            },
            {
              name: "Professional",
              price: "$79",
              period: "/month",
              description: "For growing teams",
              features: [
                "Up to 50 users",
                "100GB storage",
                "Priority support",
                "Advanced analytics",
                "API access",
                "Custom integrations",
              ],
              cta: {
                text: "Get Started",
                link: "#signup",
              },
              highlighted: true,
              badge: "Most Popular",
            },
            {
              name: "Enterprise",
              price: "$199",
              period: "/month",
              description: "For large organizations",
              features: [
                "Unlimited users",
                "Unlimited storage",
                "24/7 phone support",
                "Dedicated account manager",
                "Custom development",
                "SLA guarantee",
                "On-premise deployment",
              ],
              cta: {
                text: "Contact Sales",
                link: "#contact",
              },
              highlighted: false,
            },
          ],
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "testimonials",
        visible: true,
        config: {
          title: "What Our Clients Say",
          subtitle: "Trusted by industry leaders",
          description: "Don't just take our word for it",
          testimonials: [
            {
              content: "This platform has transformed how we do business. The ROI was evident within the first month!",
              author: "Sarah Johnson",
              role: "CEO",
              company: "TechCorp Inc.",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=1",
            },
            {
              content: "Outstanding support team and incredibly powerful features. Highly recommended!",
              author: "Michael Chen",
              role: "Marketing Director",
              company: "GrowthLabs",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=2",
            },
            {
              content: "We've tried many solutions, but this one stands out. It's simply the best in the market.",
              author: "Emily Rodriguez",
              role: "Product Manager",
              company: "InnovateCo",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=3",
            },
          ],
          layout: "grid" as const,
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "cta",
        visible: true,
        config: {
          title: "Ready to Get Started?",
          description: "Join thousands of successful businesses using our platform. Start your free trial today!",
          primaryCTA: {
            text: "Start Free Trial",
            link: "#signup",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "Schedule Demo",
            link: "#demo",
            style: "outline" as const,
          },
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#3b82f6",
              to: "#8b5cf6",
              direction: "to-r" as const,
            },
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "footer",
        visible: true,
        config: {
          logo: {
            text: "YourBrand",
            image: "",
          },
          description: "Building the future of business technology.",
          links: [
            {
              title: "Product",
              items: [
                { text: "Features", link: "#features" },
                { text: "Pricing", link: "#pricing" },
                { text: "Security", link: "#security" },
                { text: "Updates", link: "#updates" },
              ],
            },
            {
              title: "Company",
              items: [
                { text: "About", link: "#about" },
                { text: "Blog", link: "#blog" },
                { text: "Careers", link: "#careers" },
                { text: "Contact", link: "#contact" },
              ],
            },
            {
              title: "Resources",
              items: [
                { text: "Documentation", link: "#docs" },
                { text: "Help Center", link: "#help" },
                { text: "Community", link: "#community" },
                { text: "API", link: "#api" },
              ],
            },
          ],
          social: [
            { platform: "facebook", link: "#", icon: "facebook" },
            { platform: "twitter", link: "#", icon: "twitter" },
            { platform: "linkedin", link: "#", icon: "linkedin" },
            { platform: "github", link: "#", icon: "github" },
          ],
          copyright: "© 2024 YourBrand. All rights reserved.",
        },
      },
    ],
  },
  {
    id: "saas-product",
    name: "SaaS Product",
    description: "Perfect for SaaS products with feature showcase and pricing",
    category: "saas",
    components: [
      {
        type: "hero",
        visible: true,
        config: {
          title: "The Ultimate SaaS Solution",
          subtitle: "Powerful • Simple • Affordable",
          description: "Everything you need to run your business in one place. No technical knowledge required.",
          primaryCTA: {
            text: "Try It Free",
            link: "#signup",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "See How It Works",
            link: "#demo",
            style: "secondary" as const,
          },
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
          alignment: "left" as const,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 800,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "features",
        visible: true,
        config: {
          title: "Everything You Need",
          subtitle: "Powerful features at your fingertips",
          description: "Built for modern teams who want to move fast",
          features: [
            {
              title: "Real-time Collaboration",
              description: "Work together seamlessly with your team in real-time",
              icon: "👥",
              image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
            },
            {
              title: "Automation",
              description: "Automate repetitive tasks and focus on what matters",
              icon: "🤖",
              image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
            },
            {
              title: "Advanced Analytics",
              description: "Get insights with powerful analytics and reporting",
              icon: "📊",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
            },
            {
              title: "Integrations",
              description: "Connect with all your favorite tools and apps",
              icon: "🔌",
              image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
            },
          ],
          layout: "grid" as const,
          columns: 2,
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 100,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "pricing",
        visible: true,
        config: {
          title: "Choose Your Plan",
          subtitle: "Start free, upgrade when you grow",
          description: "All plans include 14-day free trial",
          plans: [
            {
              name: "Free",
              price: "$0",
              period: "/month",
              description: "For individuals getting started",
              features: [
                "Up to 3 projects",
                "Basic features",
                "Community support",
                "1GB storage",
              ],
              cta: {
                text: "Get Started",
                link: "#signup",
              },
              highlighted: false,
            },
            {
              name: "Pro",
              price: "$49",
              period: "/month",
              description: "For professional teams",
              features: [
                "Unlimited projects",
                "All features",
                "Priority support",
                "50GB storage",
                "Advanced analytics",
                "Custom integrations",
              ],
              cta: {
                text: "Start Free Trial",
                link: "#signup",
              },
              highlighted: true,
              badge: "Best Value",
            },
            {
              name: "Business",
              price: "$149",
              period: "/month",
              description: "For large organizations",
              features: [
                "Everything in Pro",
                "Dedicated support",
                "500GB storage",
                "Custom development",
                "SLA guarantee",
                "On-premise option",
                "Training sessions",
              ],
              cta: {
                text: "Contact Us",
                link: "#contact",
              },
              highlighted: false,
            },
          ],
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "cta",
        visible: true,
        config: {
          title: "Start Your Free Trial Today",
          description: "No credit card required. Set up in minutes. Cancel anytime.",
          primaryCTA: {
            text: "Get Started Free",
            link: "#signup",
            style: "primary" as const,
          },
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#6366f1",
              to: "#8b5cf6",
              direction: "to-r" as const,
            },
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "footer",
        visible: true,
        config: {
          logo: {
            text: "SaaSApp",
            image: "",
          },
          description: "The all-in-one platform for modern teams.",
          links: [
            {
              title: "Product",
              items: [
                { text: "Features", link: "#features" },
                { text: "Pricing", link: "#pricing" },
                { text: "Changelog", link: "#changelog" },
              ],
            },
            {
              title: "Resources",
              items: [
                { text: "Documentation", link: "#docs" },
                { text: "Tutorials", link: "#tutorials" },
                { text: "API Reference", link: "#api" },
              ],
            },
            {
              title: "Company",
              items: [
                { text: "About", link: "#about" },
                { text: "Blog", link: "#blog" },
                { text: "Contact", link: "#contact" },
              ],
            },
          ],
          social: [
            { platform: "twitter", link: "#", icon: "twitter" },
            { platform: "github", link: "#", icon: "github" },
            { platform: "linkedin", link: "#", icon: "linkedin" },
          ],
          copyright: "© 2024 SaaSApp. All rights reserved.",
        },
      },
    ],
  },
  {
    id: "agency-creative",
    name: "Creative Agency",
    description: "Bold and creative template for agencies and studios",
    category: "agency",
    components: [
      {
        type: "hero",
        visible: true,
        config: {
          title: "Creative Agency That Delivers",
          subtitle: "Design • Develop • Deliver",
          description: "We create stunning digital experiences that captivate your audience and drive results.",
          primaryCTA: {
            text: "View Our Work",
            link: "#portfolio",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "Get in Touch",
            link: "#contact",
            style: "outline" as const,
          },
          alignment: "center" as const,
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#000000",
              to: "#1e1e1e",
              direction: "to-br" as const,
            },
          },
          animation: {
            type: "fadeIn" as const,
            duration: 1000,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "features",
        visible: true,
        config: {
          title: "Our Services",
          subtitle: "What we do best",
          description: "Full-service creative solutions",
          features: [
            {
              title: "Brand Identity",
              description: "Create memorable brands that stand out",
              icon: "🎨",
            },
            {
              title: "Web Development",
              description: "Build fast, beautiful websites",
              icon: "💻",
            },
            {
              title: "UI/UX Design",
              description: "Design experiences users love",
              icon: "✨",
            },
            {
              title: "Digital Marketing",
              description: "Grow your online presence",
              icon: "📱",
            },
            {
              title: "Content Creation",
              description: "Engage your audience with great content",
              icon: "📝",
            },
            {
              title: "Strategy",
              description: "Plan for success with data-driven insights",
              icon: "🎯",
            },
          ],
          layout: "grid" as const,
          columns: 3,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 100,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "testimonials",
        visible: true,
        config: {
          title: "Client Success Stories",
          subtitle: "We're proud of our work",
          description: "See what our clients have to say",
          testimonials: [
            {
              content: "The team delivered beyond our expectations. Our website traffic increased by 300%!",
              author: "Alex Thompson",
              role: "Founder",
              company: "StartupXYZ",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=10",
            },
            {
              content: "Professional, creative, and always on time. A pleasure to work with!",
              author: "Jessica Lee",
              role: "Marketing Lead",
              company: "BrandCo",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=11",
            },
            {
              content: "They transformed our brand completely. The results speak for themselves.",
              author: "David Park",
              role: "CEO",
              company: "TechVentures",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=12",
            },
          ],
          layout: "carousel" as const,
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "cta",
        visible: true,
        config: {
          title: "Let's Create Something Amazing",
          description: "Ready to take your brand to the next level? Get in touch with us today.",
          primaryCTA: {
            text: "Start Your Project",
            link: "#contact",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "See Portfolio",
            link: "#portfolio",
            style: "outline" as const,
          },
          background: {
            type: "solid" as const,
            color: "#000000",
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "footer",
        visible: true,
        config: {
          logo: {
            text: "CreativeStudio",
            image: "",
          },
          description: "Crafting digital experiences since 2020.",
          links: [
            {
              title: "Services",
              items: [
                { text: "Branding", link: "#branding" },
                { text: "Web Design", link: "#web" },
                { text: "Marketing", link: "#marketing" },
              ],
            },
            {
              title: "Work",
              items: [
                { text: "Portfolio", link: "#portfolio" },
                { text: "Case Studies", link: "#cases" },
                { text: "Process", link: "#process" },
              ],
            },
            {
              title: "Connect",
              items: [
                { text: "Contact", link: "#contact" },
                { text: "Careers", link: "#careers" },
                { text: "Blog", link: "#blog" },
              ],
            },
          ],
          social: [
            { platform: "instagram", link: "#", icon: "instagram" },
            { platform: "twitter", link: "#", icon: "twitter" },
            { platform: "linkedin", link: "#", icon: "linkedin" },
          ],
          copyright: "© 2024 CreativeStudio. All rights reserved.",
        },
      },
    ],
  },
  {
    id: "ecommerce-store",
    name: "E-Commerce Store",
    description: "Perfect for online stores and product showcases",
    category: "ecommerce",
    components: [
      {
        type: "hero",
        visible: true,
        config: {
          title: "Shop The Latest Collection",
          subtitle: "Quality • Style • Value",
          description:
            "Discover amazing products at unbeatable prices. Free shipping on orders over $50.",
          primaryCTA: {
            text: "Shop Now",
            link: "#products",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "View Catalog",
            link: "#catalog",
            style: "outline" as const,
          },
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
          alignment: "left" as const,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 800,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "features",
        visible: true,
        config: {
          title: "Why Shop With Us",
          subtitle: "Customer satisfaction is our priority",
          description: "Experience the best shopping journey",
          features: [
            {
              title: "Free Shipping",
              description: "Free delivery on all orders over $50",
              icon: "🚚",
            },
            {
              title: "Secure Payment",
              description: "100% secure payment with SSL encryption",
              icon: "💳",
            },
            {
              title: "30-Day Returns",
              description: "Easy returns within 30 days of purchase",
              icon: "↩️",
            },
            {
              title: "24/7 Support",
              description: "Dedicated customer support team",
              icon: "💬",
            },
            {
              title: "Quality Guarantee",
              description: "All products are quality checked",
              icon: "✓",
            },
            {
              title: "Best Prices",
              description: "Competitive prices with regular discounts",
              icon: "💰",
            },
          ],
          layout: "grid" as const,
          columns: 3,
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 100,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "testimonials",
        visible: true,
        config: {
          title: "Happy Customers",
          subtitle: "See what our customers say",
          description: "Join thousands of satisfied shoppers",
          testimonials: [
            {
              content:
                "Love the quality and fast shipping! Will definitely order again.",
              author: "Emma Wilson",
              role: "Verified Buyer",
              company: "Fashion Lover",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=5",
            },
            {
              content:
                "Best online shopping experience. Great products and customer service!",
              author: "James Brown",
              role: "Verified Buyer",
              company: "Tech Enthusiast",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=6",
            },
            {
              content:
                "Amazing deals and quick delivery. Highly recommend to everyone!",
              author: "Sophia Martinez",
              role: "Verified Buyer",
              company: "Regular Customer",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=7",
            },
          ],
          layout: "grid" as const,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "cta",
        visible: true,
        config: {
          title: "Start Shopping Today!",
          description:
            "Get 20% off your first order. Use code: WELCOME20 at checkout.",
          primaryCTA: {
            text: "Browse Products",
            link: "#products",
            style: "primary" as const,
          },
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#ec4899",
              to: "#8b5cf6",
              direction: "to-r" as const,
            },
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "footer",
        visible: true,
        config: {
          logo: {
            text: "ShopStyle",
            image: "",
          },
          description: "Your trusted online shopping destination.",
          links: [
            {
              title: "Shop",
              items: [
                { text: "New Arrivals", link: "#new" },
                { text: "Best Sellers", link: "#bestsellers" },
                { text: "Sale", link: "#sale" },
                { text: "Categories", link: "#categories" },
              ],
            },
            {
              title: "Customer Service",
              items: [
                { text: "Contact Us", link: "#contact" },
                { text: "Shipping Info", link: "#shipping" },
                { text: "Returns", link: "#returns" },
                { text: "Track Order", link: "#track" },
              ],
            },
            {
              title: "Company",
              items: [
                { text: "About Us", link: "#about" },
                { text: "Careers", link: "#careers" },
                { text: "Blog", link: "#blog" },
                { text: "Press", link: "#press" },
              ],
            },
          ],
          social: [
            { platform: "facebook", link: "#", icon: "facebook" },
            { platform: "instagram", link: "#", icon: "instagram" },
            { platform: "twitter", link: "#", icon: "twitter" },
          ],
          copyright: "© 2024 ShopStyle. All rights reserved.",
        },
      },
    ],
  },
  {
    id: "minimal-portfolio",
    name: "Minimal Portfolio",
    description: "Clean and elegant portfolio for creatives",
    category: "portfolio",
    components: [
      {
        type: "hero",
        visible: true,
        config: {
          title: "Designer & Developer",
          subtitle: "Creating Digital Experiences",
          description:
            "Hi, I'm a creative professional passionate about design and code. Let's build something amazing together.",
          primaryCTA: {
            text: "View My Work",
            link: "#portfolio",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "Get In Touch",
            link: "#contact",
            style: "outline" as const,
          },
          alignment: "center" as const,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeIn" as const,
            duration: 1000,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "features",
        visible: true,
        config: {
          title: "What I Do",
          subtitle: "My expertise",
          description: "Specialized in creating beautiful and functional solutions",
          features: [
            {
              title: "UI/UX Design",
              description: "Creating intuitive and beautiful user interfaces",
              icon: "🎨",
              image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
            },
            {
              title: "Web Development",
              description: "Building responsive and performant websites",
              icon: "💻",
              image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
            },
            {
              title: "Mobile Apps",
              description: "Developing native and cross-platform mobile apps",
              icon: "📱",
              image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
            },
            {
              title: "Branding",
              description: "Creating memorable brand identities",
              icon: "✨",
              image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400",
            },
          ],
          layout: "grid" as const,
          columns: 2,
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 100,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "testimonials",
        visible: true,
        config: {
          title: "Client Testimonials",
          subtitle: "What clients say about working with me",
          description: "Building lasting relationships through quality work",
          testimonials: [
            {
              content:
                "Exceptional work! The attention to detail and creativity exceeded our expectations.",
              author: "Rachel Green",
              role: "Marketing Manager",
              company: "TechVision",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=8",
            },
            {
              content:
                "Professional, reliable, and talented. A pleasure to work with from start to finish.",
              author: "Tom Anderson",
              role: "Founder",
              company: "StartupHub",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=9",
            },
          ],
          layout: "grid" as const,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "cta",
        visible: true,
        config: {
          title: "Let's Work Together",
          description:
            "Have a project in mind? Let's discuss how I can help bring your ideas to life.",
          primaryCTA: {
            text: "Start a Project",
            link: "#contact",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "Download Resume",
            link: "#resume",
            style: "outline" as const,
          },
          background: {
            type: "solid" as const,
            color: "#000000",
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "footer",
        visible: true,
        config: {
          logo: {
            text: "John Doe",
            image: "",
          },
          description: "Designer & Developer based in San Francisco",
          links: [
            {
              title: "Work",
              items: [
                { text: "Portfolio", link: "#portfolio" },
                { text: "Case Studies", link: "#cases" },
                { text: "Services", link: "#services" },
              ],
            },
            {
              title: "Connect",
              items: [
                { text: "Contact", link: "#contact" },
                { text: "LinkedIn", link: "#linkedin" },
                { text: "Resume", link: "#resume" },
              ],
            },
            {
              title: "More",
              items: [
                { text: "About", link: "#about" },
                { text: "Blog", link: "#blog" },
                { text: "Speaking", link: "#speaking" },
              ],
            },
          ],
          social: [
            { platform: "linkedin", link: "#", icon: "linkedin" },
            { platform: "github", link: "#", icon: "github" },
            { platform: "twitter", link: "#", icon: "twitter" },
          ],
          copyright: "© 2024 John Doe. All rights reserved.",
        },
      },
    ],
  },
  {
    id: "ai-startup",
    name: "AI Startup Pro",
    description: "Cutting-edge landing page for AI and Machine Learning companies",
    category: "saas",
    components: [
      {
        type: "hero",
        visible: true,
        config: {
          title: "AI-Powered Solutions for Tomorrow",
          subtitle: "Intelligence • Automation • Innovation",
          description:
            "Harness the power of artificial intelligence to transform your business. Our cutting-edge ML models deliver results that matter.",
          primaryCTA: {
            text: "Start Free Trial",
            link: "#signup",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "Watch Demo",
            link: "#demo",
            style: "secondary" as const,
          },
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
          alignment: "center" as const,
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#667eea",
              to: "#764ba2",
              direction: "to-br" as const,
            },
          },
          animation: {
            type: "fadeIn" as const,
            duration: 1000,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "features",
        visible: true,
        config: {
          title: "Powerful AI Capabilities",
          subtitle: "Everything you need to succeed",
          description: "Enterprise-grade AI tools for modern businesses",
          features: [
            {
              title: "Natural Language Processing",
              description:
                "Advanced NLP for text analysis, sentiment detection, and language understanding",
              icon: "🧠",
              image:
                "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80",
            },
            {
              title: "Computer Vision",
              description:
                "State-of-the-art image recognition and object detection models",
              icon: "👁️",
              image:
                "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&q=80",
            },
            {
              title: "Predictive Analytics",
              description:
                "Machine learning models that predict trends and outcomes with accuracy",
              icon: "📊",
              image:
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
            },
            {
              title: "AutoML Platform",
              description:
                "Build and deploy ML models without coding expertise required",
              icon: "⚡",
              image:
                "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&q=80",
            },
          ],
          layout: "grid" as const,
          columns: 2,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 100,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "pricing",
        visible: true,
        config: {
          title: "Flexible Pricing Plans",
          subtitle: "Choose the plan that fits your needs",
          description: "14-day free trial • No credit card required",
          plans: [
            {
              name: "Starter",
              price: "$99",
              period: "/month",
              description: "Perfect for small teams",
              features: [
                "100,000 API calls/month",
                "Basic NLP & Vision APIs",
                "Community support",
                "Standard models",
                "Email support",
              ],
              cta: {
                text: "Start Free Trial",
                link: "#signup",
              },
              highlighted: false,
            },
            {
              name: "Professional",
              price: "$299",
              period: "/month",
              description: "For growing businesses",
              features: [
                "1M API calls/month",
                "All AI models",
                "Priority support",
                "Custom training",
                "Advanced analytics",
                "API documentation",
                "Slack integration",
              ],
              cta: {
                text: "Get Started",
                link: "#signup",
              },
              highlighted: true,
              badge: "Most Popular",
            },
            {
              name: "Enterprise",
              price: "Custom",
              period: "",
              description: "For large organizations",
              features: [
                "Unlimited API calls",
                "Custom AI models",
                "24/7 phone support",
                "Dedicated account manager",
                "On-premise deployment",
                "SLA guarantee",
                "Training & consulting",
                "White-label solution",
              ],
              cta: {
                text: "Contact Sales",
                link: "#contact",
              },
              highlighted: false,
            },
          ],
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "testimonials",
        visible: true,
        config: {
          title: "Trusted by Industry Leaders",
          subtitle: "What our customers say",
          description: "Join 500+ companies using our AI platform",
          testimonials: [
            {
              content:
                "This AI platform has revolutionized our data analysis. We've reduced processing time by 80% and improved accuracy significantly.",
              author: "Sarah Chen",
              role: "Chief Data Officer",
              company: "TechCorp Global",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=1",
            },
            {
              content:
                "The NLP capabilities are outstanding. We've automated our customer support and increased satisfaction by 40%.",
              author: "Michael Roberts",
              role: "VP of Engineering",
              company: "CloudServices Inc",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=2",
            },
            {
              content:
                "Best-in-class computer vision API. Easy integration and incredibly accurate results. Highly recommended!",
              author: "Emma Watson",
              role: "CTO",
              company: "VisionTech",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=3",
            },
          ],
          layout: "grid" as const,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "cta",
        visible: true,
        config: {
          title: "Ready to Transform Your Business with AI?",
          description:
            "Start your free trial today. No credit card required. Get started in minutes.",
          primaryCTA: {
            text: "Start Free Trial",
            link: "#signup",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "Schedule Demo",
            link: "#demo",
            style: "outline" as const,
          },
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#667eea",
              to: "#764ba2",
              direction: "to-r" as const,
            },
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "footer",
        visible: true,
        config: {
          logo: {
            text: "AI Platform",
            image: "",
          },
          description: "Empowering businesses with artificial intelligence.",
          links: [
            {
              title: "Product",
              items: [
                { text: "Features", link: "#features" },
                { text: "Pricing", link: "#pricing" },
                { text: "API Docs", link: "#docs" },
                { text: "Changelog", link: "#changelog" },
              ],
            },
            {
              title: "Company",
              items: [
                { text: "About", link: "#about" },
                { text: "Careers", link: "#careers" },
                { text: "Blog", link: "#blog" },
                { text: "Press Kit", link: "#press" },
              ],
            },
            {
              title: "Resources",
              items: [
                { text: "Documentation", link: "#docs" },
                { text: "Tutorials", link: "#tutorials" },
                { text: "Support", link: "#support" },
                { text: "Community", link: "#community" },
              ],
            },
          ],
          social: [
            { platform: "twitter", link: "#", icon: "twitter" },
            { platform: "github", link: "#", icon: "github" },
            { platform: "linkedin", link: "#", icon: "linkedin" },
          ],
          copyright: "© 2024 AI Platform. All rights reserved.",
        },
      },
    ],
  },
  {
    id: "restaurant-elegant",
    name: "Restaurant Elegante",
    description: "Beautiful landing page for restaurants, cafes, and food businesses",
    category: "business",
    components: [
      {
        type: "hero",
        visible: true,
        config: {
          title: "Experience Culinary Excellence",
          subtitle: "Fine Dining • Fresh Ingredients • Unforgettable Taste",
          description:
            "Welcome to our restaurant where passion meets flavor. Join us for an unforgettable dining experience.",
          primaryCTA: {
            text: "Reserve a Table",
            link: "#reservation",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "View Menu",
            link: "#menu",
            style: "outline" as const,
          },
          image:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
          alignment: "center" as const,
          background: {
            type: "solid" as const,
            color: "#1a1a1a",
          },
          animation: {
            type: "fadeIn" as const,
            duration: 1000,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "features",
        visible: true,
        config: {
          title: "What Makes Us Special",
          subtitle: "Our commitment to excellence",
          description: "Experience the difference in every dish",
          features: [
            {
              title: "Fresh Local Ingredients",
              description:
                "We source the finest ingredients from local farms daily",
              icon: "🌿",
              image:
                "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80",
            },
            {
              title: "Award-Winning Chef",
              description: "Michelin-trained chef with 20+ years experience",
              icon: "👨‍🍳",
              image:
                "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
            },
            {
              title: "Elegant Atmosphere",
              description:
                "Beautiful ambiance perfect for any special occasion",
              icon: "✨",
              image:
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
            },
            {
              title: "Private Events",
              description: "Host your special events in our private dining room",
              icon: "🎉",
              image:
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80",
            },
          ],
          layout: "grid" as const,
          columns: 2,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 100,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "testimonials",
        visible: true,
        config: {
          title: "What Our Guests Say",
          subtitle: "Reviews from our valued customers",
          description: "Rated 4.9/5 on Google Reviews",
          testimonials: [
            {
              content:
                "Absolutely stunning! The food was exceptional and the service was impeccable. Best dining experience in the city.",
              author: "Jennifer Williams",
              role: "Food Critic",
              company: "City Magazine",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=5",
            },
            {
              content:
                "Perfect for our anniversary dinner. The ambiance, food, and service exceeded all expectations. Will definitely return!",
              author: "David & Maria Lopez",
              role: "Anniversary Celebration",
              company: "",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=6",
            },
            {
              content:
                "Every dish was a masterpiece. The chef's attention to detail and flavor combinations are truly outstanding.",
              author: "Robert Chen",
              role: "Regular Guest",
              company: "",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=7",
            },
          ],
          layout: "grid" as const,
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "cta",
        visible: true,
        config: {
          title: "Reserve Your Table Today",
          description:
            "Don't miss out on an extraordinary dining experience. Book your table now!",
          primaryCTA: {
            text: "Make a Reservation",
            link: "#reservation",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "Call Us: (555) 123-4567",
            link: "tel:+15551234567",
            style: "outline" as const,
          },
          background: {
            type: "solid" as const,
            color: "#1a1a1a",
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "footer",
        visible: true,
        config: {
          logo: {
            text: "Elegante",
            image: "",
          },
          description: "Fine dining at its best since 2005",
          links: [
            {
              title: "Visit Us",
              items: [
                { text: "Reservation", link: "#reservation" },
                { text: "Menu", link: "#menu" },
                { text: "Events", link: "#events" },
                { text: "Gift Cards", link: "#gifts" },
              ],
            },
            {
              title: "About",
              items: [
                { text: "Our Story", link: "#story" },
                { text: "Chef", link: "#chef" },
                { text: "Careers", link: "#careers" },
                { text: "Press", link: "#press" },
              ],
            },
            {
              title: "Contact",
              items: [
                { text: "Location", link: "#location" },
                { text: "Hours", link: "#hours" },
                { text: "Contact Us", link: "#contact" },
                { text: "Private Events", link: "#private" },
              ],
            },
          ],
          social: [
            { platform: "facebook", link: "#", icon: "facebook" },
            { platform: "instagram", link: "#", icon: "instagram" },
            { platform: "twitter", link: "#", icon: "twitter" },
          ],
          copyright: "© 2024 Restaurant Elegante. All rights reserved.",
        },
      },
    ],
  },
  {
    id: "fitness-gym",
    name: "FitLife Gym",
    description: "Energetic landing page for gyms, fitness centers, and personal trainers",
    category: "business",
    components: [
      {
        type: "hero",
        visible: true,
        config: {
          title: "Transform Your Body, Transform Your Life",
          subtitle: "Strength • Endurance • Results",
          description:
            "Join FitLife and achieve your fitness goals with expert trainers, modern equipment, and a supportive community.",
          primaryCTA: {
            text: "Start Free Trial",
            link: "#trial",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "View Classes",
            link: "#classes",
            style: "secondary" as const,
          },
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
          alignment: "left" as const,
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#f97316",
              to: "#dc2626",
              direction: "to-br" as const,
            },
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 800,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "features",
        visible: true,
        config: {
          title: "Why Choose FitLife?",
          subtitle: "Everything you need to succeed",
          description: "State-of-the-art facilities and expert guidance",
          features: [
            {
              title: "Expert Personal Trainers",
              description:
                "Certified trainers with years of experience to guide your journey",
              icon: "💪",
            },
            {
              title: "Modern Equipment",
              description:
                "Latest fitness equipment and technology for optimal results",
              icon: "🏋️",
            },
            {
              title: "Group Classes",
              description: "Yoga, HIIT, Spin, Pilates and more - over 50 classes weekly",
              icon: "🧘",
            },
            {
              title: "Nutrition Coaching",
              description: "Personalized meal plans and nutrition guidance included",
              icon: "🥗",
            },
            {
              title: "24/7 Access",
              description: "Work out on your schedule with round-the-clock access",
              icon: "🕐",
            },
            {
              title: "Community Support",
              description: "Join a motivating community that celebrates your success",
              icon: "🤝",
            },
          ],
          layout: "grid" as const,
          columns: 3,
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 100,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "pricing",
        visible: true,
        config: {
          title: "Flexible Membership Plans",
          subtitle: "Choose what works for you",
          description: "All plans include access to facilities and group classes",
          plans: [
            {
              name: "Basic",
              price: "$29",
              period: "/month",
              description: "Perfect for getting started",
              features: [
                "Gym access (6am-10pm)",
                "Cardio & weight equipment",
                "Locker room & showers",
                "Mobile app access",
              ],
              cta: {
                text: "Start Trial",
                link: "#signup",
              },
              highlighted: false,
            },
            {
              name: "Premium",
              price: "$59",
              period: "/month",
              description: "Most popular choice",
              features: [
                "24/7 gym access",
                "All equipment access",
                "Unlimited group classes",
                "1 personal training session/month",
                "Nutrition consultation",
                "Guest passes (2/month)",
              ],
              cta: {
                text: "Get Started",
                link: "#signup",
              },
              highlighted: true,
              badge: "Best Value",
            },
            {
              name: "Elite",
              price: "$99",
              period: "/month",
              description: "For serious athletes",
              features: [
                "Everything in Premium",
                "4 personal training sessions/month",
                "Sports massage (1/month)",
                "Priority class booking",
                "Private locker",
                "Supplement discounts",
                "Towel service",
              ],
              cta: {
                text: "Join Elite",
                link: "#signup",
              },
              highlighted: false,
            },
          ],
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "testimonials",
        visible: true,
        config: {
          title: "Success Stories",
          subtitle: "Real results from real people",
          description: "See how FitLife changed their lives",
          testimonials: [
            {
              content:
                "Lost 30 pounds in 6 months! The trainers are amazing and the community keeps me motivated every day.",
              author: "Jessica Martinez",
              role: "Member since 2023",
              company: "Lost 30 lbs",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=8",
            },
            {
              content:
                "Best gym I've ever joined. The facilities are top-notch and the atmosphere is incredibly supportive.",
              author: "Tom Anderson",
              role: "Elite Member",
              company: "Gained 15 lbs muscle",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=9",
            },
            {
              content:
                "The group classes are fantastic! I've made great friends and achieved fitness goals I never thought possible.",
              author: "Lisa Thompson",
              role: "Premium Member",
              company: "Marathon Runner",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=10",
            },
          ],
          layout: "grid" as const,
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "cta",
        visible: true,
        config: {
          title: "Ready to Start Your Fitness Journey?",
          description:
            "Get 7 days free trial - No credit card required. Experience FitLife today!",
          primaryCTA: {
            text: "Start Free Trial",
            link: "#trial",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "Take a Tour",
            link: "#tour",
            style: "outline" as const,
          },
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#f97316",
              to: "#dc2626",
              direction: "to-r" as const,
            },
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "footer",
        visible: true,
        config: {
          logo: {
            text: "FitLife Gym",
            image: "",
          },
          description: "Your journey to a healthier lifestyle starts here",
          links: [
            {
              title: "Membership",
              items: [
                { text: "Plans & Pricing", link: "#pricing" },
                { text: "Free Trial", link: "#trial" },
                { text: "Personal Training", link: "#training" },
                { text: "Group Classes", link: "#classes" },
              ],
            },
            {
              title: "Facilities",
              items: [
                { text: "Equipment", link: "#equipment" },
                { text: "Schedule", link: "#schedule" },
                { text: "Locations", link: "#locations" },
                { text: "Virtual Tour", link: "#tour" },
              ],
            },
            {
              title: "Support",
              items: [
                { text: "FAQs", link: "#faq" },
                { text: "Contact", link: "#contact" },
                { text: "Member Portal", link: "#portal" },
                { text: "Careers", link: "#careers" },
              ],
            },
          ],
          social: [
            { platform: "facebook", link: "#", icon: "facebook" },
            { platform: "instagram", link: "#", icon: "instagram" },
            { platform: "twitter", link: "#", icon: "twitter" },
          ],
          copyright: "© 2024 FitLife Gym. All rights reserved.",
        },
      },
    ],
  },
  {
    id: "real-estate-luxury",
    name: "Luxury Real Estate",
    description: "Premium landing page for real estate agencies and property listings",
    category: "business",
    components: [
      {
        type: "hero",
        visible: true,
        config: {
          title: "Find Your Dream Home Today",
          subtitle: "Luxury Properties • Prime Locations • Expert Service",
          description:
            "Discover exclusive properties in the most desirable neighborhoods. Let our expert agents help you find your perfect home.",
          primaryCTA: {
            text: "Browse Properties",
            link: "#properties",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "Contact Agent",
            link: "#contact",
            style: "outline" as const,
          },
          image:
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
          alignment: "center" as const,
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#1e3a8a",
              to: "#3b82f6",
              direction: "to-br" as const,
            },
          },
          animation: {
            type: "fadeIn" as const,
            duration: 1000,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "features",
        visible: true,
        config: {
          title: "Why Choose Us",
          subtitle: "Your trusted real estate partner",
          description: "Experience excellence in real estate",
          features: [
            {
              title: "Exclusive Listings",
              description:
                "Access to premium properties not available elsewhere",
              icon: "🏡",
              image:
                "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80",
            },
            {
              title: "Expert Agents",
              description:
                "Experienced agents with local market expertise",
              icon: "👔",
              image:
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
            },
            {
              title: "Virtual Tours",
              description:
                "3D virtual tours of properties from anywhere",
              icon: "🎥",
              image:
                "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&q=80",
            },
            {
              title: "Market Insights",
              description:
                "Real-time market data and investment analysis",
              icon: "📈",
              image:
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
            },
          ],
          layout: "grid" as const,
          columns: 2,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 100,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "testimonials",
        visible: true,
        config: {
          title: "Client Success Stories",
          subtitle: "What our clients say",
          description: "Trusted by thousands of happy homeowners",
          testimonials: [
            {
              content:
                "Found our dream home in just 2 weeks! The agent was professional, knowledgeable, and made the process seamless.",
              author: "Amanda & John Miller",
              role: "Homeowners",
              company: "Beverly Hills",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=11",
            },
            {
              content:
                "Sold our property for 15% above asking price. Outstanding service and marketing strategy!",
              author: "Robert Davidson",
              role: "Property Seller",
              company: "Manhattan",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=12",
            },
            {
              content:
                "Best real estate experience ever. The team went above and beyond to find exactly what we wanted.",
              author: "Sofia Rodriguez",
              role: "First-time Buyer",
              company: "Miami",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=13",
            },
          ],
          layout: "grid" as const,
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "cta",
        visible: true,
        config: {
          title: "Ready to Find Your Perfect Property?",
          description:
            "Schedule a free consultation with one of our expert agents today.",
          primaryCTA: {
            text: "Schedule Consultation",
            link: "#consultation",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "View All Listings",
            link: "#listings",
            style: "outline" as const,
          },
          background: {
            type: "solid" as const,
            color: "#1e3a8a",
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "footer",
        visible: true,
        config: {
          logo: {
            text: "Elite Properties",
            image: "",
          },
          description: "Your gateway to luxury living since 1995",
          links: [
            {
              title: "Properties",
              items: [
                { text: "Buy", link: "#buy" },
                { text: "Sell", link: "#sell" },
                { text: "Rent", link: "#rent" },
                { text: "New Listings", link: "#new" },
              ],
            },
            {
              title: "Services",
              items: [
                { text: "Property Management", link: "#management" },
                { text: "Home Valuation", link: "#valuation" },
                { text: "Investment Analysis", link: "#investment" },
                { text: "Relocation", link: "#relocation" },
              ],
            },
            {
              title: "Company",
              items: [
                { text: "About Us", link: "#about" },
                { text: "Our Agents", link: "#agents" },
                { text: "Testimonials", link: "#testimonials" },
                { text: "Contact", link: "#contact" },
              ],
            },
          ],
          social: [
            { platform: "facebook", link: "#", icon: "facebook" },
            { platform: "instagram", link: "#", icon: "instagram" },
            { platform: "linkedin", link: "#", icon: "linkedin" },
          ],
          copyright: "© 2024 Elite Properties. All rights reserved.",
        },
      },
    ],
  },
  {
    id: "mobile-app-launch",
    name: "App Launch Pro",
    description: "Modern landing page for mobile app launches and downloads",
    category: "saas",
    components: [
      {
        type: "hero",
        visible: true,
        config: {
          title: "Your Life, Simplified",
          subtitle: "One App • Endless Possibilities",
          description:
            "Download the app that millions trust. Available now on iOS and Android. Get started in seconds!",
          primaryCTA: {
            text: "Download on App Store",
            link: "#appstore",
            style: "primary" as const,
          },
          secondaryCTA: {
            text: "Get it on Google Play",
            link: "#playstore",
            style: "secondary" as const,
          },
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
          alignment: "center" as const,
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#6366f1",
              to: "#a855f7",
              direction: "to-br" as const,
            },
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 800,
            delay: 0,
          },
          spacing: {
            padding: "2xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "features",
        visible: true,
        config: {
          title: "Powerful Features",
          subtitle: "Everything you need in one app",
          description: "Designed for simplicity, built for power",
          features: [
            {
              title: "Lightning Fast",
              description:
                "Optimized performance for instant loading and smooth experience",
              icon: "⚡",
            },
            {
              title: "Secure & Private",
              description:
                "Bank-level encryption to keep your data safe and secure",
              icon: "🔒",
            },
            {
              title: "Offline Mode",
              description:
                "Access your content anywhere, even without internet",
              icon: "📴",
            },
            {
              title: "Smart Sync",
              description:
                "Seamlessly sync across all your devices in real-time",
              icon: "🔄",
            },
            {
              title: "Beautiful Design",
              description:
                "Intuitive interface that's a joy to use every day",
              icon: "🎨",
            },
            {
              title: "Always Updated",
              description:
                "Regular updates with new features and improvements",
              icon: "🚀",
            },
          ],
          layout: "grid" as const,
          columns: 3,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 100,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "pricing",
        visible: true,
        config: {
          title: "Choose Your Plan",
          subtitle: "Start free, upgrade anytime",
          description: "7-day free trial • No credit card required",
          plans: [
            {
              name: "Free",
              price: "$0",
              period: "/forever",
              description: "Perfect for trying out",
              features: [
                "Basic features",
                "Up to 5 projects",
                "1GB storage",
                "Community support",
              ],
              cta: {
                text: "Download Free",
                link: "#download",
              },
              highlighted: false,
            },
            {
              name: "Pro",
              price: "$9.99",
              period: "/month",
              description: "For power users",
              features: [
                "All features unlocked",
                "Unlimited projects",
                "50GB storage",
                "Priority support",
                "Advanced analytics",
                "Export capabilities",
              ],
              cta: {
                text: "Start Free Trial",
                link: "#trial",
              },
              highlighted: true,
              badge: "Popular",
            },
            {
              name: "Teams",
              price: "$29.99",
              period: "/month",
              description: "For teams & businesses",
              features: [
                "Everything in Pro",
                "Up to 10 team members",
                "500GB storage",
                "Admin controls",
                "Team collaboration",
                "API access",
                "Custom branding",
              ],
              cta: {
                text: "Contact Sales",
                link: "#sales",
              },
              highlighted: false,
            },
          ],
          background: {
            type: "solid" as const,
            color: "#f9fafb",
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "testimonials",
        visible: true,
        config: {
          title: "Loved by Millions",
          subtitle: "What users are saying",
          description: "4.8/5 rating on App Store & Google Play",
          testimonials: [
            {
              content:
                "This app has completely changed how I organize my life. Can't imagine my day without it!",
              author: "Emily Watson",
              role: "Verified User",
              company: "5M+ Downloads",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=14",
            },
            {
              content:
                "Simple, beautiful, and incredibly powerful. Best app I've downloaded this year!",
              author: "Marcus Johnson",
              role: "Pro User",
              company: "App Store Review",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=15",
            },
            {
              content:
                "The team collaboration features are game-changing. Our productivity has increased by 40%!",
              author: "Lisa Chang",
              role: "Team Admin",
              company: "Business User",
              rating: 5,
              avatar: "https://i.pravatar.cc/150?img=16",
            },
          ],
          layout: "grid" as const,
          background: {
            type: "solid" as const,
            color: "#ffffff",
          },
          animation: {
            type: "fadeInUp" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "cta",
        visible: true,
        config: {
          title: "Download Now and Get Started!",
          description:
            "Join 5 million+ users worldwide. Free to download, instant to set up.",
          primaryCTA: {
            text: "Download App",
            link: "#download",
            style: "primary" as const,
          },
          background: {
            type: "gradient" as const,
            gradient: {
              from: "#6366f1",
              to: "#a855f7",
              direction: "to-r" as const,
            },
          },
          animation: {
            type: "fadeIn" as const,
            duration: 600,
            delay: 0,
          },
          spacing: {
            padding: "xl" as const,
            margin: "none" as const,
          },
        },
      },
      {
        type: "footer",
        visible: true,
        config: {
          logo: {
            text: "AppName",
            image: "",
          },
          description: "Simplifying life, one tap at a time.",
          links: [
            {
              title: "Product",
              items: [
                { text: "Features", link: "#features" },
                { text: "Pricing", link: "#pricing" },
                { text: "Download", link: "#download" },
                { text: "Updates", link: "#updates" },
              ],
            },
            {
              title: "Resources",
              items: [
                { text: "Help Center", link: "#help" },
                { text: "Tutorials", link: "#tutorials" },
                { text: "Blog", link: "#blog" },
                { text: "Status", link: "#status" },
              ],
            },
            {
              title: "Company",
              items: [
                { text: "About", link: "#about" },
                { text: "Careers", link: "#careers" },
                { text: "Press", link: "#press" },
                { text: "Contact", link: "#contact" },
              ],
            },
          ],
          social: [
            { platform: "twitter", link: "#", icon: "twitter" },
            { platform: "facebook", link: "#", icon: "facebook" },
            { platform: "instagram", link: "#", icon: "instagram" },
          ],
          copyright: "© 2024 AppName. All rights reserved.",
        },
      },
    ],
  },
];

export function getTemplateById(id: string): LandingPageTemplate | undefined {
  return landingPageTemplates.find((template) => template.id === id);
}

export function getTemplatesByCategory(
  category: LandingPageTemplate["category"]
): LandingPageTemplate[] {
  return landingPageTemplates.filter((template) => template.category === category);
}

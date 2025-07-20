# 🍦 Gelato Messina - Interactive Website

A modern, responsive website for the cult Australian gelato brand Gelato Messina. Built with vanilla HTML, Tailwind CSS, and JavaScript to showcase chef-driven flavours, sustainability initiatives, and the brand's fun, Gen-Z-friendly personality.

## ✨ Features

### 🎬 Hero Section
- Full-bleed animated background with floating gelato emojis
- Engaging headline: "Made-from-scratch. Scoops of joy."
- Dual CTAs: "Find a Store" and "Take the Flavour Quiz"
- Smooth scroll indicators

### 🔥 Trending Flavours Heat-map
- Horizontally scrolling flavour cards
- Animated heat bars showing popularity
- Interactive tooltips with flavour descriptions
- Real-time trending indicators

### 🎭 Personality Quiz
- 5-question multiple choice quiz
- Dynamic personality matching algorithm
- Beautiful result cards with sharing functionality
- Progress tracking and smooth transitions

### 🌱 Sustainability Spotlight
- Auto-advancing image carousel of farm partnerships
- Comprehensive eco-action list
- "Track My Scoop" modal with ingredient origin mapping
- Focus on farm-to-cone transparency

### 🎮 App Gamification
- Progress bar showing stamp collection (3/10 to free scoop)
- Three quest types: Weekly Special, Recycling, AR Code
- Reward system preview
- Download CTA for mobile app

### 📸 User Generated Content
- Masonry grid of #MessinaMixUp posts
- Hover effects with user details
- Simulated social media integration
- Engagement metrics display

### 📧 Email Capture & Social
- Newsletter signup with validation
- Social media links (Instagram, TikTok, Facebook, Twitter)
- Footer with legal links
- Brand-consistent messaging

### 🌙 Additional Features
- **Dark/Light Theme Toggle**: Persisted via localStorage
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- **Responsive Design**: Mobile-first approach with smooth breakpoints
- **Performance Optimized**: Minimal dependencies, efficient animations
- **Error Handling**: Comprehensive error states and user feedback

## 🛠️ Technical Stack

- **HTML5**: Semantic markup with proper ARIA labels
- **Tailwind CSS**: Utility-first CSS framework (CDN)
- **Vanilla JavaScript**: ES6+ features, no external dependencies
- **Responsive Design**: Mobile-first with 768px and 1024px breakpoints

## 🚀 Quick Start

1. **Clone or download** the repository
2. **Open `index.html`** in your browser
3. **No build process required** - everything runs client-side

```bash
# If using Live Server in VS Code
npx live-server .

# Or simply open the file
open index.html
```

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🎨 Design System

### Colors
- **Primary Pink**: `#FF6B9D` - Main brand color for CTAs and accents
- **Secondary Mint**: `#4ECDC4` - Hover states and secondary actions
- **Cream**: `#FFF8E7` - Light background and cards
- **Chocolate**: `#8B4513` - Text and natural accents
- **Dark**: `#2D1B69` - Dark mode backgrounds and headers

### Typography
- System fonts with fallbacks for performance
- Responsive text scaling
- Proper heading hierarchy (h1-h4)

### Animations
- Smooth CSS transitions and transforms
- Respect `prefers-reduced-motion` setting
- Performance-optimized keyframes
- Subtle micro-interactions

## 🏗️ Project Structure

```
gelato-messina/
├── index.html              # Main HTML file
├── style.css               # Custom CSS styles
├── script.js               # Interactive functionality
├── README.md               # Project documentation
└── .github/
    └── copilot-instructions.md
```

## 🔧 Configuration

### Tailwind CSS Config
Custom theme configuration includes:
- Extended color palette with Messina brand colors
- Custom animations (float, pulse-slow, heat-bar)
- Dark mode support via class strategy

### JavaScript Modules
- **Theme Management**: Dark/light toggle with persistence
- **Quiz Engine**: Dynamic question flow and personality matching
- **Carousel System**: Auto-advancing image carousel
- **Modal System**: Accessible popup management
- **Notification System**: User feedback and success states

## 🧪 Testing

### Manual Testing Checklist
- [ ] Theme toggle works and persists
- [ ] Quiz flows correctly through all 5 questions
- [ ] Carousel auto-advances and manual controls work
- [ ] Modal opens/closes with proper focus management
- [ ] Newsletter form shows success/error states
- [ ] All animations respect reduced-motion preferences
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announcements are clear

### Accessibility Testing
- Run with screen reader (NVDA, JAWS, VoiceOver)
- Test keyboard-only navigation
- Verify color contrast ratios
- Check focus indicators

## 🚀 Future Enhancements

### Ready for Integration
- **API Endpoints**: Stubbed data ready for real backend
- **Authentication**: User accounts for quiz results
- **Real UGC**: Instagram API integration
- **Store Locator**: Maps integration
- **Performance**: Service worker for offline capability

### Potential Features
- **Progressive Web App**: Installable experience
- **Real-time Updates**: WebSocket for live flavour data
- **Personalization**: Saved preferences and recommendations
- **E-commerce**: Direct ordering functionality

## 📞 Support

For questions about implementation or features:

1. Check the `copilot-instructions.md` for development guidelines
2. Review the code comments for detailed explanations
3. Test in multiple browsers and devices
4. Validate HTML, CSS, and run accessibility audits

## 📄 License

This is a demo project created for Gelato Messina brand showcase. All brand assets and content are property of Gelato Messina.

---

**Built with 💖 and lots of gelato in Australia** 🇦🇺

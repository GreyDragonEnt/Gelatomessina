<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Gelato Messina Website - Copilot Instructions

## Project Overview
This is an interactive, responsive website for Gelato Messina, a cult Australian gelato brand. The project uses vanilla HTML, CSS (with Tailwind CSS via CDN), and JavaScript to create an engaging user experience.

## Brand Guidelines
- **Tone**: Fun, cheeky, Gen-Z-friendly
- **Colors**: Pink (#FF6B9D), Mint (#4ECDC4), Cream (#FFF8E7), Chocolate (#8B4513), Dark (#2D1B69)
- **Personality**: Chef-driven flavours, farm-to-cone sustainability, limited-drop culture
- **Target Audience**: Australian millennials and Gen-Z who value quality, sustainability, and unique experiences

## Technical Stack
- **HTML5**: Semantic markup with accessibility features
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Vanilla JavaScript**: No frameworks, ES6+ features
- **Design**: Mobile-first responsive design
- **Accessibility**: WCAG 2.1 AA compliant

## Key Features
1. **Hero Section**: Full-bleed animations with dual CTAs
2. **Trending Flavours**: Horizontal scrolling heat-map with tooltips
3. **Personality Quiz**: 5-question MCQ with dynamic results
4. **Sustainability Spotlight**: Image carousel with eco-actions
5. **App Gamification**: Progress tracking and quest system
6. **UGC Strip**: Masonry grid of social media posts
7. **Email Capture**: Newsletter signup with social links
8. **Theme Toggle**: Dark/light mode with localStorage persistence

## Code Standards
- Use semantic HTML elements
- Include ARIA labels and screen reader support
- Implement smooth animations with reduced-motion preferences
- Follow progressive enhancement principles
- Add comprehensive error handling
- Use consistent naming conventions (camelCase for JS, kebab-case for CSS)

## File Structure
```
/
├── index.html          # Main HTML file with all sections
├── style.css           # Custom CSS with animations and components
├── script.js           # Interactive functionality and event handlers
├── README.md           # Project documentation
└── .github/
    └── copilot-instructions.md # This file
```

## Development Notes
- All data is mocked/stubbed for demonstration
- Interactive elements include visual feedback
- Mobile-first approach with breakpoints at 768px and 1024px
- Performance optimized with lazy loading considerations
- Future-ready for API integration

## Testing Checklist
- [ ] Responsive design across devices
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Theme toggle functionality
- [ ] Quiz flow and results
- [ ] Modal interactions
- [ ] Form validation
- [ ] Smooth scrolling
- [ ] Animation performance
- [ ] Cross-browser compatibility

When making changes, prioritize:
1. Accessibility and user experience
2. Performance and loading speed
3. Brand consistency and visual appeal
4. Code maintainability and readability

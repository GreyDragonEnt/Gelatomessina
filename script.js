// Gelato Messina - Interactive Website JavaScript
// Author: Senior Front-end Engineer & UX Copywriter
// Features: Theme toggle, flavor quiz, carousel, animations, accessibility

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍦 Gelato Messina website loaded!');
    
    // Initialize all components
    initThemeToggle();
    initHeroVideo();
    initFlavourCards();
    initQuiz();
    initCarousel();
    initModals();
    initUGC();
    initSocialMedia();
    initScrollEffects();
    initAccessibility();
    initShoppingCart();
});

// Hero Video and Image Management
function initHeroVideo() {
    const video = document.getElementById('hero-video');
    const heroImage = document.getElementById('hero-bg');
    
    // Ensure hero image is visible immediately
    if (heroImage) {
        // If image is already loaded (cached), show it immediately
        if (heroImage.complete && heroImage.naturalHeight !== 0) {
            heroImage.style.opacity = '1';
            console.log('🖼️ Hero image already loaded (cached)');
        } else {
            // Set visible by default and listen for load event
            heroImage.style.opacity = '1';
            
            heroImage.addEventListener('load', () => {
                heroImage.style.opacity = '1';
                console.log('🖼️ Hero image loaded successfully');
            });
            
            heroImage.addEventListener('error', () => {
                console.log('❌ Hero image failed to load, using fallback');
                // Create a fallback gradient background
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'absolute inset-0 bg-gradient-to-br from-neoearth-terracotta via-neoearth-pistachio to-neoearth-cocoa';
                heroImage.parentElement.appendChild(fallbackDiv);
                heroImage.style.display = 'none';
            });
        }
    }
    
    // Load video after image for enhanced experience
    if (video && heroImage) {
        // Only load video after image is displayed
        setTimeout(() => {
            // Show video when it's ready to play
            video.addEventListener('canplay', () => {
                video.style.opacity = '0.8'; // Slightly transparent to blend with image
                console.log('🎬 Hero video loaded');
            });
            
            // Handle video error - keep image
            video.addEventListener('error', () => {
                console.log('❌ Video failed to load, keeping image background');
                video.style.display = 'none';
            });
            
            // Lazy load video
            if ('IntersectionObserver' in window) {
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.load();
                            videoObserver.unobserve(video);
                        }
                    });
                });
                videoObserver.observe(video);
            } else {
                video.load();
            }
        }, 1000); // Delay video loading by 1 second
    }
}

// Theme Toggle with localStorage persistence
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    
    // Apply initial theme
    if (currentTheme === 'dark') {
        html.classList.add('dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    } else {
        html.classList.remove('dark');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const isDark = html.classList.contains('dark');
        
        if (isDark) {
            html.classList.remove('dark');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
            localStorage.setItem('theme', 'light');
            showNotification('☀️ Light mode activated');
        } else {
            html.classList.add('dark');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
            localStorage.setItem('theme', 'dark');
            showNotification('🌙 Dark mode activated');
        }
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                html.classList.add('dark');
                lightIcon.classList.remove('hidden');
                darkIcon.classList.add('hidden');
            } else {
                html.classList.remove('dark');
                lightIcon.classList.add('hidden');
                darkIcon.classList.remove('hidden');
            }
        }
    });
}

// Trending Flavours Heat-map
function initFlavourCards() {
    const container = document.getElementById('flavour-cards');
    
    const flavours = [
        { 
            name: 'Salted Caramel Gelato', 
            emoji: '🧂', 
            heat: 95, 
            description: 'Our signature blend with Aussie sea salt',
            image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        },
        { 
            name: 'Lamington Cake', 
            emoji: '🧁', 
            heat: 88, 
            description: 'Coconut sponge with raspberry jam swirl',
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        },
        { 
            name: 'Tim Tam Crunch', 
            emoji: '🍪', 
            heat: 92, 
            description: 'Chocolate biscuit pieces in vanilla base',
            image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        },
        { 
            name: 'Pavlova Dreams', 
            emoji: '🍓', 
            heat: 76, 
            description: 'Meringue chunks with fresh berry compote',
            image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        },
        { 
            name: 'Vegemite Caramel', 
            emoji: '🥨', 
            heat: 65, 
            description: 'Limited edition - love it or hate it!',
            image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        },
        { 
            name: 'Mango Sticky Rice', 
            emoji: '🥭', 
            heat: 84, 
            description: 'Thai-inspired with coconut rice pearls',
            image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        },
        { 
            name: 'Coffee Kangaroo', 
            emoji: '☕', 
            heat: 79, 
            description: 'Melbourne roast with cacao nibs',
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        },
        { 
            name: 'Fairy Bread Fusion', 
            emoji: '🌈', 
            heat: 71, 
            description: 'Hundreds & thousands in vanilla cream',
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        }
    ];
    
    flavours.forEach((flavour, index) => {
        const card = document.createElement('div');
        card.className = 'flavour-card bg-white dark:bg-neoearth-charcoal p-6 rounded-2xl shadow-lg';
        const price = 6.50 + (Math.random() * 2); // Random price between $6.50-$8.50
        card.innerHTML = `
            <div class="relative mb-6 rounded-xl overflow-hidden">
                <img src="${flavour.image}" alt="${flavour.name} gelato" class="w-full h-48 object-cover" loading="lazy">
                <div class="absolute top-3 right-3 text-3xl bg-white/95 dark:bg-neoearth-charcoal/95 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    ${flavour.emoji}
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div class="text-white text-sm font-medium opacity-90">Heat: ${flavour.heat}°</div>
                </div>
            </div>
            <h3 class="font-bold text-xl mb-3 text-neoearth-charcoal dark:text-white">${flavour.name}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">${flavour.description}</p>
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-neoearth-charcoal dark:text-white">Trending Score</span>
                    <span class="text-lg font-bold text-neoearth-coral">${flavour.heat}°</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 relative overflow-hidden">
                    <div class="heat-bar absolute left-0 top-0 h-full rounded-full" 
                         style="width: ${flavour.heat}%; animation-delay: ${index * 0.2}s;"></div>
                </div>
                <div class="flex justify-between items-center pt-2">
                    <span class="text-xl font-bold text-neoearth-coral">$${price.toFixed(2)}</span>
                    <button class="get-it-now-btn bg-neoearth-terracotta text-white px-4 py-2 rounded-lg font-semibold hover:bg-neoearth-cyberlime transition-all hover:scale-105" 
                            data-flavour='${JSON.stringify({...flavour, price: price.toFixed(2)})}'>
                        🍦 Get it Now
                    </button>
                </div>
            </div>
        `;
        
        // Add hover tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'heat-tooltip';
        tooltip.textContent = `${flavour.heat}° trending - ${getHeatDescription(flavour.heat)}`;
        card.appendChild(tooltip);
        
        // Tooltip hover events
        card.addEventListener('mouseenter', (e) => {
            tooltip.style.left = e.offsetX + 'px';
            tooltip.style.top = (e.offsetY - 40) + 'px';
            tooltip.classList.add('show');
        });
        
        card.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
        
        // Add to cart button handler
        const getItNowBtn = card.querySelector('.get-it-now-btn');
        getItNowBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            const flavourData = JSON.parse(e.target.dataset.flavour);
            addToCart(flavourData);
        });
        
        // Click handler for more info (only on card, not button)
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('get-it-now-btn')) {
                showNotification(`🍦 ${flavour.name} - ${flavour.description}`);
            }
        });
        
        container.appendChild(card);
    });
    
    // Auto-sliding functionality
    initFlavourAutoSlider(container);
}

function initFlavourAutoSlider(container) {
    let currentPosition = 0;
    let direction = 1; // 1 = right, -1 = left
    const slideSpeed = 1; // pixels per step (slower for smoother movement)
    const slideInterval = 30; // milliseconds between steps
    const pauseDuration = 2000; // pause at ends in milliseconds
    let isSliding = false;
    let isPaused = false;
    let slidingTimer = null;
    
    const scrollContainer = container.parentElement;
    
    // Get container dimensions
    function getSlideInfo() {
        const containerWidth = scrollContainer.clientWidth;
        const totalWidth = container.scrollWidth;
        const maxScroll = Math.max(0, totalWidth - containerWidth);
        return { containerWidth, totalWidth, maxScroll };
    }
    
    function smoothSlide() {
        if (isPaused || !isSliding) return;
        
        const { maxScroll } = getSlideInfo();
        
        // If there's no need to scroll (content fits in container)
        if (maxScroll <= 0) {
            isSliding = false;
            return;
        }
        
        // Calculate next position
        currentPosition += direction * slideSpeed;
        
        // Check if we need to reverse direction
        if (currentPosition >= maxScroll) {
            currentPosition = maxScroll;
            direction = -1;
            isSliding = false;
            setTimeout(() => {
                if (!isPaused) {
                    isSliding = true;
                    smoothSlide();
                }
            }, pauseDuration);
            scrollContainer.scrollLeft = currentPosition;
            return;
        } else if (currentPosition <= 0) {
            currentPosition = 0;
            direction = 1;
            isSliding = false;
            setTimeout(() => {
                if (!isPaused) {
                    isSliding = true;
                    smoothSlide();
                }
            }, pauseDuration);
            scrollContainer.scrollLeft = currentPosition;
            return;
        }
        
        // Apply the scroll
        scrollContainer.scrollLeft = currentPosition;
        
        // Continue sliding
        slidingTimer = setTimeout(smoothSlide, slideInterval);
    }
    
    function startSliding() {
        if (isPaused) return;
        
        const { maxScroll } = getSlideInfo();
        if (maxScroll <= 0) return; // Don't slide if content fits
        
        isSliding = true;
        smoothSlide();
    }
    
    function stopSliding() {
        isSliding = false;
        if (slidingTimer) {
            clearTimeout(slidingTimer);
            slidingTimer = null;
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const { maxScroll } = getSlideInfo();
        if (currentPosition > maxScroll) {
            currentPosition = maxScroll;
            scrollContainer.scrollLeft = currentPosition;
        }
    });
    
    // Pause on hover
    scrollContainer.addEventListener('mouseenter', () => {
        isPaused = true;
        stopSliding();
    });
    
    scrollContainer.addEventListener('mouseleave', () => {
        isPaused = false;
        setTimeout(() => {
            if (!isPaused) {
                startSliding();
            }
        }, 500);
    });
    
    // Handle manual scrolling - sync position
    scrollContainer.addEventListener('scroll', () => {
        if (!isSliding) {
            currentPosition = scrollContainer.scrollLeft;
        }
    });
    
    // Start the auto-sliding after a brief delay
    setTimeout(() => {
        const { maxScroll } = getSlideInfo();
        if (maxScroll > 0 && !isPaused) {
            startSliding();
        }
    }, 3000);
}

function getHeatDescription(heat) {
    if (heat >= 90) return 'Blazing hot! 🔥';
    if (heat >= 80) return 'Super popular! ⭐';
    if (heat >= 70) return 'Rising star! 📈';
    return 'Hidden gem! 💎';
}

// Flavour Personality Quiz
function initQuiz() {
    const container = document.getElementById('quiz-container');
    let currentQuestion = 0;
    let answers = [];
    
    const questions = [
        {
            question: "What's your ideal Saturday afternoon?",
            options: [
                { text: "Beach vibes with friends 🏖️", personality: 'adventurous' },
                { text: "Cozy cafe with a book ☕", personality: 'classic' },
                { text: "Exploring new neighborhoods 🚶", personality: 'creative' },
                { text: "Netflix marathon at home 🎬", personality: 'comfort' }
            ]
        },
        {
            question: "Pick your dream holiday destination:",
            options: [
                { text: "Tokyo, Japan 🗾", personality: 'adventurous' },
                { text: "Paris, France 🗼", personality: 'classic' },
                { text: "Iceland road trip 🌋", personality: 'creative' },
                { text: "Tuscany, Italy 🍇", personality: 'comfort' }
            ]
        },
        {
            question: "Your coffee order is:",
            options: [
                { text: "Whatever's on special! ☕", personality: 'adventurous' },
                { text: "Flat white, always 🥛", personality: 'classic' },
                { text: "Oat milk matcha latte 🍵", personality: 'creative' },
                { text: "Hot chocolate with marshmallows ☕", personality: 'comfort' }
            ]
        },
        {
            question: "Your wardrobe style:",
            options: [
                { text: "Bright patterns & bold colors 🌈", personality: 'adventurous' },
                { text: "Timeless pieces in neutral tones 🤍", personality: 'classic' },
                { text: "Vintage finds & unique accessories 👗", personality: 'creative' },
                { text: "Soft textures & cozy knits 🧶", personality: 'comfort' }
            ]
        },
        {
            question: "Friday night plans:",
            options: [
                { text: "Try that new restaurant everyone's talking about 🍽️", personality: 'adventurous' },
                { text: "Dinner at my favorite local spot 🍝", personality: 'classic' },
                { text: "Cook an experimental recipe from TikTok 👨‍🍳", personality: 'creative' },
                { text: "Order in and watch feel-good movies 🍕", personality: 'comfort' }
            ]
        }
    ];
    
    const personalities = {
        adventurous: {
            flavour: 'Vegemite Caramel',
            emoji: '🥨',
            description: 'Bold, daring, and not afraid of controversy! You live for the thrill of trying something completely unexpected.',
            traits: ['Risk-taker', 'Trendsetter', 'Open-minded']
        },
        classic: {
            flavour: 'Vanilla Bean Supreme',
            emoji: '🤍',
            description: 'Timeless elegance with hidden depths. You appreciate quality and tradition but with your own sophisticated twist.',
            traits: ['Refined', 'Reliable', 'Sophisticated']
        },
        creative: {
            flavour: 'Fairy Bread Fusion',
            emoji: '🌈',
            description: 'Whimsical and imaginative! You turn everyday moments into magical experiences and inspire others to see the world differently.',
            traits: ['Artistic', 'Innovative', 'Inspiring']
        },
        comfort: {
            flavour: 'Tim Tam Crunch',
            emoji: '🍪',
            description: 'Warm, welcoming, and wonderfully nostalgic. You know the secret to happiness is found in life\'s simple pleasures.',
            traits: ['Nurturing', 'Loyal', 'Optimistic']
        }
    };
    
    function renderQuestion() {
        const question = questions[currentQuestion];
        const progress = (currentQuestion / questions.length) * 100; // Changed: show progress based on completed questions
        
        container.innerHTML = `
            <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium text-neoearth-char dark:text-neoearth-sandstone">Question ${currentQuestion + 1} of ${questions.length}</span>
                    <span class="text-sm text-neoearth-terracotta font-bold">${Math.round(progress)}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div class="bg-gradient-to-r from-neoearth-terracotta to-neoearth-pistachio h-2 rounded-full quiz-progress" style="width: ${progress}%"></div>
                </div>
            </div>
            
            <h3 class="text-2xl font-bold mb-8 text-neoearth-terracotta dark:text-neoearth-terracotta">${question.question}</h3>
            
            <div class="space-y-4">
                ${question.options.map((option, index) => `
                    <button class="quiz-option w-full p-4 text-left bg-neoearth-sandstone dark:bg-neoearth-char backdrop-blur-sm rounded-xl border-2 border-neoearth-cocoa/20 hover:border-neoearth-cyberlime hover:bg-neoearth-cyberlime/10 dark:hover:bg-neoearth-cyberlime/20 transition-all"
                            data-personality="${option.personality}" data-index="${index}">
                        <span class="text-neoearth-char dark:text-neoearth-sandstone font-medium">${option.text}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        // Add click handlers
        container.querySelectorAll('.quiz-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const personality = e.currentTarget.dataset.personality;
                console.log(`Answer selected: ${personality} for question ${currentQuestion + 1}`);
                
                answers.push(personality);
                console.log('Current answers array:', answers);
                
                // Visual feedback
                container.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                
                setTimeout(() => {
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        renderQuestion();
                    } else {
                        console.log('Quiz completed, showing results...');
                        showResult();
                    }
                }, 600);
            });
        });
    }
    
    function showResult() {
        // Debug: Check if answers were collected
        console.log('Quiz answers collected:', answers);
        
        // Calculate personality based on most frequent answer
        const counts = {};
        answers.forEach(answer => counts[answer] = (counts[answer] || 0) + 1);
        
        console.log('Personality counts:', counts);
        
        // Handle case where no answers were recorded (fallback)
        if (Object.keys(counts).length === 0) {
            console.warn('No answers recorded, using default personality');
            const winningPersonality = 'classic'; // Default fallback
            const result = personalities[winningPersonality];
        } else {
            var winningPersonality = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
            var result = personalities[winningPersonality];
        }
        
        console.log('Winning personality:', winningPersonality);
        console.log('Result object:', result);
        
        // Extra safety check
        if (!result) {
            console.error('Result is undefined, using fallback');
            result = personalities['classic'];
            winningPersonality = 'classic';
        }
        
        container.innerHTML = `
            <div class="text-center">
                <div class="text-6xl mb-6">${result.emoji}</div>
                <h3 class="text-3xl font-bold mb-4 text-neoearth-terracotta dark:text-neoearth-terracotta">You're ${result.flavour}!</h3>
                <p class="text-lg mb-6 text-neoearth-char dark:text-neoearth-sandstone">${result.description}</p>
                
                <div class="bg-neoearth-sandstone dark:bg-neoearth-char backdrop-blur-sm p-6 rounded-xl mb-6 border border-neoearth-cocoa/20">
                    <h4 class="font-semibold mb-3 text-neoearth-char dark:text-neoearth-sandstone">Your personality traits:</h4>
                    <div class="flex flex-wrap gap-2 justify-center">
                        ${result.traits.map(trait => `
                            <span class="px-3 py-1 bg-neoearth-lavender text-white rounded-full text-sm">${trait}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button id="share-result" class="bg-neoearth-terracotta text-white px-6 py-3 rounded-full font-semibold hover:bg-neoearth-cyberlime transition-all hover:scale-105">
                        📸 Share on IG
                    </button>
                    <button id="retake-quiz" class="bg-neoearth-pistachio text-white px-6 py-3 rounded-full font-semibold hover:bg-neoearth-cyberlime transition-all hover:scale-105">
                        🔄 Retake Quiz
                    </button>
                </div>
            </div>
        `;
        
        // Add event handlers with error checking
        const shareBtn = document.getElementById('share-result');
        const retakeBtn = document.getElementById('retake-quiz');
        
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                showNotification('📱 Opening Instagram share... (demo)');
            });
        }
        
        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => {
                currentQuestion = 0;
                answers = [];
                renderQuestion();
            });
        }
    }
    
    // Start the quiz
    renderQuestion();
}

// Farm Images Carousel
function initCarousel() {
    const carousel = document.getElementById('farm-carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Check if carousel elements exist
    if (!carousel) {
        console.warn('Carousel container not found');
        return;
    }
    
    if (!dots.length) {
        console.warn('Carousel dots not found');
        return;
    }
    
    const farmImages = [
        {
            src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
            alt: 'Sunny Ridge Dairy Farm with Holstein cows grazing in green pastures - Partner since 2018',
            caption: '🐄 Sunny Ridge Dairy Farm - Fresh milk delivered daily from Gippsland VIC'
        },
        {
            src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
            alt: 'Berry Bliss Farm with rows of strawberry plants in the Yarra Valley at sunrise',
            caption: '🍓 Berry Bliss Farm - Peak season strawberries from Yarra Valley VIC'
        },
        {
            src: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            alt: 'Buzzworthy Apiaries with wooden beehives among native Australian wildflowers',
            caption: '🍯 Buzzworthy Apiaries - Raw honey from Dandenong Ranges VIC'
        },
        {
            src: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1137&q=80',
            alt: 'Organic vanilla bean plantation with workers harvesting vanilla pods',
            caption: '🌿 Vanilla Groves Co-op - Premium vanilla beans from Northern NSW'
        }
    ];
    
    let currentSlide = 0;
    
    // Create carousel slides
    farmImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" class="w-full h-full object-cover" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div class="text-white p-6">
                    <p class="text-lg font-semibold mb-2">${image.caption}</p>
                    <p class="text-sm opacity-90">${image.alt}</p>
                </div>
            </div>
        `;
        carousel.appendChild(slide);
    });
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    function goToSlide(index) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        
        // Ensure we have valid elements before proceeding
        if (!slides.length || !dots.length || index >= slides.length || index >= dots.length) {
            return;
        }
        
        // Update slides
        slides[currentSlide]?.classList.remove('active');
        slides[index]?.classList.add('active');
        
        // Update dots
        dots[currentSlide]?.classList.remove('bg-neoearth-coral');
        dots[currentSlide]?.classList.add('bg-gray-300');
        dots[index]?.classList.remove('bg-gray-300');
        dots[index]?.classList.add('bg-neoearth-coral');
        
        currentSlide = index;
    }
    
    // Auto-advance carousel
    setInterval(() => {
        if (farmImages.length > 1) {
            const nextSlide = (currentSlide + 1) % farmImages.length;
            goToSlide(nextSlide);
        }
    }, 5000);
}

// Modal functionality
function initModals() {
    const trackModal = document.getElementById('track-modal');
    const trackBtn = document.getElementById('track-scoop-btn');
    const closeBtn = document.getElementById('close-track-modal');
    
    trackBtn.addEventListener('click', () => {
        trackModal.classList.remove('hidden');
        trackModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        closeBtn.focus();
    });
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close on backdrop click
    trackModal.addEventListener('click', (e) => {
        if (e.target === trackModal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !trackModal.classList.contains('hidden')) {
            closeModal();
        }
    });
    
    function closeModal() {
        trackModal.classList.add('hidden');
        trackModal.classList.remove('flex');
        document.body.style.overflow = '';
        trackBtn.focus(); // Return focus to trigger
    }
}

// UGC (User Generated Content) Grid
function initUGC() {
    const grid = document.getElementById('ugc-grid');
    
    const ugcPosts = [
        { 
            username: '@sarah_scoops', 
            caption: 'Lamington dreams do come true! 🧁✨', 
            likes: '234', 
            image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            alt: 'Three scoops of gelato with lamington flavour and coconut shavings'
        },
        { 
            username: '@gelato_guru', 
            caption: 'That Vegemite Caramel hit different 🥨', 
            likes: '189', 
            image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            alt: 'Close-up of Vegemite caramel gelato with sea salt crystals'
        },
        { 
            username: '@melbourne_foodie', 
            caption: 'Three scoops of pure happiness 🍦', 
            likes: '567', 
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            alt: 'Triple scoop gelato cone with different colored flavours'
        },
        { 
            username: '@sweet_adventures', 
            caption: 'Pink vibes at Messina Brighton 💕', 
            likes: '423', 
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            alt: 'Pink gelato in a waffle cone against pink background'
        },
        { 
            username: '@dessert_hunter', 
            caption: 'Tim Tam Crunch = childhood memories 🍪', 
            likes: '334', 
            image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            alt: 'Chocolate gelato with cookie pieces and chocolate sauce drizzle'
        },
        { 
            username: '@foodie_couple', 
            caption: 'Date night done right! 🥰', 
            likes: '612', 
            image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            alt: 'Two people sharing gelato cups with heart-shaped spoons'
        },
        { 
            username: '@messina_addict', 
            caption: 'Pavlova Dreams living up to the name ☁️', 
            likes: '445', 
            image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            alt: 'White gelato with meringue pieces and berry compote swirl'
        },
        { 
            username: '@gelato_queen', 
            caption: 'Mango Sticky Rice = tropical paradise 🥭', 
            likes: '378', 
            image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            alt: 'Yellow mango gelato with coconut rice pearls in a glass bowl'
        }
    ];
    
    ugcPosts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'ugc-post';
        
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.alt}" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
            <div class="ugc-overlay">
                <div class="text-sm font-semibold">${post.username}</div>
                <div class="text-xs opacity-90 mt-1">${post.caption}</div>
                <div class="text-xs opacity-75 mt-2">❤️ ${post.likes}</div>
            </div>
        `;
        
        postElement.addEventListener('click', () => {
            showNotification(`📱 Opening ${post.username}'s post... (demo)`);
        });
        
        grid.appendChild(postElement);
    });
}

function getRandomGradient() {
    const gradients = [
        'linear-gradient(135deg, #FF6B9D, #4ECDC4)',
        'linear-gradient(135deg, #4ECDC4, #FF6B9D)',
        'linear-gradient(135deg, #FF6B9D, #FFD93D)',
        'linear-gradient(135deg, #4ECDC4, #6BCF7F)',
        'linear-gradient(135deg, #A8E6CF, #FF6B9D)',
        'linear-gradient(135deg, #FFB6C1, #4ECDC4)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

// Social media interactions
function initSocialMedia() {
    const socialLinks = document.querySelectorAll('#social-media a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = link.querySelector('h3').textContent;
            
            // Add visual feedback
            const icon = link.querySelector('div:first-child');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            
            setTimeout(() => {
                icon.style.transform = '';
            }, 300);
            
            // Show notification
            showNotification(`🚀 Opening ${platform}... Follow us for daily gelato goodness!`);
            
            // Track social media clicks (for analytics)
            console.log(`📱 Social media click: ${platform}`);
        });
        
        // Add hover effects
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('div:first-child');
            icon.style.filter = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))';
        });
        
        link.addEventListener('mouseleave', () => {
            const icon = link.querySelector('div:first-child');
            icon.style.filter = '';
        });
    });
}

// Scroll effects (parallax and smooth scroll removed to prevent page sliding)
function initScrollEffects() {
    // Note: Removed smooth scroll and parallax effects that were causing unwanted page sliding
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('section h2, .flavour-card, .quiz-option').forEach(el => {
        observer.observe(el);
    });
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 80; // Account for fixed header
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Note: Navbar color changing on scroll has been removed - header maintains consistent styling
}

// Accessibility enhancements
function initAccessibility() {
    // Skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const hero = document.getElementById('hero');
    hero.id = 'main-content';
    hero.setAttribute('role', 'main');
    
    // Focus management for modals and interactive elements
    document.addEventListener('keydown', (e) => {
        // Tab trapping in modals
        if (!document.getElementById('track-modal').classList.contains('hidden')) {
            const modal = document.getElementById('track-modal');
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });
    
    // Announce page changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.id = 'page-announcer';
    document.body.appendChild(announcer);
    
    // Reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white/80 hover:text-white">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Announce to screen readers
    const announcer = document.getElementById('page-announcer');
    if (announcer) {
        announcer.textContent = message;
    }
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('🚀 Page load performance:', {
                domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
                loadComplete: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                firstPaint: Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0)
            });
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Error handling
window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Shopping Cart System
let cart = JSON.parse(localStorage.getItem('messinaCart')) || [];

function initShoppingCart() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Cart toggle button
    cartToggle.addEventListener('click', () => {
        openCart();
    });
    
    // Close cart button
    closeCartBtn.addEventListener('click', () => {
        closeCart();
    });
    
    // Close on backdrop click (but allow clicking through to interact with page elements)
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal || e.target.classList.contains('bg-black/30')) {
            closeCart();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !cartModal.classList.contains('hidden')) {
            closeCart();
        }
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            showNotification('🎉 Redirecting to checkout... (demo)', 'success');
            // In real implementation, redirect to checkout page
        }
    });
    
    // Initialize cart display
    updateCartDisplay();
    updateCartCount();
}

function openCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartSidebar = cartModal.querySelector('.fixed.right-0');
    
    cartModal.classList.remove('hidden');
    cartModal.classList.remove('pointer-events-none');
    document.body.style.overflow = 'hidden';
    
    // Slide in animation
    setTimeout(() => {
        cartSidebar.classList.remove('translate-x-full');
    }, 10);
    
    // Focus management
    document.getElementById('close-cart').focus();
}

function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartSidebar = cartModal.querySelector('.fixed.right-0');
    
    // Slide out animation
    cartSidebar.classList.add('translate-x-full');
    
    setTimeout(() => {
        cartModal.classList.add('hidden');
        cartModal.classList.add('pointer-events-none');
        document.body.style.overflow = '';
    }, 300);
    
    // Return focus
    document.getElementById('cart-toggle').focus();
    
    // Scroll to flavours section if user wants to continue shopping
    const flavoursSection = document.getElementById('flavours');
    if (flavoursSection) {
        setTimeout(() => {
            const headerHeight = 80;
            const targetPosition = flavoursSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 400); // Wait for cart to close first
    }
}

function addToCart(flavour) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === flavour.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...flavour,
            quantity: 1,
            id: Date.now() // Simple ID generation
        });
    }
    
    // Save to localStorage
    localStorage.setItem('messinaCart', JSON.stringify(cart));
    
    // Update UI
    updateCartDisplay();
    updateCartCount();
    
    // Show success notification
    showNotification(`🍦 ${flavour.name} added to cart!`, 'success');
    
    // Add visual feedback to button
    const btn = document.querySelector(`[data-flavour*="${flavour.name}"]`);
    if (btn) {
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    }
    
    // Open cart modal after adding item
    setTimeout(() => {
        openCart();
    }, 500); // Small delay to show the success notification first
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('messinaCart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
    showNotification('Item removed from cart', 'info');
}

function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('messinaCart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 py-8">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"/>
                </svg>
                <p>Your cart is empty</p>
                <p class="text-sm mt-2">Add some delicious gelato to get started!</p>
                <button onclick="closeCart()" class="mt-4 bg-neoearth-terracotta text-white px-6 py-2 rounded-lg hover:bg-neoearth-cyberlime transition-all">
                    🍦 Browse Flavours
                </button>
            </div>
        `;
        cartTotal.textContent = '$0.00';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = `
            ${cart.map(item => `
                <div class="flex items-center space-x-4 p-4 bg-neoearth-sandstone dark:bg-neoearth-char backdrop-blur-sm rounded-xl border border-neoearth-cocoa/20">
                    <div class="text-2xl">${item.emoji}</div>
                    <div class="flex-1">
                        <h4 class="font-semibold text-neoearth-char dark:text-neoearth-sandstone">${item.name}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300">$${item.price} each</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                                class="w-8 h-8 bg-neoearth-cocoa/20 dark:bg-neoearth-cocoa/40 text-neoearth-char dark:text-neoearth-sandstone rounded-full flex items-center justify-center text-sm hover:bg-neoearth-cyberlime/30 dark:hover:bg-neoearth-cyberlime/60 transition-all">-</button>
                        <span class="w-8 text-center font-semibold">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" 
                                class="w-8 h-8 bg-neoearth-cocoa/20 dark:bg-neoearth-cocoa/40 text-neoearth-char dark:text-neoearth-sandstone rounded-full flex items-center justify-center text-sm hover:bg-neoearth-cyberlime/30 dark:hover:bg-neoearth-cyberlime/60 transition-all">+</button>
                    </div>
                    <button onclick="removeFromCart(${item.id})" 
                            class="text-red-500 hover:text-red-700 p-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            `).join('')}
            
            <div class="mt-6 p-4 bg-neoearth-sandstone/60 dark:bg-neoearth-char/60 backdrop-blur-sm rounded-xl border-2 border-dashed border-neoearth-terracotta/30">
                <div class="text-center">
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">Want to add more flavours?</p>
                    <button onclick="closeCart()" class="bg-neoearth-pistachio text-white px-4 py-2 rounded-lg font-semibold hover:bg-neoearth-cyberlime transition-all hover:scale-105">
                        🍦 Continue Shopping
                    </button>
                </div>
            </div>
        `;
        
        const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
        checkoutBtn.disabled = false;
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }
}

// Make functions globally available for onclick handlers
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.closeCart = closeCart;

// Service worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getHeatDescription,
        getRandomGradient,
        showNotification
    };
}

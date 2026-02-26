// ========================================
// Kerala-Style Chatbot JavaScript
// ========================================

if (!window.KeralaChatbot) {
    window.KeralaChatbot = class {
        constructor() {
            this.isOpen = false;
            this.messages = [];
            this.init();
        }

        init() {
            this.cacheElements();
            this.bindEvents();
            this.showWelcomeMessage();
        }

        cacheElements() {
            this.characterBtn = document.querySelector('.chatbot-character');
            this.chatWindow = document.querySelector('.chatbot-window');
            this.closeBtn = document.querySelector('.chat-close');
            this.messagesContainer = document.querySelector('.chat-messages');
        }

        bindEvents() {
            if (!this.characterBtn) return;
            // Note: open/close toggling is handled by React state in Header.jsx
            // Only bind quick reply delegation here
            if (this.messagesContainer) {
                this.messagesContainer.addEventListener('click', (e) => {
                    if (e.target.classList.contains('quick-reply-btn')) {
                        this.handleQuickReply(e.target.textContent);
                    }
                });
            }
        }

        toggleChat() {
            if (!this.chatWindow || !this.characterBtn) return;
            this.isOpen = !this.isOpen;
            this.chatWindow.classList.toggle('active');
            this.characterBtn.classList.toggle('chat-open');
        }

        showWelcomeMessage() {
            setTimeout(() => {
                this.addBotMessage(
                    "Welcome to Galiliea Houseboat! I'm here to help you plan your perfect backwater cruise. How can I assist you today?",
                    [
                        "FAQ",
                        "View Packages",
                        "Check Availability",
                        "Contact Us"
                    ]
                );
            }, 500);
        }


        addUserMessage(text) {
            const messageHTML = `
                <div class="message user">
                    <div class="message-content">
                        <div class="message-bubble">${this.escapeHtml(text)}</div>
                        <div class="message-time">${this.getCurrentTime()}</div>
                    </div>
                </div>
            `;
            this.messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
            this.scrollToBottom();
        }

        addBotMessage(text, quickReplies = []) {
            let quickRepliesHTML = '';
            if (quickReplies.length > 0) {
                const buttons = quickReplies.map(reply =>
                    `<button class="quick-reply-btn">${reply}</button>`
                ).join('');
                quickRepliesHTML = `<div class="quick-replies">${buttons}</div>`;
            }

            const messageHTML = `
                <div class="message bot">
                    <div class="message-content">
                        <div class="message-bubble">${text}</div>
                        ${quickRepliesHTML}
                        <div class="message-time">${this.getCurrentTime()}</div>
                    </div>
                </div>
            `;
            this.messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
            this.scrollToBottom();
        }

        showTypingIndicator() {
            const indicatorHTML = `
                <div class="message bot typing-message">
                    <div class="message-content">
                        <div class="typing-indicator">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                </div>
            `;
            this.messagesContainer.insertAdjacentHTML('beforeend', indicatorHTML);
            this.scrollToBottom();
        }

        hideTypingIndicator() {
            const typingMessage = this.messagesContainer.querySelector('.typing-message');
            if (typingMessage) {
                typingMessage.remove();
            }
        }

        handleQuickReply(reply) {
            this.addUserMessage(reply);
            this.showTypingIndicator();

            setTimeout(() => {
                this.hideTypingIndicator();
                this.processUserMessage(reply);
            }, 1000);
        }

        processUserMessage(message) {
            const lowerMessage = message.toLowerCase();

            // FAQ Main Menu
            if (lowerMessage.includes('faq') || lowerMessage.includes('frequently asked questions')) {
                this.addBotMessage(
                    "I've categorized our most common questions to help you find answers quickly. Which area would you like to know about?",
                    ["Cruise & Timing", "Life on Board", "Booking & Packages", "General Info"]
                );
            }

            // FAQ Category: Cruise & Timing
            else if (lowerMessage === 'cruise & timing') {
                this.addBotMessage(
                    "Here are questions about our cruises and timing. Click a question to see the answer:",
                    [
                        "Best time for cruise?",
                        "Best cruise route?",
                        "Typical cruise duration?",
                        "Why anchor at night?",
                        "Monsoon availability?",
                        "Back to FAQ"
                    ]
                );
            }
            else if (lowerMessage.includes('best time for cruise')) {
                this.addBotMessage("The best time for an Alleppey houseboat cruise is from <strong>September to March</strong>, when the weather is pleasant and the water is calm. However, each season has its own charm!");
                this.addBotMessage("Any other timing questions?", ["Cruise & Timing", "Main Menu"]);
            }
            else if (lowerMessage.includes('best cruise route')) {
                this.addBotMessage("The <strong>Alleppey to Kuttanad</strong> circuit is widely considered the best route. It offers a perfect mix of wide lakes and narrow palm-fringed canals where you can see local life.");
                this.addBotMessage("Any other timing questions?", ["Cruise & Timing", "Main Menu"]);
            }
            else if (lowerMessage.includes('typical cruise duration')) {
                this.addBotMessage("A typical overnight cruise is <strong>21 hours</strong> (12:00 PM to 9:00 AM next day). A day cruise is usually <strong>6 hours</strong> (11:00 AM to 5:00 PM).");
                this.addBotMessage("Any other timing questions?", ["Cruise & Timing", "Main Menu"]);
            }
            else if (lowerMessage.includes('why anchor at night')) {
                this.addBotMessage("Government regulations require all houseboats to anchor between <strong>5:30 PM and 8:00 AM</strong>. This is to ensure that local fishermen can lay their nets without disruption. It's also a very peaceful time to enjoy the quiet backwaters!");
                this.addBotMessage("Any other timing questions?", ["Cruise & Timing", "Main Menu"]);
            }
            else if (lowerMessage.includes('monsoon availability')) {
                this.addBotMessage("<strong>Yes!</strong> Houseboat cruises are available during the monsoon season. While it rains, the backwaters look incredibly lush and green. Cruises might be restricted during very heavy wind or high-flood warnings for safety.");
                this.addBotMessage("Any other timing questions?", ["Cruise & Timing", "Main Menu"]);
            }

            // FAQ Category: Life on Board
            else if (lowerMessage === 'life on board') {
                this.addBotMessage(
                    "Curious about what it's like on the boat? Ask away:",
                    [
                        "What is the food menu?",
                        "Who will be the staff?",
                        "What should we carry?",
                        "Back to FAQ"
                    ]
                );
            }
            else if (lowerMessage.includes('food menu')) {
                this.addBotMessage("We serve authentic Kerala cuisine!\n• <strong>Lunch:</strong> Rice, Kerala Fish Fry (Pearl Spot/Karimeen), Chicken Roast, and various vegetarian curries.\n• <strong>Snacks:</strong> Tea/Coffee with traditional snacks like banana fritters.\n• <strong>Dinner/Breakfast:</strong> Rice, Chapati, Fish Curry, Chicken Curry, and various vegetarian curries.");
                this.addBotMessage("Anything else?", ["Life on Board", "Main Menu"]);
            }
            else if (lowerMessage.includes('staff')) {
                this.addBotMessage("Standard houseboats have a professional <strong>3-member crew</strong>: a Captain/Driver, an Assistant Driver, and a private Chef dedicated to your comfort and meals.");
                this.addBotMessage("Anything else?", ["Life on Board", "Main Menu"]);
            }
            else if (lowerMessage.includes('what should we carry')) {
                this.addBotMessage("We recommend carrying:\n• A valid Photo ID (required for check-in)\n• Camera & power bank\n• Light cotton clothing & sunglasses\n• Any personal medicine you might need.\nWe provide all towels and basic toiletries!");
                this.addBotMessage("Anything else?", ["Life on Board", "Main Menu"]);
            }

            // FAQ Category: Booking & Packages
            else if (lowerMessage === 'booking & packages') {
                this.addBotMessage(
                    "Ready to book or checking prices?",
                    [
                        "How much does it cost?",
                        "Direct vs Online booking?",
                        "Cheaper options?",
                        "Do packages include pickup?",
                        "Back to FAQ"
                    ]
                );
            }
            else if (lowerMessage.includes('cost')) {
                this.addBotMessage("Houseboat rates vary by season, number of bedrooms, and category (Deluxe/Premium). For exact rates for your dates, please contact +91 9746814181 / +91 9895646190");
                this.addBotMessage("Want to inquire?", ["Book Now", "Booking & Packages"]);
            }
            else if (lowerMessage.includes('direct vs online')) {
                this.addBotMessage("While you can find boats directly at the finishing point, <strong>Online Booking</strong> is highly recommended. It guarantees you a well-maintained boat, bypasses middle-men commissions, and ensures your preferred dates are secured.");
                this.addBotMessage("Check our slots?", ["Check Availability", "Booking & Packages"]);
            }
            else if (lowerMessage.includes('cheaper options')) {
                this.addBotMessage("If a private houseboat is out of budget, <strong>Shikara boats</strong> or <strong>Canoe cruises</strong> are excellent cheaper alternatives. They can navigate narrow canals that houseboats can't, though they don't have stay or food facilities.");
                this.addBotMessage("Want to see packages?", ["View Packages", "Booking & Packages"]);
            }
            else if (lowerMessage.includes('pickup')) {
                this.addBotMessage("Most standard packages <strong>do not</strong> include pickup and drop from the airport or railway station. However, we can arrange private transfers for an additional fee if requested during booking.");
                this.addBotMessage("Need a transfer?", ["Contact Us", "Booking & Packages"]);
            }

            // FAQ Category: General Info
            else if (lowerMessage === 'general info') {
                this.addBotMessage(
                    "General questions about Alleppey:",
                    [
                        "Alleppey vs Alappuzha?",
                        "Alleppey vs Alapi?",
                        "Back to FAQ"
                    ]
                );
            }
            else if (lowerMessage.includes('alleppey') && lowerMessage.includes('alappuzha')) {
                this.addBotMessage("They are exactly the same! <strong>Alappuzha</strong> is the official Malayalam name, and <strong>Alleppey</strong> is the English name used since the British era.");
                this.addBotMessage("Good to know?", ["General Info", "Main Menu"]);
            }
            else if (lowerMessage.includes('alapi')) {
                this.addBotMessage("You'll often hear 'Alapi' or 'Alappuzha'. These are just local variations of 'Alleppey'. No matter the name, the beauty is the same!");
                this.addBotMessage("Any other questions?", ["General Info", "Main Menu"]);
            }

            // Fallback for Navigation
            else if (lowerMessage === 'back to faq') {
                this.processUserMessage('frequently asked questions');
            }
            else if (lowerMessage === 'main menu') {
                this.addBotMessage("How else can I help you?", ["View Packages", "Check Availability", "Frequently Asked Questions", "Contact Us"]);
            }

            // Booking & Availability (Joined with FAQ logic chain)
            else if (lowerMessage.includes('book') || lowerMessage.includes('availability') || lowerMessage.includes('check availability')) {
                this.addBotMessage(
                    "Great! We have both Day Cruise and Overnight packages available. You can check availability and book directly through our booking page. Would you like me to show you our packages?",
                    ["View Packages", "Day Cruise Info", "Overnight Info", "Contact for Booking"]
                );
            }
            // Packages & Pricing
            else if (lowerMessage.includes('package') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('view packages')) {
                this.addBotMessage(
                    "We offer two main packages:\n\n <strong>Day Cruise</strong> (11 AM - 5 PM)\n• Deluxe & Premium options\n• Lunch, Tea & Snacks included\n\n <strong>Overnight Cruise</strong> (12 PM - 9 AM next day)\n• Deluxe & Premium options\n• All meals included\n• AC accommodation\n\nWould you like more details about a specific package?",
                    ["Day Cruise Details", "Overnight Details", "See Menu", "Book Now"]
                );
            }
            // Day Cruise
            else if (lowerMessage.includes('day cruise') || lowerMessage.includes('day trip')) {
                this.addBotMessage(
                    " <strong>Day Cruise Experience</strong>\n\n Timing: 11:00 AM to 5:00 PM\n\n<strong>Day Cruise Deluxe Package:</strong>\n• Welcome drink\n• Authentic Kerala lunch\n• Evening tea & snacks\n\n<strong>Day Cruise Premium Package:</strong>\n• All Deluxe features\n• Full-time AC\n• Special Payasam dessert\n\nPerfect for a relaxing day on the backwaters!",
                    ["See Full Menu", "Check Availability", "Overnight Option"]
                );
            }
            // Overnight Cruise
            else if (lowerMessage.includes('overnight') || lowerMessage.includes('night')) {
                this.addBotMessage(
                    "<strong>Overnight Cruise Experience</strong>\n\n Timing: 12:00 PM to 9:00 AM (next day)\n\n<strong>Overnight Deluxe Package:</strong>\n• All meals (Lunch, Dinner, Breakfast)\n• AC: 9 PM to 6 AM\n• Comfortable accommodation\n\n<strong>Overnight Premium Package:</strong>\n• All Deluxe features\n• Full-time AC\n• Premium menu items\n\nExperience the magic of Kerala backwaters under the stars!",
                    ["See Full Menu", "Check Availability", "Day Cruise Option"]
                );
            }
            // Menu
            else if (lowerMessage.includes('menu') || lowerMessage.includes('food') || lowerMessage.includes('meal') || lowerMessage.includes('see menu')) {
                this.addBotMessage(
                    "Our menu features authentic Kerala cuisine!\n\n<strong>Highlights:</strong>\n• Fresh Fish Fry (Pearl Spot/Seer)\n• Traditional Chicken Roast\n• Vegetarian specialties\n• Special Payasam (Premium)\n\nYou can view the complete menu on our website.",
                    ["Main Menu", "Book Now"]
                );
            }
            // Contact
            else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
                this.addBotMessage(
                    "<strong>Get in Touch</strong>\n\nWe'd love to hear from you!\n\nYou can reach us through our contact page or call us directly for immediate assistance. Our team is ready to help you plan your perfect houseboat experience!",
                    ["Go to Contact Page", "View Packages", "More Questions"]
                );
            }
            // Amenities
            else if (lowerMessage.includes('amenities') || lowerMessage.includes('facilities') || lowerMessage.includes('features')) {
                this.addBotMessage(
                    "<strong>Houseboat Amenities</strong>\n\n• Comfortable bedrooms\n• Air conditioning (package dependent)\n• Traditional Kerala meals\n• Scenic viewing deck\n• Professional crew\n• Safety equipment\n• Clean restrooms\n\nAll houseboats are well-maintained and follow safety standards!",
                    ["View Packages", "Book Now", "More Questions"]
                );
            }
            // Location
            else if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('address')) {
                this.addBotMessage(
                    "We operate in the beautiful Kerala backwaters! Our houseboats cruise through scenic waterways, traditional villages, and lush landscapes.\n\nFor specific pickup points and directions, please visit our contact page or call us directly.",
                    ["Contact Us", "View Packages", "More Info"]
                );
            }
            // Greetings
            else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('namaste')) {
                this.addBotMessage(
                    "Hello! Welcome back! How can I help you with your houseboat experience today?",
                    ["View Packages", "Check Availability", "Frequently Asked Questions", "Contact Us"]
                );
            }
            // Thank you
            else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
                this.addBotMessage(
                    "You're most welcome! Is there anything else you'd like to know about our houseboat cruises?",
                    ["View Packages", "Book Now", "Frequently Asked Questions"]
                );
            }
            // Default response
            else {
                this.addBotMessage(
                    "I'd be happy to help! I can assist you with:\n\n• FAQ (Timing, Food, Staff, etc)\n• Package information & pricing\n• Booking & Availability\n• Contact information\n\nWhat would you like to know more about?",
                    ["Frequently Asked Questions", "View Packages", "Check Availability", "Contact Us"]
                );
            }
        }

        scrollToBottom() {
            if (this.messagesContainer) {
                setTimeout(() => {
                    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
                }, 100);
            }
        }

        getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }

        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }
}

// Initialize chatbot — called from the .load() callback after header HTML is injected
function initChatbot() {
    console.log("Chatbot: Attempting initialization...");
    if (!window._chatbotInitialized) {
        const charBtn = document.querySelector('.chatbot-character');
        if (charBtn) {
            console.log("Chatbot: Character button found, creating instance.");
            window._chatbotInitialized = true;
            window.chatbot = new KeralaChatbot();
        } else {
            console.log("Chatbot: Character button NOT found in DOM yet.");
        }
    } else {
        console.log("Chatbot: Already initialized.");
    }
}

export { initChatbot };
export default initChatbot;

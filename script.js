// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.card, .explore-card, .topic-card, .use-case-card, .value-card, .about-card, .decision-card, .ip-card, .source-card, .example-card, .encourage-item, .tip-item, .not-item, .ethics-item, .myth-item, .content-intro, .quick-tips, .values-section, .encourage-section, .not-section, .final-message, section');
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.container');
            if (heroContent && scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
            }
        });
    }

    // Smooth reveal for floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '0.3';
            icon.style.animation = `float 6s ease-in-out infinite`;
            icon.style.animationDelay = `${index * 1.5}s`;
        }, index * 200);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Discussion Board Functionality
    initDiscussionBoard();
});

// Discussion Board Functions
function initDiscussionBoard() {
    const discussionForm = document.querySelector('.discussion-form-inner');
    const discussionList = document.querySelector('.discussion-list');
    
    if (!discussionForm || !discussionList) return;

    // Initialize with sample discussions if localStorage is empty
    if (!localStorage.getItem('discussions')) {
        const sampleDiscussions = [
            {
                id: Date.now() - 172800000, // 2 days ago
                topic: 'How do I validate my startup idea without spending money?',
                category: 'startups',
                categoryLabel: 'Startups 101',
                message: 'I have an idea for an app but I\'m not sure if people would actually use it. What are some free ways to test if there\'s demand?',
                timestamp: Date.now() - 172800000,
                replies: 5
            },
            {
                id: Date.now() - 432000000, // 5 days ago
                topic: 'Best AI tools for student projects?',
                category: 'ai',
                categoryLabel: 'AI in Entrepreneurship',
                message: 'Looking for recommendations on AI tools that are actually useful for building a small project. What have you tried?',
                timestamp: Date.now() - 432000000,
                replies: 12
            },
            {
                id: Date.now() - 604800000, // 1 week ago
                topic: 'Do I need a patent for my app idea?',
                category: 'ip',
                categoryLabel: 'Patents & IP',
                message: 'I\'m building a mobile app and wondering if I should file for a patent. Is it worth it for a student project?',
                timestamp: Date.now() - 604800000,
                replies: 8
            }
        ];
        localStorage.setItem('discussions', JSON.stringify(sampleDiscussions));
    }

    // Load and display discussions
    displayDiscussions();

    // Handle form submission
    discussionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const topic = document.getElementById('topic').value.trim();
        const category = document.getElementById('category').value;
        const message = document.getElementById('message').value.trim();

        if (!topic || !category || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Get category label
        const categoryLabels = {
            'startups': 'Startups 101',
            'ai': 'AI in Entrepreneurship',
            'ip': 'Patents & IP',
            'data': 'Open Data',
            'tools': 'Tools & Resources',
            'general': 'General Discussion'
        };

        // Create new discussion
        const newDiscussion = {
            id: Date.now(),
            topic: topic,
            category: category,
            categoryLabel: categoryLabels[category],
            message: message,
            timestamp: Date.now(),
            replies: 0
        };

        // Save to localStorage
        const discussions = getDiscussions();
        discussions.unshift(newDiscussion); // Add to beginning
        localStorage.setItem('discussions', JSON.stringify(discussions));

        // Clear form
        discussionForm.reset();

        // Refresh display
        displayDiscussions();

        // Show success message
        showMessage('Discussion posted successfully!', 'success');
        
        // Scroll to the new discussion
        setTimeout(() => {
            const firstDiscussion = document.querySelector('.discussion-item');
            if (firstDiscussion) {
                firstDiscussion.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    });
}

function getDiscussions() {
    const stored = localStorage.getItem('discussions');
    return stored ? JSON.parse(stored) : [];
}

function deleteDiscussion(id) {
    const discussions = getDiscussions();
    const filtered = discussions.filter(d => d.id !== id);
    localStorage.setItem('discussions', JSON.stringify(filtered));
    displayDiscussions();
    showMessage('Discussion deleted successfully!', 'success');
}

function displayDiscussions() {
    const discussionList = document.querySelector('.discussion-list');
    if (!discussionList) return;

    const discussions = getDiscussions();
    const discussionItemsContainer = discussionList.querySelector('.discussion-item')?.parentElement || discussionList;

    // Clear existing items (but keep the h2 heading)
    const heading = discussionList.querySelector('h2');
    discussionList.innerHTML = '';
    if (heading) {
        discussionList.appendChild(heading);
    }

    if (discussions.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'discussion-empty';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '3rem 1rem';
        emptyMessage.style.color = 'var(--text-light)';
        emptyMessage.innerHTML = '<p>No discussions yet. Be the first to start one!</p>';
        discussionList.appendChild(emptyMessage);
        return;
    }

    // Create discussion items
    discussions.forEach(discussion => {
        const item = createDiscussionItem(discussion);
        discussionList.appendChild(item);
    });
}

function createDiscussionItem(discussion) {
    const item = document.createElement('div');
    item.className = 'discussion-item';
    item.setAttribute('data-id', discussion.id);
    
    const timeAgo = getTimeAgo(discussion.timestamp);
    
    item.innerHTML = `
        <div class="discussion-header">
            <h3>${escapeHtml(discussion.topic)}</h3>
            <span class="discussion-category">${escapeHtml(discussion.categoryLabel)}</span>
        </div>
        <p class="discussion-preview">${escapeHtml(discussion.message)}</p>
        <div class="discussion-meta">
            <span>Posted ${timeAgo}</span>
            <span>${discussion.replies} ${discussion.replies === 1 ? 'reply' : 'replies'}</span>
            <button class="delete-discussion-btn" data-id="${discussion.id}" aria-label="Delete discussion">🗑️ Delete</button>
        </div>
    `;
    
    // Add delete button event listener
    const deleteBtn = item.querySelector('.delete-discussion-btn');
    deleteBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this discussion?')) {
            deleteDiscussion(discussion.id);
        }
    });
    
    return item;
}

function getTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    if (days > 0) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    if (hours > 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    if (minutes > 0) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    return 'just now';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showMessage(message, type = 'info') {
    // Remove existing message if any
    const existing = document.querySelector('.discussion-message');
    if (existing) existing.remove();

    const messageEl = document.createElement('div');
    messageEl.className = `discussion-message discussion-message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(messageEl);

    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => messageEl.remove(), 300);
    }, 3000);
}


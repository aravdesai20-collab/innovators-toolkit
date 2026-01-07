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

    // Clickable Card Functionality
    initClickableCards();

    // Discussion Board Functionality
    initDiscussionBoard();
});

// Clickable Card Handler
function initClickableCards() {
    const clickableCards = document.querySelectorAll('.clickable-card');
    
    clickableCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't toggle if clicking on a link
            if (e.target.tagName === 'A') return;
            
            const details = this.querySelector('.card-details');
            const isActive = this.classList.contains('active');
            
            // Close all other cards in the same container (optional)
            const parent = this.closest('.ip-grid, .topic-grid, .use-case-grid, .source-grid, .example-grid, .decision-tree, .ethics-list, .myth-list, .tips-grid, .resource-list, .card-grid');
            if (parent && !e.shiftKey) {
                parent.querySelectorAll('.clickable-card.active').forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('active');
                        const otherDetails = otherCard.querySelector('.card-details');
                        if (otherDetails) {
                            otherDetails.style.display = 'none';
                        }
                    }
                });
            }
            
            // Toggle current card
            if (details) {
                if (isActive) {
                    this.classList.remove('active');
                    details.style.display = 'none';
                } else {
                    this.classList.add('active');
                    details.style.display = 'block';
                    // Smooth scroll to card if needed
                    setTimeout(() => {
                        const rect = this.getBoundingClientRect();
                        if (rect.bottom > window.innerHeight || rect.top < 0) {
                            this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    }, 100);
                }
            }
        });
    });
}

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
                replies: 5,
                isSample: true,
                repliesList: [
                    {
                        id: Date.now() - 172800000 + 1000,
                        message: 'Try creating a simple landing page with a signup form. If people sign up, there\'s interest!',
                        timestamp: Date.now() - 172800000 + 1000
                    },
                    {
                        id: Date.now() - 172800000 + 2000,
                        message: 'Talk to potential users directly. Go to places where your target audience hangs out and ask them questions.',
                        timestamp: Date.now() - 172800000 + 2000
                    },
                    {
                        id: Date.now() - 172800000 + 3000,
                        message: 'Use social media polls and surveys. Twitter, Reddit, and Facebook groups are great for this.',
                        timestamp: Date.now() - 172800000 + 3000
                    },
                    {
                        id: Date.now() - 172800000 + 4000,
                        message: 'Build a minimal prototype (MVP) and show it to people. You don\'t need a full app to test the concept.',
                        timestamp: Date.now() - 172800000 + 4000
                    },
                    {
                        id: Date.now() - 172800000 + 5000,
                        message: 'Check if similar products exist and how they\'re doing. If competitors are successful, that\'s actually a good sign!',
                        timestamp: Date.now() - 172800000 + 5000
                    }
                ]
            },
            {
                id: Date.now() - 432000000, // 5 days ago
                topic: 'Best AI tools for student projects?',
                category: 'ai',
                categoryLabel: 'AI in Entrepreneurship',
                message: 'Looking for recommendations on AI tools that are actually useful for building a small project. What have you tried?',
                timestamp: Date.now() - 432000000,
                replies: 12,
                isSample: true,
                repliesList: [
                    {
                        id: Date.now() - 432000000 + 1000,
                        message: 'ChatGPT is great for generating code and debugging. I use it all the time for my projects.',
                        timestamp: Date.now() - 432000000 + 1000
                    },
                    {
                        id: Date.now() - 432000000 + 2000,
                        message: 'Claude (Anthropic) is excellent for longer conversations and analyzing documents.',
                        timestamp: Date.now() - 432000000 + 2000
                    },
                    {
                        id: Date.now() - 432000000 + 3000,
                        message: 'For image generation, try DALL-E or Midjourney. Both have free tiers for students.',
                        timestamp: Date.now() - 432000000 + 3000
                    },
                    {
                        id: Date.now() - 432000000 + 4000,
                        message: 'GitHub Copilot is amazing if you\'re coding. It\'s like having a pair programmer.',
                        timestamp: Date.now() - 432000000 + 4000
                    },
                    {
                        id: Date.now() - 432000000 + 5000,
                        message: 'For data analysis, try Google\'s Bard or Microsoft Copilot. Both integrate well with other tools.',
                        timestamp: Date.now() - 432000000 + 5000
                    },
                    {
                        id: Date.now() - 432000000 + 6000,
                        message: 'Don\'t forget about Hugging Face - it has tons of free AI models you can use.',
                        timestamp: Date.now() - 432000000 + 6000
                    },
                    {
                        id: Date.now() - 432000000 + 7000,
                        message: 'For text-to-speech, ElevenLabs has a great free tier. Perfect for adding voice to projects.',
                        timestamp: Date.now() - 432000000 + 7000
                    },
                    {
                        id: Date.now() - 432000000 + 8000,
                        message: 'If you need AI for video, Runway ML has some cool features. The free tier is limited but useful.',
                        timestamp: Date.now() - 432000000 + 8000
                    },
                    {
                        id: Date.now() - 432000000 + 9000,
                        message: 'For API access, OpenAI and Anthropic both have student-friendly pricing.',
                        timestamp: Date.now() - 432000000 + 9000
                    },
                    {
                        id: Date.now() - 432000000 + 10000,
                        message: 'Check out Replicate - it lets you run AI models without setting up infrastructure.',
                        timestamp: Date.now() - 432000000 + 10000
                    },
                    {
                        id: Date.now() - 432000000 + 11000,
                        message: 'For AI-powered search, Perplexity is great. It cites sources which is helpful for research.',
                        timestamp: Date.now() - 432000000 + 11000
                    },
                    {
                        id: Date.now() - 432000000 + 12000,
                        message: 'Don\'t overlook browser extensions like Monica or AIPRM - they add AI to your workflow.',
                        timestamp: Date.now() - 432000000 + 12000
                    }
                ]
            },
            {
                id: Date.now() - 604800000, // 1 week ago
                topic: 'Do I need a patent for my app idea?',
                category: 'ip',
                categoryLabel: 'Patents & IP',
                message: 'I\'m building a mobile app and wondering if I should file for a patent. Is it worth it for a student project?',
                timestamp: Date.now() - 604800000,
                replies: 8,
                isSample: true,
                repliesList: [
                    {
                        id: Date.now() - 604800000 + 1000,
                        message: 'For most student projects, patents aren\'t necessary. Focus on building and getting users first.',
                        timestamp: Date.now() - 604800000 + 1000
                    },
                    {
                        id: Date.now() - 604800000 + 2000,
                        message: 'Patents are expensive (thousands of dollars) and take years. For a student project, that money is better spent on development.',
                        timestamp: Date.now() - 604800000 + 2000
                    },
                    {
                        id: Date.now() - 604800000 + 3000,
                        message: 'Software patents are also hard to get. Most apps don\'t qualify because they\'re not novel enough.',
                        timestamp: Date.now() - 604800000 + 3000
                    },
                    {
                        id: Date.now() - 604800000 + 4000,
                        message: 'If you\'re really concerned, you can file a provisional patent yourself for much cheaper (~$100-200).',
                        timestamp: Date.now() - 604800000 + 4000
                    },
                    {
                        id: Date.now() - 604800000 + 5000,
                        message: 'Focus on trademarks for your app name instead - that\'s more practical and affordable.',
                        timestamp: Date.now() - 604800000 + 5000
                    },
                    {
                        id: Date.now() - 604800000 + 6000,
                        message: 'Keep good records of your development process. That can help if you ever need to prove you created it first.',
                        timestamp: Date.now() - 604800000 + 6000
                    },
                    {
                        id: Date.now() - 604800000 + 7000,
                        message: 'Most successful startups file patents later, after they have traction and funding. Don\'t worry about it now.',
                        timestamp: Date.now() - 604800000 + 7000
                    },
                    {
                        id: Date.now() - 604800000 + 8000,
                        message: 'If your app becomes successful and you get investors, they\'ll help you with IP strategy. Focus on building first!',
                        timestamp: Date.now() - 604800000 + 8000
                    }
                ]
            }
        ];
        localStorage.setItem('discussions', JSON.stringify(sampleDiscussions));
    } else {
        // Migrate existing discussions to include repliesList if missing
        migrateDiscussions();
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
            replies: 0,
            isSample: false,
            repliesList: []
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

function migrateDiscussions() {
    const discussions = getDiscussions();
    let needsUpdate = false;
    
    discussions.forEach(discussion => {
        if (!discussion.hasOwnProperty('repliesList')) {
            discussion.repliesList = [];
            needsUpdate = true;
        }
        if (!discussion.hasOwnProperty('isSample')) {
            discussion.isSample = false;
            needsUpdate = true;
        }
        // Update reply count from repliesList if it exists
        if (discussion.repliesList && discussion.repliesList.length > 0) {
            discussion.replies = discussion.repliesList.length;
        }
    });
    
    if (needsUpdate) {
        localStorage.setItem('discussions', JSON.stringify(discussions));
    }
}

function deleteDiscussion(id) {
    const discussions = getDiscussions();
    const discussion = discussions.find(d => d.id === id);
    if (discussion && discussion.isSample) {
        showMessage('Cannot delete sample discussions.', 'info');
        return;
    }
    const filtered = discussions.filter(d => d.id !== id);
    localStorage.setItem('discussions', JSON.stringify(filtered));
    displayDiscussions();
    showMessage('Discussion deleted successfully!', 'success');
}

function toggleReplies(discussionId) {
    const repliesContainer = document.getElementById(`replies-${discussionId}`);
    const repliesList = document.getElementById(`replies-list-${discussionId}`);
    
    if (repliesContainer.style.display === 'none') {
        repliesContainer.style.display = 'block';
        loadReplies(discussionId);
    } else {
        repliesContainer.style.display = 'none';
    }
}

function loadReplies(discussionId) {
    const discussions = getDiscussions();
    const discussion = discussions.find(d => d.id === discussionId);
    if (!discussion) return;
    
    const repliesList = document.getElementById(`replies-list-${discussionId}`);
    if (!repliesList) return;
    
    repliesList.innerHTML = '';
    
    if (!discussion.repliesList || discussion.repliesList.length === 0) {
        repliesList.innerHTML = '<p class="no-replies">No replies yet. Be the first to reply!</p>';
        return;
    }
    
    // Sort replies by timestamp (oldest first)
    const sortedReplies = [...discussion.repliesList].sort((a, b) => a.timestamp - b.timestamp);
    
    sortedReplies.forEach(reply => {
        const replyItem = document.createElement('div');
        replyItem.className = 'reply-item';
        const replyTimeAgo = getTimeAgo(reply.timestamp);
        replyItem.innerHTML = `
            <div class="reply-content">${escapeHtml(reply.message)}</div>
            <div class="reply-meta">${replyTimeAgo}</div>
        `;
        repliesList.appendChild(replyItem);
    });
}

function addReply(discussionId, replyText) {
    const discussions = getDiscussions();
    const discussion = discussions.find(d => d.id === discussionId);
    if (!discussion) return;
    
    if (!discussion.repliesList) {
        discussion.repliesList = [];
    }
    
    const newReply = {
        id: Date.now(),
        message: replyText,
        timestamp: Date.now()
    };
    
    discussion.repliesList.push(newReply);
    discussion.replies = discussion.repliesList.length;
    
    localStorage.setItem('discussions', JSON.stringify(discussions));
    
    // Reload replies display
    loadReplies(discussionId);
    
    // Update reply count in meta
    const discussionItem = document.querySelector(`[data-id="${discussionId}"]`);
    if (discussionItem) {
        const repliesSpan = discussionItem.querySelector('.discussion-meta span:nth-child(2)');
        if (repliesSpan) {
            repliesSpan.textContent = `${discussion.replies} ${discussion.replies === 1 ? 'reply' : 'replies'}`;
        }
    }
    
    showMessage('Reply posted successfully!', 'success');
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
    const repliesCount = discussion.repliesList ? discussion.repliesList.length : discussion.replies || 0;
    const isSample = discussion.isSample === true;
    
    // Initialize repliesList if it doesn't exist
    if (!discussion.repliesList) {
        discussion.repliesList = [];
    }
    
    item.innerHTML = `
        <div class="discussion-header">
            <h3>${escapeHtml(discussion.topic)}</h3>
            <span class="discussion-category">${escapeHtml(discussion.categoryLabel)}</span>
        </div>
        <p class="discussion-preview">${escapeHtml(discussion.message)}</p>
        <div class="discussion-meta">
            <span>Posted ${timeAgo}</span>
            <span>${repliesCount} ${repliesCount === 1 ? 'reply' : 'replies'}</span>
            <button class="reply-discussion-btn" data-id="${discussion.id}" type="button">💬 Reply</button>
            ${!isSample ? '<button class="delete-discussion-btn" data-id="' + discussion.id + '" aria-label="Delete discussion" type="button">Delete</button>' : ''}
        </div>
        <div class="discussion-replies-container" id="replies-${discussion.id}" style="display: none;">
            <div class="replies-list" id="replies-list-${discussion.id}"></div>
            <div class="reply-form-container">
                <form class="reply-form" data-discussion-id="${discussion.id}">
                    <textarea class="reply-input" placeholder="Write your reply..." rows="3" required></textarea>
                    <button type="submit" class="submit-reply-btn">Post Reply</button>
                </form>
            </div>
        </div>
    `;
    
    // Add reply button event listener
    const replyBtn = item.querySelector('.reply-discussion-btn');
    replyBtn.addEventListener('click', function() {
        toggleReplies(discussion.id);
    });
    
    // Add delete button event listener (only if not sample)
    if (!isSample) {
        const deleteBtn = item.querySelector('.delete-discussion-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this discussion?')) {
                    deleteDiscussion(discussion.id);
                }
            });
        }
    }
    
    // Add reply form submission
    const replyForm = item.querySelector('.reply-form');
    replyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const replyInput = this.querySelector('.reply-input');
        const replyText = replyInput.value.trim();
        if (replyText) {
            addReply(discussion.id, replyText);
            replyInput.value = '';
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


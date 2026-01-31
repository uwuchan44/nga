// script.js - Complete System with Modal Replacement

// DOM Elements
const currentTimeElement = document.getElementById('currentTime');
const userIPElement = document.getElementById('userIP');
const profileCards = document.querySelectorAll('.profile-card');
const profileDetail = document.getElementById('profileDetail');
const detailContent = document.getElementById('detailContent');
const profileAudio = document.getElementById('profileAudio');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const currentTrack = document.getElementById('currentTrack');
const offerPortal = document.getElementById('offerPortal');
const successPortal = document.getElementById('successPortal');
const offerForm = document.getElementById('offerForm');
const offerAmount = document.getElementById('offerAmount');
const currentOffer = document.getElementById('currentOffer');
const submittedAmount = document.getElementById('submittedAmount');
const submittedContact = document.getElementById('submittedContact');
const referenceId = document.getElementById('referenceId');

// Modal System
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.innerHTML = `
    <div class="modal-container">
        <div class="modal-header">
            <h3><i class="fas fa-info-circle"></i> Information</h3>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <div class="modal-content" id="modalContent"></div>
            <div class="modal-actions">
                <button class="modal-btn primary" id="modalOk">OK</button>
            </div>
        </div>
    </div>
`;

// Append modal to body
document.body.appendChild(modalOverlay);
const modalContent = document.getElementById('modalContent');
const modalClose = modalOverlay.querySelector('.modal-close');
const modalOk = document.getElementById('modalOk');

// Profile Data - KORRIGIERTE WERTE (in Euro, nicht in Coins)
const profiles = {
    tokisu: {
        name: "TOKISU",
        title: "Forgive, because no one walks without mistakes.",
        age: 15,
        bio: "Keep your success private even from your inner circle until it is permanent.",
        wallets: {
            // EURO values, not coin amounts!
            bitcoin: 0, // €0 in Bitcoin
            ethereum: 8432,  // €8,432 in Ethereum
            solana: 0,      // €0 in Solana
            xrp: 135        // €135 in XRP
        },
        programming: "Specialized in low-level programming, reverse engineering, and secure system design. Proficient in C++, Python, and Assembly for security applications and performance-critical systems.",
        skills: [
            { icon: "fa-code", name: "Advanced Programming", action: "showProgramming" },
            { icon: "fa-bitcoin", name: "Cryptocurrency", action: "showWallets" },
            { icon: "fa-shield-alt", name: "Network Security" },
            { icon: "fa-database", name: "Data Analysis", action: "showDeadeye" },
            { icon: "fa-network-wired", name: "System Architecture" },
            { icon: "fa-globe", name: "Domain Portfolio" }
        ],
        domain: {
            name: "MOSSA•D.COM",
            price: "€500,000",
            note: "Minimum Offer"
        },
        audio: "sound/tokisu.mp3",
        image: "img/tokisu_bild.jpg"
    },
    neon: {
        name: "NEON",
        title: "Intern circle",
        age: 16,
        bio: "Money can open doors, but influence keeps them open.",
        skills: [
            { icon: "fa-chart-line", name: "Market Analysis" },
            { icon: "fa-coins", name: "Meme Coin Strategy" },
            { icon: "fa-project-diagram", name: "Community Building" },
            { icon: "fa-bullhorn", name: "Social Media Growth" },
            { icon: "fa-users", name: "Influencer Networks" },
            { icon: "fa-bolt", name: "Trend Spotting" }
        ],
        audio: "sound/neon.mp3",
        image: "img/neon_bild.jpg"
    }
};

// Current active profile
let activeProfile = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log(' Network initialized');
    console.log(' Crypto values loaded');
    
    updateTime();
    setInterval(updateTime, 1000);
    
    getIP();
    
    // Initialize profile cards
    initProfileCards();
    
    // Initialize volume control
    initVolumeControl();
    
    // Initialize offer form
    initOfferForm();
    
    // Initialize modal system
    initModalSystem();
});

// Modal System Functions
function initModalSystem() {
    // Close modal on X click
    modalClose.addEventListener('click', closeModal);
    
    // Close modal on OK click
    modalOk.addEventListener('click', closeModal);
    
    // Close modal on outside click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

// Show modal (replaces alert())
function showModal(title, message) {
    const modalHeader = modalOverlay.querySelector('h3');
    modalHeader.innerHTML = `<i class="fas fa-info-circle"></i> ${title}`;
    modalContent.textContent = message;
    modalOverlay.classList.add('active');
}

// Close modal
function closeModal() {
    modalOverlay.classList.remove('active');
}

// Profile Cards Flip
function initProfileCards() {
    profileCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Ignore clicks on interactive elements
            if (e.target.closest('.contact-icon') || 
                e.target.closest('.inquiry-btn') || 
                e.target.closest('.read-more-btn') || 
                e.target.closest('a')) {
                return;
            }
            
            this.classList.toggle('flipped');
        });
    });
}

// Open Profile Detail
function openProfileDetail(profileName) {
    activeProfile = profileName;
    const profile = profiles[profileName];
    
    // Create detail content
    detailContent.innerHTML = createProfileDetailHTML(profile);
    
    // Start audio
    playProfileAudio(profile.audio, profile.name);
    
    // Show detail view
    profileDetail.classList.add('active');
    
    // Scroll to top
    profileDetail.scrollTop = 0;
    
    console.log('📱 Opening profile:', profileName);
}

// Create Profile Detail HTML
function createProfileDetailHTML(profile) {
    return `
        <div class="profile-detail-card">
            <div class="profile-header-detail">
                <div class="profile-img-large" style="background-image: url('${profile.image}')"></div>
                <div class="profile-info-large">
                    <h2>${profile.name}</h2>
                    <p class="title">${profile.title}</p>
                    <div class="status">
                        <div class="status-dot active"></div>
                        <span class="status-text">Online</span>
                    </div>
                </div>
            </div>

            <div class="bio-section">
                <h3><i class="fas fa-user"></i> Profile</h3>
                <p class="bio-text">${profile.bio}</p>
                
                <div class="bio-stats">
                    <div class="stat-item">
                        <div class="stat-label">Age</div>
                        <div class="stat-value">${profile.age}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Status</div>
                        <div class="stat-value">Active</div>
                    </div>
                </div>
            </div>

            ${profile.wallets ? `
            <div class="wallet-section">
                <h3><i class="fas fa-wallet"></i> Digital Assets (EUR Value)</h3>
                <div class="wallet-balances">
                    <div class="wallet-item">
                        <div class="wallet-coin">Bitcoin</div>
                        <div class="wallet-amount">€${profile.wallets.bitcoin.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                        <div class="wallet-value">${(profile.wallets.bitcoin / 45287.34).toLocaleString('en-US', {minimumFractionDigits: 4})} BTC</div>
                    </div>
                    <div class="wallet-item">
                        <div class="wallet-coin">Ethereum</div>
                        <div class="wallet-amount">€${profile.wallets.ethereum.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                        <div class="wallet-value">${(profile.wallets.ethereum / 3245.67).toLocaleString('en-US', {minimumFractionDigits: 4})} ETH</div>
                    </div>
                    <div class="wallet-item">
                        <div class="wallet-coin">Solana</div>
                        <div class="wallet-amount">€${profile.wallets.solana.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                        <div class="wallet-value">0 SOL</div>
                    </div>
                    <div class="wallet-item">
                        <div class="wallet-coin">XRP</div>
                        <div class="wallet-amount">€${profile.wallets.xrp.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                        <div class="wallet-value">${(profile.wallets.xrp / 0.52).toLocaleString('en-US', {minimumFractionDigits: 2})} XRP</div>
                    </div>
                </div>
            </div>
            ` : ''}

            ${profile.programming ? `
            <div class="programming-section">
                <h3><i class="fas fa-laptop-code"></i> Technical Expertise</h3>
                <p class="programming-text">${profile.programming}</p>
            </div>
            ` : ''}

            <div class="skills-section">
                <h3><i class="fas fa-star"></i> Core Competencies</h3>
                <div class="skills-grid">
                    ${profile.skills.map(skill => `
                        <div class="skill-item" ${skill.action ? `onclick="${skill.action}('${profile.name.toLowerCase()}')"` : ''}>
                            <i class="fas ${skill.icon}"></i>
                            <span>${skill.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            ${profile.name === 'TOKISU' ? `
            <div class="deadeye-section">
                <p><i class="fas fa-link"></i> <a href="https://deadeye.cc" target="_blank">Administrator of deadeye.cc</a></p>
            </div>
            ` : ''}
        </div>
    `;
}

// Skill Actions (now using modal, not alert)
function showWallets(profileName) {
    const profile = profiles[profileName];
    if (profile && profile.wallets) {
        const message = ` ${profile.name}'s Digital Assets:\n\n` +
              `Bitcoin: €${profile.wallets.bitcoin.toLocaleString('en-US', {minimumFractionDigits: 2})}\n` +
              `Ethereum: €${profile.wallets.ethereum.toLocaleString('en-US', {minimumFractionDigits: 2})}\n` +
              `Solana: €${profile.wallets.solana.toLocaleString('en-US', {minimumFractionDigits: 2})}\n` +
              `XRP: €${profile.wallets.xrp.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
        
        showModal(`${profile.name}'s Assets`, message);
    }
}

function showProgramming(profileName) {
    const profile = profiles[profileName];
    if (profile && profile.programming) {
        showModal(`${profile.name}'s Expertise`, profile.programming);
    }
}

function showDeadeye(profileName) {
    window.open('https://deadeye.cc', '_blank');
}

// Close Profile Detail
function closeProfileDetail() {
    profileDetail.classList.remove('active');
    stopProfileAudio();
    console.log('📱 Closing profile detail');
}

// Audio Functions
function playProfileAudio(audioFile, profileName) {
    if (profileAudio) {
        profileAudio.src = audioFile;
        profileAudio.volume = volumeSlider.value / 100;
        
        profileAudio.play().then(() => {
            currentTrack.textContent = `${profileName}'s theme`;
            console.log('🎵 Playing audio:', audioFile);
        }).catch(error => {
            console.log('Audio play failed:', error);
            currentTrack.textContent = 'Audio unavailable';
        });
    }
}

function stopProfileAudio() {
    if (profileAudio) {
        profileAudio.pause();
        profileAudio.currentTime = 0;
        currentTrack.textContent = 'No audio playing';
    }
}

// Volume Control
function initVolumeControl() {
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            const volume = this.value / 100;
            
            if (profileAudio) {
                profileAudio.volume = volume;
            }
            
            // Update icon
            if (volume === 0) {
                volumeIcon.classList.remove('fa-volume-down', 'fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
            } else if (volume < 0.5) {
                volumeIcon.classList.remove('fa-volume-mute', 'fa-volume-up');
                volumeIcon.classList.add('fa-volume-down');
            } else {
                volumeIcon.classList.remove('fa-volume-mute', 'fa-volume-down');
                volumeIcon.classList.add('fa-volume-up');
            }
        });
    }
}

// Offer Portal Functions
function openOfferPortal() {
    offerPortal.classList.add('active');
    if (offerAmount) offerAmount.focus();
    console.log(' Opening offer portal');
}

function closeOfferPortal() {
    offerPortal.classList.remove('active');
    if (offerForm) offerForm.reset();
    if (currentOffer) currentOffer.textContent = '€0';
}

// Initialize Offer Form
function initOfferForm() {
    if (offerAmount) {
        offerAmount.addEventListener('input', function() {
            const value = parseInt(this.value) || 0;
            if (currentOffer) currentOffer.textContent = `€${value.toLocaleString('en-US')}`;
            
            // Validate minimum amount
            if (value < 500000) {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '#333';
            }
        });
        
        // Set minimum value
        offerAmount.min = 500000;
        offerAmount.placeholder = '500000';
    }
    
    if (offerForm) {
        offerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const contactMethod = document.getElementById('contactMethod').value;
            const username = document.getElementById('username').value;
            const amount = parseInt(document.getElementById('offerAmount').value);
            const message = document.getElementById('message').value;
            
            // Validate minimum amount
            if (amount < 500000) {
                showModal('Invalid Offer', 'Minimum offer is €500,000');
                return;
            }
            
            // Validate contact info
            if (!username.startsWith('@')) {
                showModal('Invalid Username', 'Please enter a valid username starting with @');
                return;
            }
            
            // Generate reference ID
            const reference = 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            
            // Update success portal
            if (submittedAmount) submittedAmount.textContent = `€${amount.toLocaleString('en-US')}`;
            if (submittedContact) submittedContact.textContent = username;
            if (referenceId) referenceId.textContent = reference;
            
            // Show success portal
            offerPortal.classList.remove('active');
            if (successPortal) successPortal.classList.add('active');
            
            // Log submission
            console.log('📨 Offer submitted:');
            console.log('   Amount: €' + amount.toLocaleString('en-US'));
            console.log('   Contact: ' + username);
            console.log('   Method: ' + contactMethod);
            console.log('   Reference: ' + reference);
            
            // Simulate server submission
            simulateServerSubmission(amount, username, reference);
        });
    }
}

// Simulate server submission
function simulateServerSubmission(amount, username, reference) {
    setTimeout(() => {
        console.log('✅ Offer stored in database:', reference);
        console.log('⏰ Notification scheduled for review');
    }, 1000);
}

// Close Success Portal
function closeSuccessPortal() {
    if (successPortal) successPortal.classList.remove('active');
    if (offerForm) offerForm.reset();
    if (currentOffer) currentOffer.textContent = '€0';
}

// Event Listeners for interactive elements
document.addEventListener('click', function(e) {
    // Contact buttons
    if (e.target.closest('.contact-icon') || e.target.closest('.contact-btn')) {
        e.preventDefault();
        const button = e.target.closest('a');
        if (!button) return;
        
        const url = button.href;
        
        // Animation
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
        
        // Open in new tab
        setTimeout(() => {
            window.open(url, '_blank', 'noopener,noreferrer');
        }, 300);
    }
    
    // Close modals when clicking outside
    if (e.target === offerPortal) {
        closeOfferPortal();
    }
    if (e.target === successPortal) {
        closeSuccessPortal();
    }
    if (e.target === profileDetail) {
        closeProfileDetail();
    }
});

// ESC key closes modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (offerPortal && offerPortal.classList.contains('active')) {
            closeOfferPortal();
        }
        if (successPortal && successPortal.classList.contains('active')) {
            closeSuccessPortal();
        }
        if (profileDetail && profileDetail.classList.contains('active')) {
            closeProfileDetail();
        }
        if (modalOverlay.classList.contains('active')) {
            closeModal();
        }
    }
});

// Current Time
function updateTime() {
    const now = new Date();
    const timeString = now.toUTCString().split(' ')[4];
    if (currentTimeElement) {
        currentTimeElement.textContent = timeString + ' UTC';
    }
}

// Get IP Address
async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        if (userIPElement) {
            userIPElement.textContent = data.ip;
        }
    } catch (error) {
        if (userIPElement) {
            userIPElement.textContent = '127.0.0.1';
        }
    }
}

// Console Helper Commands
document.addEventListener('keydown', function(e) {
    // Ctrl + B for Bitcoin info
    if (e.ctrlKey && e.key === 'b') {
        console.log('=== WALLET VALUES (EUR) ===');
        console.log('Tokisu Bitcoin: €' + profiles.tokisu.wallets.bitcoin.toLocaleString('en-US', {minimumFractionDigits: 2}));
        console.log('Tokisu Ethereum: €' + profiles.tokisu.wallets.ethereum.toLocaleString('en-US', {minimumFractionDigits: 2}));
        console.log('Tokisu XRP: €' + profiles.tokisu.wallets.xrp.toLocaleString('en-US', {minimumFractionDigits: 2}));
        console.log('=======================');
    }
    
    // Ctrl + D for Domain info
    if (e.ctrlKey && e.key === 'd') {
        console.log('=== DOMAIN INFORMATION ===');
        console.log('Name: MOSSA•D.COM');
        console.log('Asking Price: €500,000');
        console.log('Minimum Offer: €500,000');
        console.log('Contact: @tokisu583');
        console.log('=======================');
    }
});
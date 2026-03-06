// Load projects from config file
async function loadProjects() {
    try {
        const response = await fetch('projects.json?t=' + Date.now());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Update profile info
        if (data.profile) {
            document.querySelector('.hero-title').textContent = data.profile.name;
            document.querySelector('.hero-description').textContent = data.profile.title;
            document.querySelector('.profile-image').src = data.profile.image;
            document.querySelector('.profile-image').alt = data.profile.name;
            
            // Update social links
            const socialContainer = document.querySelector('.social-links');
            socialContainer.innerHTML = '';
            data.profile.socials.forEach((social, index) => {
                const link = document.createElement('a');
                link.href = social.url;
                link.className = 'social-link';
                if (social.url !== '#') link.target = '_blank';
                
                const logoClass = index === 0 ? 'social-logo discord-logo-large' : 'social-logo';
                link.innerHTML = `
                    <img src="${social.icon}" alt="${social.label}" class="${logoClass}">
                    <span>${social.label}</span>
                `;
                socialContainer.appendChild(link);
            });
        }
        
        // Update about section
        if (data.about) {
            document.querySelector('.about-text').textContent = data.about;
        }
        
        // Render projects (use sample projects if none exist)
        if (!data.projects || !Array.isArray(data.projects) || data.projects.length === 0) {
            renderProjects(getSampleProjects());
        } else {
            renderProjects(data.projects);
        }
        
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to sample projects so UI still shows cards
        renderProjects(getSampleProjects());
    }
}

function renderProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
    // Attach modal handlers after rendering images
    initImageModal();
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    // Ensure image paths point to the images/ folder when filenames are provided
    function normalizeImageSrc(src) {
        if (!src) return src;
        const s = src.trim();
        // If it's already a URL, data URI, or contains a path segment, leave it
        if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:') || s.startsWith('/') || s.includes('/')) {
            return s;
        }
        return `Images/${s}`;
    }
    
    let mediaContent = '';
    if (project.videoUrl) {
        const videoSrc = project.videoUrl.startsWith('Images/') || project.videoUrl.startsWith('http') ? project.videoUrl : `Images/${project.videoUrl}`;
        mediaContent = `<video controls><source src="${videoSrc}" type="video/mp4"></video>`;
    } else if (project.videoPlaceholder) {
        mediaContent = `<div data-placeholder="${project.videoPlaceholder}"></div>`;
    } else {
        mediaContent = `<div data-placeholder="Mp4 Video"></div>`;
    }
    
    let imagesContent = '';
    const imgs = project.images || [];
    if (imgs.length > 0) {
        const maxVisible = 4;
        let items = '';
        for (let i = 0; i < Math.min(imgs.length, maxVisible); i++) {
            const src = imgs[i];
            const normalized = normalizeImageSrc(src);
            // If this is the last visible slot and there are more images, add overlay
            if (i === maxVisible - 1 && imgs.length > maxVisible) {
                const remaining = imgs.length - maxVisible;
                items += `\n                    <div class="image-placeholder">\n                        <img src="${normalized}" alt="Project image">\n                        <div class="image-overlay"><span class="overlay-text">+${remaining}</span></div>\n                    </div>`;
            } else {
                items += `\n                    <div class="image-placeholder">\n                        <img src="${normalized}" alt="Project image">\n                    </div>`;
            }
        }

        imagesContent = `\n            <div class="image-grid">\n                ${items}\n            </div>\n        `;
    } else {
        imagesContent = `
            <div class="image-grid">
                <div class="image-placeholder">IMG</div>
                <div class="image-placeholder">IMG</div>
                <div class="image-placeholder">IMG</div>
                <div class="image-placeholder">IMG</div>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${project.title}</h3>
            <span class="project-date">${project.date}</span>
        </div>
        ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
        <div class="project-content">
            <div class="project-media ${!project.videoUrl ? 'empty' : ''}">
                ${mediaContent}
            </div>
            <div class="project-images">
                <h3>Media</h3>
                <p>Documentation<br>Images</p>
                ${imagesContent}
            </div>
        </div>
    `;
    
    return card;
}

function getSampleProjects() {
    return [
        {
            title: 'Project One',
            description: 'Add your project description here.',
            date: '2024',
            videoUrl: 'Idkman.mp4',
            videoPlaceholder: 'Mp4 Video',
            images: ['Robloxlogo.png', 'Discordlogo.png', 'Robloxlogo.png', 'Discordlogo.png','Robloxlogo.png', 'Discordlogo.png', 'Robloxlogo.png']
        },
        {
            title: 'Project Two',
            description: 'Add your project description here.',
            date: '2024',
            videoUrl: 'Idkman.mp4',
            videoPlaceholder: 'Mp4 Video',
            images: []
        },
        
    ];
}

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Load projects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}

// -------------------- Image modal logic --------------------
function initImageModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    const modalImg = modal.querySelector('.modal-image');
    const btnClose = modal.querySelector('.modal-close');
    const btnNext = modal.querySelector('.modal-next');
    const btnPrev = modal.querySelector('.modal-prev');

    // Gather all documentation images on the page
    const imageNodes = Array.from(document.querySelectorAll('.project-images .image-grid img'));
    const srcs = imageNodes.map(img => img.src);
    let currentIndex = -1;

    function openAt(index) {
        if (index < 0 || index >= srcs.length) return;
        currentIndex = index;
        modalImg.src = srcs[currentIndex];
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    }

    function close() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = '';
        currentIndex = -1;
    }

    function showNext() {
        if (srcs.length === 0) return;
        openAt((currentIndex + 1) % srcs.length);
    }

    function showPrev() {
        if (srcs.length === 0) return;
        openAt((currentIndex - 1 + srcs.length) % srcs.length);
    }

    // Attach click handlers to thumbnails
    imageNodes.forEach((img, idx) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            // recalc src list in case content changed
            const all = Array.from(document.querySelectorAll('.project-images .image-grid img'));
            const allSrcs = all.map(i => i.src);
            // update arrays
            // find index of clicked image in the global list
            const clickedIndex = all.findIndex(i => i === img);
            if (clickedIndex >= 0) {
                // replace srcs with fresh list
                // (keeps ordering consistent across cards)
                srcs.length = 0; allSrcs.forEach(s => srcs.push(s));
                openAt(clickedIndex);
            }
        });
    });

    // Controls
    btnClose.addEventListener('click', close);
    btnNext.addEventListener('click', showNext);
    btnPrev.addEventListener('click', showPrev);

    // Close when clicking backdrop (but not when clicking the image)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}

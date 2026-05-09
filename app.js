const navArea = document.getElementById('nav-content');
const renderArea = document.getElementById('render-area');
const contentArea = document.getElementById('content');
const progressBar = document.getElementById('progress-bar');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const themeInput = document.getElementById('theme-toggle-input');
const themeInputMobile = document.getElementById('theme-toggle-mobile-input');

let searchIndex = [];
let currentManifest = null;
let lastActiveTopicId = null;

// Initialize App
async function init() {
    try {
        const res = await fetch('manifest.json');
        currentManifest = await res.json();
        renderSidebar(currentManifest);
        handleRoute();
        setupEventListeners();
        buildIndex(currentManifest);
    } catch (err) {
        console.error('Failed to initialize app:', err);
    }
}

function setupEventListeners() {
    window.addEventListener('hashchange', () => {
        handleRoute();
        closeSidebar();
    });

    menuToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', closeSidebar);

    const toggleTheme = (e) => {
        const isLight = e.target.checked;
        document.documentElement.classList.toggle('light-mode', isLight);
        document.documentElement.classList.toggle('dark-mode', !isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Sync both inputs
        themeInput.checked = isLight;
        themeInputMobile.checked = isLight;
    };

    themeInput.addEventListener('change', toggleTheme);
    themeInputMobile.addEventListener('change', toggleTheme);

    contentArea.addEventListener('scroll', updateProgress);

    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        themeInput.checked = true;
        themeInputMobile.checked = true;
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
    }
}

function toggleSidebar() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
}

function renderSidebar(manifest) {
    navArea.innerHTML = manifest.subjects.map(sub => `
        <details open>
            <summary>${sub.label}</summary>
            <ul>
                ${sub.modules.map(mod => `
                    <li id="mod-${sub.id}-${mod.id}">
                        <a href="#${sub.id}/${mod.id}" data-path="${mod.path}">${mod.title}</a>
                        <div class="topic-list" id="topics-${sub.id}-${mod.id}"></div>
                    </li>
                `).join('')}
            </ul>
        </details>
    `).join('');
}

async function handleRoute() {
    const hash = window.location.hash.slice(1);
    if (!hash) {
        renderArea.innerHTML = '<h1 style="font-family: var(--font-heading)">Welcome</h1><p>Select a module from the sidebar to begin your revision.</p>';
        progressBar.style.width = '0%';
        return;
    }
    
    // RESET STATE: Clear tracking so new module highlights apply immediately
    lastActiveTopicId = null;
    contentArea.scrollTop = 0;
    progressBar.style.width = '0%';

    const [subject, module] = hash.split('/');
    const path = `notes/${subject}/${module}.md`;
    
    // Update active module state in sidebar
    document.querySelectorAll('#nav-content a').forEach(a => {
        const isActive = a.getAttribute('href') === `#${hash}`;
        a.classList.toggle('active', isActive);
        if (isActive) {
            a.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // Clear all existing topic lists
    document.querySelectorAll('.topic-list').forEach(tl => tl.innerHTML = '');

    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error('Note not found');
        let text = await res.text();
        
        // Strip frontmatter
        text = text.replace(/^---[\s\S]*?---\n/, '');

        // Stage 1: Badges
        text = text.replace(/\[SURE SHOT\]/g, '<span class="badge badge-sure">★ SURE SHOT</span>');
        text = text.replace(/\[HIGH YIELD\]/g, '<span class="badge badge-yield">↑ HIGH YIELD</span>');
        text = text.replace(/\[REPEATED PYQ: (\d{4},? ?)+\]/g, (match) => {
            return `<span class="badge badge-pyq">↻ PYQ: ${match.match(/(\d{4})/g).join(', ')}</span>`;
        });
        
        // Stage 2: Marked
        const html = marked.parse(text);
        renderArea.innerHTML = html;
        
        // Stage 3: Post-processing
        wrapSections();
        wrapAnalogies();
        renderGraphs();

        // Stage 4: Math
        renderMathInElement(renderArea, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ],
            throwOnError: false
        });

        // Stage 5: Master Topic Extraction (Filtered for numbered topics only)
        const topics = Array.from(renderArea.querySelectorAll('h2'))
            .filter(h => /^\d+\./.test(h.innerText.trim()))
            .map((h, i) => {
                h.id = `master-topic-${i}`;
                return { id: h.id, text: h.innerText };
            });

        const activeTopicList = document.getElementById(`topics-${subject}-${module}`);
        if (activeTopicList) {
            activeTopicList.innerHTML = topics.map(t => `
                <span class="topic-item" data-id="${t.id}" onclick="document.getElementById('${t.id}').scrollIntoView({behavior: 'smooth'})">${t.text}</span>
            `).join('');
        }
        
        // Final sync after rendering
        setTimeout(() => {
            updateProgress();
            renderArea.classList.remove('fade-in');
            void renderArea.offsetWidth;
            renderArea.classList.add('fade-in');
        }, 100);

    } catch (err) {
        renderArea.innerHTML = `<h1 style="color: var(--accent-red)">Error</h1><p>${err.message}</p>`;
    }
}

function updateProgress() {
    if (!contentArea || !renderArea) return;
    
    const scroll = contentArea.scrollTop;
    const height = contentArea.scrollHeight - contentArea.clientHeight;
    
    // Update Progress Bar
    if (height > 0) {
        const progress = (scroll / height) * 100;
        progressBar.style.width = `${progress}%`;
    } else {
        progressBar.style.width = '0%';
    }

    // MASTER ZONE DETECTION: Find the active topic
    const masterHeadings = Array.from(renderArea.querySelectorAll('h2'))
        .filter(h => h.id && h.id.startsWith('master-topic-'));
    
    if (masterHeadings.length === 0) return;

    let activeTopicId = null;
    const threshold = 140; // Detection sweet-spot

    // Find the last heading that has entered the top portion of the screen
    for (let i = 0; i < masterHeadings.length; i++) {
        const rect = masterHeadings[i].getBoundingClientRect();
        if (rect.top <= threshold) {
            activeTopicId = masterHeadings[i].id;
        } else {
            break;
        }
    }

    // Default to first if none reached threshold yet
    if (!activeTopicId) activeTopicId = masterHeadings[0].id;

    // Only update UI if the active topic has actually changed
    if (activeTopicId && activeTopicId !== lastActiveTopicId) {
        lastActiveTopicId = activeTopicId;
        
        document.querySelectorAll('.topic-item').forEach(item => {
            const isMatched = item.getAttribute('data-id') === activeTopicId;
            const wasActive = item.classList.contains('active');
            item.classList.toggle('active', isMatched);
            
            if (isMatched && !wasActive) {
                // Ensure sidebar scrolls to keep the highlight visible
                const sidebarNav = document.getElementById('nav-content');
                const itemRect = item.getBoundingClientRect();
                const navRect = sidebarNav.getBoundingClientRect();
                
                if (itemRect.top < navRect.top || itemRect.bottom > navRect.bottom) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }
}

function wrapSections() {
    const headings = renderArea.querySelectorAll('h2, h3');
    headings.forEach(h => {
        const text = h.innerText.toLowerCase();
        let type = '';
        let icon = '';
        let label = '';

        if (text.includes('what is this')) { type = 'amber'; icon = '💡'; label = 'What is this?'; }
        else if (text.includes('theory')) { type = 'blue'; icon = '📖'; label = 'Theory'; }
        else if (text.includes('example')) { type = 'green'; icon = '∑'; label = 'Worked Examples'; }
        else if (text.includes('exam')) { type = 'purple'; icon = '✍'; label = 'Exam Tips'; }
        else if (text.includes('recall') || text.includes('test')) { type = 'red'; icon = '⚡'; label = 'Rapid Recall'; }

        if (type) {
            const card = document.createElement('section');
            card.className = `section-card section-${type}`;
            card.innerHTML = `<div class="section-header">${icon} ${label}</div>`;
            
            h.parentNode.insertBefore(card, h);
            let next = h;
            while (next && (next === h || (next.tagName !== 'H2' && next.tagName !== 'H3'))) {
                let current = next;
                next = next.nextElementSibling;
                card.appendChild(current);
            }
        }
    });
}

function wrapAnalogies() {
    const blockquotes = renderArea.querySelectorAll('blockquote');
    blockquotes.forEach(bq => {
        if (bq.innerText.includes('Analogy:')) {
            bq.className = 'analogy-block';
            bq.innerHTML = bq.innerHTML.replace('<strong>Analogy:</strong>', '');
        }
    });
}

function renderGraphs() {
    const codeBlocks = renderArea.querySelectorAll('pre code.language-text');
    codeBlocks.forEach(block => {
        const content = block.textContent;
        if (content.includes('^') && content.includes('|')) {
            const archetype = detectArchetype(content);
            if (archetype) {
                const svg = generateSVG(archetype);
                block.parentElement.replaceWith(svg);
            }
        }
    });
}

function detectArchetype(text) {
    const lower = text.toLowerCase();
    if (lower.includes('kink')) return 'kinked-demand';
    if (lower.includes('market') && lower.includes('firm')) return 'perfect-competition';
    if (lower.includes('mc') && lower.includes('ar')) return 'monopoly';
    if (lower.includes('s') && lower.includes('d')) return 'supply-demand';
    return null;
}

function generateSVG(type) {
    const container = document.createElement('figure');
    container.className = 'graph-container';
    const colors = {
        axis: 'var(--text-muted)',
        grid: 'var(--border)',
        demand: 'var(--accent-red)',
        supply: 'var(--accent-blue)',
        mc: 'var(--accent-green)',
        ac: 'var(--accent-amber)',
        mr: 'var(--accent-purple)',
        text: 'var(--text-secondary)',
        bg: 'var(--bg-elevated)'
    };

    let svgContent = '';
    let caption = '';

    const axisBase = `<path d="M40,20 L40,120 L180,120" fill="none" stroke="${colors.axis}" stroke-width="1.5" stroke-linecap="square"/>
                      <text x="185" y="125" font-family="var(--font-mono)" font-size="10" fill="${colors.text}">Q</text>
                      <text x="25" y="25" font-family="var(--font-mono)" font-size="10" fill="${colors.text}">P</text>`;

    if (type === 'supply-demand') {
        svgContent = `${axisBase}<path d="M50,110 L170,30" stroke="${colors.supply}" stroke-width="2" fill="none"/><path d="M50,30 L170,110" stroke="${colors.demand}" stroke-width="2" fill="none"/><circle cx="110" cy="70" r="3" fill="${colors.text}"/><path d="M40,70 L110,70 L110,120" stroke="${colors.axis}" stroke-width="1" stroke-dasharray="4" fill="none"/>`;
        caption = 'Market Equilibrium: Supply and Demand';
    } else if (type === 'monopoly') {
        svgContent = `${axisBase}<path d="M50,30 L170,100" stroke="${colors.demand}" stroke-width="2" fill="none"/><path d="M50,30 L110,120" stroke="${colors.mr}" stroke-width="2" fill="none"/><path d="M50,100 Q110,20 170,100" stroke="${colors.ac}" stroke-width="2" fill="none"/><path d="M40,110 Q110,110 170,20" stroke="${colors.mc}" stroke-width="2" fill="none"/>`;
        caption = 'Monopoly: Equilibrium (MC, AC, MR, AR)';
    } else if (type === 'perfect-competition') {
        svgContent = `<g transform="translate(0,0) scale(0.9)"><path d="M30,20 L30,120 L100,120" fill="none" stroke="${colors.axis}" stroke-width="1.5"/><path d="M40,40 L90,110" stroke="${colors.supply}" stroke-width="1.5" fill="none"/><path d="M40,110 L90,40" stroke="${colors.demand}" stroke-width="1.5" fill="none"/></g><g transform="translate(100,0) scale(0.9)"><path d="M30,20 L30,120 L100,120" fill="none" stroke="${colors.axis}" stroke-width="1.5"/><path d="M30,75 L100,75" stroke="${colors.demand}" stroke-width="2" fill="none"/><path d="M40,100 Q65,40 95,100" stroke="${colors.ac}" stroke-width="1.5" fill="none"/><path d="M30,110 Q65,110 95,30" stroke="${colors.mc}" stroke-width="1.5" fill="none"/></g>`;
        caption = 'Perfect Competition: Market vs Firm';
    } else if (type === 'kinked-demand') {
        svgContent = `${axisBase}<path d="M50,40 L110,70" stroke="${colors.demand}" stroke-width="2.5" fill="none"/><path d="M110,70 L160,120" stroke="${colors.demand}" stroke-width="2.5" fill="none"/><circle cx="110" cy="70" r="3" fill="var(--accent-red)"/><path d="M40,70 L110,70 L110,120" stroke="${colors.axis}" stroke-width="1" stroke-dasharray="4" fill="none"/>`;
        caption = 'Oligopoly: Kinked Demand Curve';
    }

    container.innerHTML = `<div style="background: ${colors.bg}; padding: 20px; border: 1px solid var(--border); margin: 2rem 0;"><svg viewBox="0 0 200 150" style="width: 100%; height: auto; display: block; overflow: visible;">${svgContent}</svg></div><figcaption style="text-align: center; font-family: var(--font-body); font-style: italic; font-size: 0.85rem; color: var(--text-secondary); margin-top: -1.5rem; margin-bottom: 2rem;"><span style="color: var(--accent-amber); font-weight: bold; font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; margin-right: 0.5rem;">[Figure]</span> ${caption}</figcaption>`;
    return container;
}

const searchInput = document.getElementById('search');
async function buildIndex(manifest) {
    for (const sub of manifest.subjects) {
        for (const mod of sub.modules) {
            try {
                const res = await fetch(mod.path);
                const text = await res.text();
                searchIndex.push({ ...mod, subjectLabel: sub.label, subjectId: sub.id, content: text.toLowerCase().replace(/^---[\s\S]*?---\n/, '') });
            } catch (e) {}
        }
    }
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    if (!term) { renderSidebar(currentManifest); return; }
    const results = searchIndex.filter(m => m.content.includes(term) || m.title.toLowerCase().includes(term));
    if (results.length > 0) {
        navArea.innerHTML = `<div style="padding: 0 1.5rem; font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Search Results</div>` + results.map(mod => `<li><a href="#${mod.subjectId}/${mod.id}">${mod.title} <small style="display:block; opacity: 0.6">${mod.subjectLabel}</small></a></li>`).join('');
    } else {
        navArea.innerHTML = `<div style="padding: 1.5rem; color: var(--text-muted); font-size: 0.8rem;">No results found for "${term}"</div>`;
    }
});

init();

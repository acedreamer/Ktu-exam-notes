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
    
    const [subject, module] = hash.split('/');
    const path = `notes/${subject}/${module}.md`;
    
    // Reset all topic lists
    document.querySelectorAll('.topic-list').forEach(tl => tl.innerHTML = '');
    
    // Update active state in sidebar
    document.querySelectorAll('#nav-content a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${hash}`);
    });

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
        
        // Stage 3: Section Card Wrapping
        wrapSections();

        // Stage 4: Analogy Blocks
        wrapAnalogies();

        // Stage 5: Graphs
        renderGraphs();

        // Stage 6: KaTeX
        renderMathInElement(renderArea, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ],
            throwOnError: false
        });

        // Stage 7: Extract Topics for Sidebar
        const topics = Array.from(renderArea.querySelectorAll('h2')).map((h, i) => {
            h.id = `topic-${i}`;
            return { id: h.id, text: h.innerText };
        });

        const activeTopicList = document.getElementById(`topics-${subject}-${module}`);
        if (activeTopicList) {
            activeTopicList.innerHTML = topics.map(t => `
                <span class="topic-item" data-id="${t.id}" onclick="document.getElementById('${t.id}').scrollIntoView({behavior: 'smooth'})">${t.text}</span>
            `).join('');
        }
        
        contentArea.scrollTo({ top: 0, behavior: 'instant' });
        
        // Wait for rendering to settle then update progress
        setTimeout(() => {
            updateProgress();
            renderArea.classList.remove('fade-in');
            void renderArea.offsetWidth; // Trigger reflow
            renderArea.classList.add('fade-in');
        }, 50);

    } catch (err) {
        renderArea.innerHTML = `<h1 style="color: var(--accent-red)">Error</h1><p>${err.message}</p>`;
    }
}

let lastActiveTopicId = null;

function updateProgress() {
    if (!contentArea) return;
    
    const scroll = contentArea.scrollTop;
    const height = contentArea.scrollHeight - contentArea.clientHeight;
    
    if (height > 0) {
        const progress = (scroll / height) * 100;
        progressBar.style.width = `${progress}%`;
    } else {
        progressBar.style.width = '0%';
    }

    const headings = Array.from(renderArea.querySelectorAll('h2'));
    let activeTopicId = null;
    
    // Find the current heading: the last one that hasn't passed the threshold
    for (let i = 0; i < headings.length; i++) {
        if (headings[i].offsetTop - contentArea.offsetTop <= scroll + 150) {
            activeTopicId = headings[i].id;
        } else {
            break;
        }
    }

    // Default to first heading if scrolled to very top
    if (!activeTopicId && headings.length > 0) activeTopicId = headings[0].id;

    if (activeTopicId && activeTopicId !== lastActiveTopicId) {
        lastActiveTopicId = activeTopicId;
        
        document.querySelectorAll('.topic-item').forEach(item => {
            const isMatched = item.getAttribute('data-id') === activeTopicId;
            item.classList.toggle('active', isMatched);
            
            if (isMatched) {
                // Scroll the sidebar itself, ensuring we don't jump the main content
                const sidebarNav = document.getElementById('nav-content');
                const itemTop = item.offsetTop;
                const sidebarHeight = sidebarNav.clientHeight;
                
                if (itemTop < sidebarNav.scrollTop || itemTop > sidebarNav.scrollTop + sidebarHeight) {
                    sidebarNav.scrollTo({
                        top: itemTop - (sidebarHeight / 2),
                        behavior: 'smooth'
                    });
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
            
            // Move heading and subsequent elements until next major heading
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
    
    // Theme-aware colors
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
        svgContent = `
            ${axisBase}
            <path d="M50,110 L170,30" stroke="${colors.supply}" stroke-width="2" fill="none" stroke-linecap="round"/> <!-- S -->
            <path d="M50,30 L170,110" stroke="${colors.demand}" stroke-width="2" fill="none" stroke-linecap="round"/> <!-- D -->
            <circle cx="110" cy="70" r="3" fill="${colors.text}"/>
            <text x="175" y="35" font-family="var(--font-mono)" font-size="10" font-weight="bold" fill="${colors.demand}">D</text>
            <text x="175" y="115" font-family="var(--font-mono)" font-size="10" font-weight="bold" fill="${colors.supply}">S</text>
            <path d="M40,70 L110,70 L110,120" stroke="${colors.axis}" stroke-width="1" stroke-dasharray="4" fill="none"/>
            <text x="115" y="65" font-family="var(--font-mono)" font-size="9" fill="${colors.text}">E</text>
        `;
        caption = 'Market Equilibrium: Supply and Demand';
    } else if (type === 'monopoly') {
        svgContent = `
            ${axisBase}
            <path d="M50,30 L170,100" stroke="${colors.demand}" stroke-width="2" fill="none" stroke-linecap="round"/> <!-- AR -->
            <path d="M50,30 L110,120" stroke="${colors.mr}" stroke-width="2" fill="none" stroke-linecap="round"/> <!-- MR -->
            <path d="M50,100 Q110,20 170,100" stroke="${colors.ac}" stroke-width="2" fill="none" stroke-linecap="round"/> <!-- AC -->
            <path d="M40,110 Q110,110 170,20" stroke="${colors.mc}" stroke-width="2" fill="none" stroke-linecap="round"/> <!-- MC -->
            <text x="175" y="105" font-family="var(--font-mono)" font-size="9" fill="${colors.demand}">AR (D)</text>
            <text x="115" y="115" font-family="var(--font-mono)" font-size="9" fill="${colors.mr}">MR</text>
            <text x="175" y="25" font-family="var(--font-mono)" font-size="9" fill="${colors.mc}">MC</text>
        `;
        caption = 'Monopoly: Equilibrium with MC, AC, MR, AR';
    } else if (type === 'perfect-competition') {
        svgContent = `
            <!-- Market Side -->
            <g transform="translate(0,0) scale(0.9)">
                <path d="M30,20 L30,120 L100,120" fill="none" stroke="${colors.axis}" stroke-width="1.5"/>
                <path d="M40,40 L90,110" stroke="${colors.supply}" stroke-width="1.5" fill="none"/>
                <path d="M40,110 L90,40" stroke="${colors.demand}" stroke-width="1.5" fill="none"/>
                <text x="50" y="15" font-family="var(--font-mono)" font-size="8" fill="${colors.text}" font-weight="bold">MARKET</text>
            </g>
            <!-- Firm Side -->
            <g transform="translate(100,0) scale(0.9)">
                <path d="M30,20 L30,120 L100,120" fill="none" stroke="${colors.axis}" stroke-width="1.5"/>
                <path d="M30,75 L100,75" stroke="${colors.demand}" stroke-width="2" fill="none"/> <!-- Price -->
                <path d="M40,100 Q65,40 95,100" stroke="${colors.ac}" stroke-width="1.5" fill="none"/>
                <path d="M30,110 Q65,110 95,30" stroke="${colors.mc}" stroke-width="1.5" fill="none"/>
                <text x="50" y="15" font-family="var(--font-mono)" font-size="8" fill="${colors.text}" font-weight="bold">FIRM</text>
                <text x="75" y="70" font-family="var(--font-mono)" font-size="7" fill="${colors.demand}">P=AR=MR</text>
            </g>
            <path d="M85,67 L130,67" stroke="${colors.axis}" stroke-width="1" stroke-dasharray="2" fill="none"/>
        `;
        caption = 'Perfect Competition: Market vs Individual Firm (Price Taker)';
    } else if (type === 'kinked-demand') {
        svgContent = `
            ${axisBase}
            <path d="M50,40 L110,70" stroke="${colors.demand}" stroke-width="2.5" fill="none" stroke-linecap="round"/> <!-- Elastic part -->
            <path d="M110,70 L160,120" stroke="${colors.demand}" stroke-width="2.5" fill="none" stroke-linecap="round"/> <!-- Inelastic part -->
            <circle cx="110" cy="70" r="3" fill="${colors.accent_red}"/>
            <path d="M40,70 L110,70 L110,120" stroke="${colors.axis}" stroke-width="1" stroke-dasharray="4" fill="none"/>
            <text x="55" y="35" font-family="var(--font-mono)" font-size="8" fill="${colors.text}">Elastic</text>
            <text x="135" y="105" font-family="var(--font-mono)" font-size="8" fill="${colors.text}">Inelastic</text>
            <text x="115" y="65" font-family="var(--font-mono)" font-size="9" fill="${colors.text}" font-weight="bold">KINK (P*)</text>
        `;
        caption = 'Oligopoly: Sweezy\'s Kinked Demand Curve';
    }

    container.innerHTML = `
        <div style="background: ${colors.bg}; padding: 20px; border: 1px solid var(--border); margin: 2rem 0;">
            <svg viewBox="0 0 200 150" style="width: 100%; height: auto; display: block; overflow: visible;">
                ${svgContent}
            </svg>
        </div>
        <figcaption style="text-align: center; font-family: var(--font-body); font-style: italic; font-size: 0.85rem; color: var(--text-secondary); margin-top: -1.5rem; margin-bottom: 2rem;">
            <span style="color: var(--accent-amber); font-weight: bold; font-family: var(--font-mono); font-size: 0.7rem; text-transform: uppercase; margin-right: 0.5rem;">[Figure]</span> ${caption}
        </figcaption>`;
    
    return container;
}

// Search & Indexing
const searchInput = document.getElementById('search');

async function buildIndex(manifest) {
    for (const sub of manifest.subjects) {
        for (const mod of sub.modules) {
            try {
                const res = await fetch(mod.path);
                const text = await res.text();
                searchIndex.push({ 
                    ...mod, 
                    subjectLabel: sub.label,
                    subjectId: sub.id,
                    content: text.toLowerCase().replace(/^---[\s\S]*?---\n/, '') 
                });
            } catch (e) {}
        }
    }
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    if (!term) {
        renderSidebar(currentManifest);
        return;
    }
    const results = searchIndex.filter(m => m.content.includes(term) || m.title.toLowerCase().includes(term));
    if (results.length > 0) {
        navArea.innerHTML = `<div style="padding: 0 1.5rem; font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Search Results</div>` + 
            results.map(mod => `
                <li><a href="#${mod.subjectId}/${mod.id}">${mod.title} <small style="display:block; opacity: 0.6">${mod.subjectLabel}</small></a></li>
            `).join('');
    } else {
        navArea.innerHTML = `<div style="padding: 1.5rem; color: var(--text-muted); font-size: 0.8rem;">No results found for "${term}"</div>`;
    }
});

init();

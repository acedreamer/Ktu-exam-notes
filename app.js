const navArea = document.getElementById('nav-content');
const renderArea = document.getElementById('render-area');
const contentArea = document.getElementById('content');
const progressBar = document.getElementById('progress-bar');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

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

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark-mode');
        document.documentElement.classList.toggle('light-mode', !isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        [themeToggle, themeToggleMobile].forEach(btn => btn.innerText = isDark ? '🌙' : '☀️');
    };

    [themeToggle, themeToggleMobile].forEach(btn => btn.addEventListener('click', toggleTheme));

    contentArea.addEventListener('scroll', updateProgress);

    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        toggleTheme();
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
                <span class="topic-item" onclick="document.getElementById('${t.id}').scrollIntoView({behavior: 'smooth'})">${t.text}</span>
            `).join('');
        }
        
        contentArea.scrollTo(0, 0);
        updateProgress();
        
        renderArea.classList.remove('fade-in');
        void renderArea.offsetWidth; // Trigger reflow
        renderArea.classList.add('fade-in');

    } catch (err) {
        renderArea.innerHTML = `<h1 style="color: var(--accent-red)">Error</h1><p>${err.message}</p>`;
    }
}

function updateProgress() {
    const scroll = contentArea.scrollTop;
    const height = contentArea.scrollHeight - contentArea.clientHeight;
    const progress = (scroll / height) * 100;
    progressBar.style.width = `${progress}%`;

    // Highlight active topic in sidebar
    const headings = Array.from(renderArea.querySelectorAll('h2'));
    let activeTopicId = null;
    
    for (const h of headings) {
        const top = h.offsetTop - contentArea.offsetTop;
        if (scroll >= top - 20) {
            activeTopicId = h.id;
        } else {
            break;
        }
    }

    document.querySelectorAll('.topic-item').forEach(item => {
        const isMatched = item.onclick.toString().includes(activeTopicId);
        item.classList.toggle('active', isMatched);
    });
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
    if (text.includes('MC') && text.includes('AR')) return 'monopoly';
    if (text.includes('S') && text.includes('D')) return 'supply-demand';
    return null;
}

function generateSVG(type) {
    const container = document.createElement('figure');
    container.className = 'graph-container';
    
    // Colors from design spec
    const colors = {
        axis: 'var(--border)',
        demand: 'var(--accent-red)',
        supply: 'var(--accent-blue)',
        mc: 'var(--accent-green)',
        ac: 'var(--accent-amber)',
        mr: 'var(--accent-purple)',
        text: 'var(--text-secondary)'
    };

    if (type === 'supply-demand') {
        container.innerHTML = `
            <svg viewBox="0 0 200 150" style="max-width: 400px; margin: 1rem auto; display: block; background: var(--bg-elevated); border-radius: 8px; padding: 10px;">
                <path d="M30,20 L30,120 L170,120" fill="none" stroke="${colors.axis}" stroke-width="2"/>
                <path d="M40,40 L160,110" stroke="${colors.supply}" stroke-width="2" fill="none"/> <!-- Supply -->
                <path d="M40,110 L160,40" stroke="${colors.demand}" stroke-width="2" fill="none"/> <!-- Demand -->
                <text x="175" y="125" font-family="var(--font-mono)" font-size="10" fill="${colors.text}">Q</text>
                <text x="15" y="25" font-family="var(--font-mono)" font-size="10" fill="${colors.text}">P</text>
                <text x="150" y="35" font-family="var(--font-mono)" font-size="10" fill="${colors.demand}">D</text>
                <text x="150" y="115" font-family="var(--font-mono)" font-size="10" fill="${colors.supply}">S</text>
            </svg>
            <figcaption style="text-align: center; font-family: var(--font-body); font-style: italic; font-size: 0.8rem; color: var(--text-muted);">Figure: Supply and Demand Equilibrium</figcaption>`;
    } else if (type === 'monopoly') {
        container.innerHTML = `
            <svg viewBox="0 0 200 150" style="max-width: 400px; margin: 1rem auto; display: block; background: var(--bg-elevated); border-radius: 8px; padding: 10px;">
                <path d="M30,20 L30,120 L170,120" fill="none" stroke="${colors.axis}" stroke-width="2"/>
                <path d="M40,30 L160,100" stroke="${colors.demand}" stroke-width="2" fill="none"/> <!-- AR -->
                <path d="M40,30 L100,120" stroke="${colors.mr}" stroke-width="2" fill="none"/> <!-- MR -->
                <path d="M40,110 Q100,20 160,110" stroke="${colors.ac}" stroke-width="2" fill="none"/> <!-- AC -->
                <path d="M30,110 Q100,110 160,20" stroke="${colors.mc}" stroke-width="2" fill="none"/> <!-- MC -->
                <text x="175" y="125" font-family="var(--font-mono)" font-size="10" fill="${colors.text}">Q</text>
                <text x="15" y="25" font-family="var(--font-mono)" font-size="10" fill="${colors.text}">P</text>
            </svg>
            <figcaption style="text-align: center; font-family: var(--font-body); font-style: italic; font-size: 0.8rem; color: var(--text-muted);">Figure: Monopoly Equilibrium (MC, AC, MR, AR)</figcaption>`;
    }
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

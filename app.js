const navArea = document.getElementById('nav-content');
const renderArea = document.getElementById('render-area');
const contentArea = document.getElementById('content');
const progressBar = document.getElementById('progress-bar');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const searchInput = document.getElementById('search');

let searchIndex = [];
let currentManifest = null;
let lastActiveTopicId = null;

// Initialize App
async function init() {
    try {
        const res = await fetch('manifest.json');
        currentManifest = await res.json();
        
        // Restore saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        const isLight = savedTheme === 'light';
        applyTheme(isLight);

        // Initial route handling will render the default sidebar
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

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            toggleThemeWithRipple(e);
        });
    }

    // Bind scroll progress tracker to window viewport
    window.addEventListener('scroll', updateProgress);
}

function toggleSidebar() {
    const isMobileOpen = document.body.classList.toggle('sidebar-open');
    if (sidebar) {
        sidebar.classList.toggle('-translate-x-full', !isMobileOpen);
    }
    if (overlay) {
        overlay.classList.toggle('hidden', !isMobileOpen);
    }
}

function closeSidebar() {
    document.body.classList.remove('sidebar-open');
    if (sidebar) {
        sidebar.classList.add('-translate-x-full');
    }
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function renderSidebar(manifest, activeSubjectId = null) {
    let html = '';

    // 1. MAIN DIRECTORY & SEMESTERS (only shown if not viewing a note detail)
    if (!activeSubjectId) {
        const isOverviewActive = !activeSubjectId;
        html += `
            <div class="px-md mb-md">
                <p class="font-label-caps text-[10px] text-muted mb-sm tracking-widest font-semibold uppercase">MAIN DIRECTORY</p>
                <ul class="border-l border-border pl-xs space-y-xs">
                    <li>
                        <a href="#" 
                           class="block py-1 text-sm ${isOverviewActive ? 'text-primary font-semibold' : 'text-secondary'} hover:text-primary transition-colors pl-sm">
                           Overview
                        </a>
                    </li>
                </ul>
            </div>
        `;

        html += `
            <div class="px-md mb-lg">
                <p class="font-label-caps text-[10px] text-muted mb-sm tracking-widest font-semibold uppercase">SEMESTERS</p>
                <ul class="border-l border-border pl-xs space-y-xs">
                    <li>
                        <a href="#" 
                           class="block py-1 text-sm ${isOverviewActive ? 'text-primary font-semibold' : 'text-secondary'} hover:text-primary transition-colors pl-sm">
                           Semester 6
                        </a>
                    </li>
                </ul>
            </div>
        `;
    }

    // 2. CURRENT SUBJECT (Only shown if viewing a note detail)
    if (activeSubjectId) {
        const sub = manifest.subjects.find(s => s.id === activeSubjectId);
        if (sub) {
            const subjectLabel = sub.id === 'CD' ? 'Compiler Design' : 'Industrial Economics';
            html += `
                <div class="px-md mb-lg">
                    <p class="font-label-caps text-[10px] text-muted mb-sm tracking-widest font-semibold uppercase">CURRENT SUBJECT</p>
                    <div class="flex items-center gap-sm px-sm py-1.5 text-accent-blue font-semibold mb-sm border-l-2 border-accent-blue/30 bg-surface/50">
                        <span class="material-symbols-outlined text-md">menu_book</span>
                        <span class="text-sm">${subjectLabel}</span>
                    </div>
                    <ul class="border-l border-border pl-xs space-y-xs">
                        ${sub.modules.map(mod => `
                            <li id="mod-${sub.id}-${mod.id}" class="relative">
                                <a href="#${sub.id}/${mod.id}" 
                                   class="sidebar-link block py-1 text-sm text-secondary hover:text-primary transition-colors pl-sm" 
                                   data-path="${mod.path}">
                                   ${mod.title}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }
    }

    navArea.innerHTML = html;
}

function highlightActiveLink() {
    const hash = window.location.hash;
    document.querySelectorAll('.sidebar-link').forEach(a => {
        const isActive = a.getAttribute('href') === hash;
        a.classList.toggle('text-primary', isActive);
        a.classList.toggle('font-semibold', isActive);
        a.classList.toggle('text-secondary', !isActive);

        if (isActive) {
            if (!navArea.innerHTML.includes('Search Results')) {
                a.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// Track visits dynamically (Max 4 items, keeping only the latest instance of a subject)
function recordVisit(subject, moduleId, title) {
    let list = JSON.parse(localStorage.getItem('recent_notes') || '[]');
    // Filter out previous entries of the SAME subject
    list = list.filter(item => item.subject !== subject);
    // Insert new visit at the front
    list.unshift({ hash: `${subject}/${moduleId}`, subject, moduleId, title });
    localStorage.setItem('recent_notes', JSON.stringify(list.slice(0, 4)));
}

// Read history and verify items against active manifest.json
function getRecentlyViewed(manifest) {
    const rawList = JSON.parse(localStorage.getItem('recent_notes') || '[]');
    const verifiedList = [];
    let updated = false;

    for (const item of rawList) {
        // Verify subject and module exist in current manifest
        const subjectMatch = manifest.subjects.find(s => s.id === item.subject);
        const moduleMatch = subjectMatch ? subjectMatch.modules.find(m => m.id === item.moduleId) : null;
        
        if (moduleMatch) {
            verifiedList.push(item);
        } else {
            updated = true;
        }
    }

    if (updated) {
        localStorage.setItem('recent_notes', JSON.stringify(verifiedList));
    }
    return verifiedList;
}

function renderHomePage(manifest) {
    // Generate actual subject catalog cards
    const subjectsGrid = manifest.subjects.map(sub => {
        const courseName = sub.id === 'CD' 
            ? 'Compiler Design (CST302)' 
            : 'Industrial Economics & Foreign Trade (HUT300)';
        const courseDesc = sub.id === 'CD'
            ? 'Access structured notes on Lexical Analysis, Parsing, Syntax Directed Translation, and Code Generation.'
            : 'Access detailed study notes on Microeconomics, Macroeconomics, Market Structures, and International Trade.';
        return `
            <div onclick="window.location.hash = '#${sub.id}/${sub.modules[0].id}'" 
                 class="explore-card p-lg border border-border bg-surface cursor-pointer group flex flex-col justify-between h-full">
                <div>
                    <span class="font-label-caps text-[10px] text-accent-blue font-semibold tracking-wider">${sub.id} COURSE</span>
                    <h4 class="font-headline-md text-2xl font-bold mt-sm text-primary group-hover:translate-x-1 transition-transform duration-300 ease-out">${courseName}</h4>
                    <div class="text-sm text-secondary mt-sm leading-relaxed">${courseDesc}</div>
                </div>
                <div class="font-mono text-[9px] text-muted uppercase tracking-widest mt-lg font-normal opacity-80 select-none">
                    ${sub.totalTopics || 0} Topics
                </div>
            </div>
        `;
    }).join('');

    // Generate verified history links
    const historyList = getRecentlyViewed(manifest);
    let recentlyViewedSection = '';

    if (historyList.length > 0) {
        const historyCards = historyList.map(item => `
            <div onclick="window.location.hash = '#${item.hash}'" 
                 class="explore-card min-w-[280px] p-md border border-border bg-surface cursor-pointer flex flex-col justify-between">
                <div>
                    <span class="font-label-caps text-[9px] text-accent-amber font-semibold uppercase tracking-wider">${item.subject}</span>
                    <h5 class="font-headline-md text-md font-bold mt-sm text-primary">${item.title}</h5>
                </div>
                <div class="font-mono text-[8px] text-muted uppercase tracking-widest mt-md font-normal opacity-60 select-none">Continue Reading</div>
            </div>
        `).join('');

        recentlyViewedSection = `
            <section class="space-y-sm pt-md border-b border-border pb-xl">
                <h3 class="font-label-caps text-[10px] text-muted tracking-widest font-semibold uppercase select-none">RECENTLY VIEWED</h3>
                <div class="flex gap-md overflow-x-auto no-scrollbar pb-xs">
                    ${historyCards}
                </div>
            </section>
        `;
    }

    return `
        <div class="space-y-xl">
            <section class="space-y-md border-b border-border pb-xl select-none">
                <h1 class="font-display-branch text-5xl md:text-7xl text-primary font-bold tracking-tight">KTU EXAM ARCHIVE</h1>
                <p class="font-body-lg text-lg text-secondary max-w-2xl leading-relaxed">
                    Access premium, structured revision notes, worked examples, and exam tips compiled specifically for KTU  engineering exams.
                </p>
            </section>
            
            ${recentlyViewedSection}

            <section class="space-y-md pt-lg">
                <h3 class="font-headline-md text-2xl font-bold text-primary select-none">Explore Subjects</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                    ${subjectsGrid}
                </div>
            </section>
        </div>
    `;
}

async function handleRoute() {
    const hash = window.location.hash.slice(1);
    
    // 1. HOME/WELCOME PAGE ROUTE
    if (!hash) {
        renderSidebar(currentManifest); // Render sidebar showing Semesters only
        renderArea.innerHTML = renderHomePage(currentManifest);
        progressBar.style.width = '0%';
        highlightActiveLink();
        
        // Clear right TOC list
        const tocList = document.getElementById('toc-list');
        if (tocList) {
            tocList.innerHTML = `<li class="text-xs text-muted italic select-none">No active module</li>`;
        }
        return;
    }
    
    // 2. NOTE DETAIL ROUTE
    lastActiveTopicId = null;
    window.scrollTo(0, 0); 
    progressBar.style.width = '0%';

    const [subject, module] = hash.split('/');
    const path = `notes/${subject}/${module}.md`;
    
    // Render the active subject modules inside sidebar
    renderSidebar(currentManifest, subject);
    highlightActiveLink();

    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error('Note not found');
        let text = await res.text();
        
        // Extract note title from manifest to record visit
        const currentSub = currentManifest.subjects.find(s => s.id === subject);
        const currentMod = currentSub ? currentSub.modules.find(m => m.id === module) : null;
        const noteTitle = currentMod ? currentMod.title : 'Study Notes';
        
        // Save visit to history (updates subject latest instance only)
        recordVisit(subject, module, noteTitle);
        
        // Strip frontmatter
        text = text.replace(/^---[\s\S]*?---\r?\n/, '');

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

        // Right TOC sidebar populate
        const tocList = document.getElementById('toc-list');
        if (tocList) {
            if (topics.length > 0) {
                tocList.innerHTML = topics.map(t => `
                    <li>
                        <a class="toc-link block text-xs text-muted hover:text-primary pl-md py-1 transition-colors" 
                           href="#${t.id}" 
                           onclick="event.preventDefault(); document.getElementById('${t.id}').scrollIntoView({behavior: 'smooth'})">
                            ${t.text}
                        </a>
                    </li>
                `).join('');
            } else {
                tocList.innerHTML = `<li class="text-xs text-muted italic select-none">No topics found</li>`;
            }
        }
        
        // Final sync after rendering
        setTimeout(() => {
            updateProgress();
            renderArea.classList.remove('fade-in');
            void renderArea.offsetWidth;
            renderArea.classList.add('fade-in');
        }, 100);

    } catch (err) {
        renderArea.innerHTML = `<h1 class="text-accent-red text-2xl font-bold font-headline-md">Error</h1><p class="text-secondary mt-md">${err.message}</p>`;
    }
}

function updateProgress() {
    if (!renderArea) return;
    
    // Measure window scroll offsets
    const scroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // 1. Sync reading progress bar at top of page
    if (height > 0) {
        const progress = (scroll / height) * 100;
        progressBar.style.width = `${progress}%`;
    } else {
        progressBar.style.width = '0%';
    }

    // 2. active topic highlighting logic
    const masterHeadings = Array.from(renderArea.querySelectorAll('h2'))
        .filter(h => h.id && h.id.startsWith('master-topic-'));
    
    if (masterHeadings.length === 0) return;

    let activeTopicId = null;
    const threshold = 100; // Trigger threshold in pixels from top of screen

    for (let i = 0; i < masterHeadings.length; i++) {
        const rect = masterHeadings[i].getBoundingClientRect();
        if (rect.top <= threshold) {
            activeTopicId = masterHeadings[i].id;
        } else {
            break;
        }
    }

    if (!activeTopicId) activeTopicId = masterHeadings[0].id;

    if (activeTopicId && activeTopicId !== lastActiveTopicId) {
        lastActiveTopicId = activeTopicId;
        
        // Sync active class on right sidebar TOC links
        document.querySelectorAll('.toc-link').forEach(item => {
            const isMatched = item.getAttribute('href') === `#${activeTopicId}`;
            item.classList.toggle('text-primary', isMatched);
            item.classList.toggle('font-semibold', isMatched);
            item.classList.toggle('text-muted', !isMatched);
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
        bg: 'var(--bg-surface)'
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
                    content: text.toLowerCase().replace(/^---[\s\S]*?---\r?\n/, '') 
                });
            } catch (e) {}
        }
    }
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    
    // Automatically open sidebar on mobile when search contains text
    if (term && window.innerWidth < 1024) {
        document.body.classList.add('sidebar-open');
        if (sidebar) sidebar.classList.remove('-translate-x-full');
        if (overlay) overlay.classList.remove('hidden');
    }

    if (!term) { 
        const hash = window.location.hash.slice(1);
        const subject = hash ? hash.split('/')[0] : null;
        renderSidebar(currentManifest, subject); 
        highlightActiveLink();
        return; 
    }
    const results = searchIndex.filter(m => m.content.includes(term) || m.title.toLowerCase().includes(term));
    if (results.length > 0) {
        navArea.innerHTML = `<div class="px-md py-xs font-mono text-[10px] text-muted uppercase tracking-wider select-none">Search Results</div>` + results.map(mod => `
            <li class="relative">
                <a href="#${mod.subjectId}/${mod.id}" 
                   class="sidebar-link block py-2 text-sm text-secondary hover:text-primary transition-colors pl-sm">
                   ${mod.title}
                   <small class="block opacity-60 text-[10px]">${mod.subjectLabel}</small>
                </a>
            </li>
        `).join('');
    } else {
        navArea.innerHTML = `<div class="px-md py-lg text-muted text-xs italic">No results found for "${term}"</div>`;
    }
});

// Theme Ripple Transition
function toggleThemeWithRipple(event) {
    const isCurrentlyLight = document.documentElement.classList.contains('light');
    const newLight = !isCurrentlyLight;

    // Fallback if browser doesn't support View Transitions
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        applyTheme(newLight);
        return;
    }

    // Disable DOM CSS transitions temporarily to prevent double-animation flickering
    document.documentElement.classList.add('no-transitions');

    // Get center coordinates of the theme button
    const themeBtn = document.getElementById('theme-toggle-btn');
    const rect = themeBtn ? themeBtn.getBoundingClientRect() : null;
    const x = rect ? rect.left + rect.width / 2 : (event ? event.clientX : window.innerWidth - 40);
    const y = rect ? rect.top + rect.height / 2 : (event ? event.clientY : 32);
    
    // Calculate the distance to the furthest corner
    const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
        applyTheme(newLight);
    });

    transition.ready.then(() => {
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        
        document.documentElement.animate(
            {
                clipPath: newLight ? clipPath.reverse() : clipPath
            },
            {
                duration: 650,
                easing: 'cubic-bezier(0.85, 0, 0.15, 1)',
                pseudoElement: newLight
                    ? '::view-transition-old(root)'
                    : '::view-transition-new(root)'
            }
        );
    });

    // Cleanup: restore standard CSS transitions when view transition resolves
    transition.finished.finally(() => {
        document.documentElement.classList.remove('no-transitions');
    });
}

function applyTheme(isLight) {
    document.documentElement.classList.toggle('light', isLight);
    document.documentElement.classList.toggle('dark', !isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    const themeBtnIcon = document.querySelector('#theme-toggle-btn span');
    if (themeBtnIcon) {
        const hasVT = !!document.startViewTransition;
        if (hasVT) {
            themeBtnIcon.textContent = isLight ? 'light_mode' : 'dark_mode';
            themeBtnIcon.classList.add('icon-spin');
            setTimeout(() => {
                themeBtnIcon.classList.remove('icon-spin');
            }, 150);
        } else {
            themeBtnIcon.classList.add('icon-spin');
            setTimeout(() => {
                themeBtnIcon.textContent = isLight ? 'light_mode' : 'dark_mode';
                themeBtnIcon.classList.remove('icon-spin');
            }, 150);
        }
    }
}

init();

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const NOTES_DIR = './notes';
const OUTPUT_FILE = './manifest.json';

function scanNotes(dir) {
    const subjects = [];
    if (!fs.existsSync(dir)) return subjects;

    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            const subject = { id: item, label: item, modules: [] };
            const modules = fs.readdirSync(fullPath).filter(f => f.endsWith('.md'));
            for (const mod of modules) {
                const modPath = path.join(fullPath, mod);
                const content = fs.readFileSync(modPath, 'utf8');
                const { data, content: body } = matter(content);
                
                const tags = [];
                if (body.includes('[SURE SHOT]')) tags.push('SURE SHOT');
                if (body.includes('[HIGH YIELD]')) tags.push('HIGH YIELD');
                const pyqMatch = body.match(/\[REPEATED PYQ: (\d{4})\]/g);
                if (pyqMatch) tags.push(...pyqMatch.map(m => m.replace(/[\[\]]/g, '')));

                subject.modules.push({
                    id: mod.replace('.md', ''),
                    title: data.title || mod.replace('.md', '').replace(/_/g, ' '),
                    order: data.order || 99,
                    path: modPath.replace(/\\/g, '/'),
                    tags: [...new Set(tags)]
                });
            }
            subject.modules.sort((a, b) => a.order - b.order);
            subjects.push(subject);
        }
    }
    return { subjects };
}

const manifest = scanNotes(NOTES_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
console.log('Manifest generated!');

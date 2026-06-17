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
            let totalTopics = 0;
            
            // Default label & description mapping
            let label = `${item} Course`;
            let description = `Access detailed study notes and exam preparation materials for ${item}.`;
            
            if (item === 'CD') {
                label = 'Compiler Design (CST302)';
                description = 'Access structured notes on Lexical Analysis, Parsing, Syntax Directed Translation, and Code Generation.';
            } else if (item === 'IEFT') {
                label = 'Industrial Economics & Foreign Trade (HUT300)';
                description = 'Access detailed study notes on Microeconomics, Macroeconomics, Market Structures, and International Trade.';
            }
            
            // Try loading from notes/<SUBJECT>/subject.json if it exists
            const subjectJsonPath = path.join(fullPath, 'subject.json');
            if (fs.existsSync(subjectJsonPath)) {
                try {
                    const subMeta = JSON.parse(fs.readFileSync(subjectJsonPath, 'utf8'));
                    label = subMeta.label || subMeta.title || subMeta.name || label;
                    description = subMeta.description || description;
                } catch (e) {
                    console.error(`Error reading subject.json in ${item}:`, e.message);
                }
            }
            
            const subject = { id: item, label, description, totalTopics: 0, modules: [] };
            const modules = fs.readdirSync(fullPath).filter(f => f.endsWith('.md'));
            
            for (const mod of modules) {
                const modPath = path.join(fullPath, mod);
                const content = fs.readFileSync(modPath, 'utf8');
                const { data, content: body } = matter(content);
                
                // Count topics (headings starting with '## [Number].')
                const topicMatches = body.match(/^## \s*\d+\..*$/gm);
                const topicCount = topicMatches ? topicMatches.length : 0;
                totalTopics += topicCount;

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
            subject.totalTopics = totalTopics;
            subject.modules.sort((a, b) => a.order - b.order);
            subjects.push(subject);
        }
    }
    return { subjects };
}

const manifest = scanNotes(NOTES_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
console.log('Manifest generated with topic counts!');

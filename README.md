# 📚 KTU Exam Notes

[![Architecture - Static SPA](https://img.shields.io/badge/Architecture-Static%20SPA-blue.svg)](#)
[![Math - KaTeX](https://img.shields.io/badge/Math-KaTeX-green.svg)](#)
[![Markdown - MarkedJS](https://img.shields.io/badge/Markdown-MarkedJS-orange.svg)](#)
[![License - ISC](https://img.shields.io/badge/License-ISC-red.svg)](package.json)

> High-performance static Single Page Application (SPA) designed as a minimalist, distraction-free exam revision dashboard for KTU B.Tech engineering students.

It loads course modules dynamically, rendering interactive notes, typeset math formulas, and custom vector diagrams. Designed to be highly readable under late-night exam prep conditions on mobile or desktop, and supports printing clean physical sheets.

---

## 🚀 Getting Started

To compile the notes catalog and run the application locally:

### 1. Compile the Manifest
The manifest indexes all course notes, module hierarchies, and pre-calculates the topic metrics.
```bash
# Install dependencies
npm install

# Run the build pipeline to compile notes/ into manifest.json
node build.mjs
```

### 2. Launch Local Server
Serve the project directory using any static web server:
```bash
# Example using Node.js serve
npx serve -p 3000
```
Open `http://localhost:3000` in your browser.

---

## ✨ Features

- ⚡ **Dynamic Hash-Based Routing**: Fast client-side loading of notes under `#subject/module` without page refreshes.
- 📖 **Table of Contents & Scroll Sync**: Automatic header extraction, real-time scroll tracking, and active item highlighting in the right TOC panel.
- 💡 **Dynamic Section Cards**: Automatically groups raw markdown into beautiful interactive containers for *Theory*, *Worked Examples*, *Exam Tips*, and *Rapid Recall* based on heading keywords.
- 📐 **Math Typesetting**: Beautiful, hardware-accelerated math formula rendering powered by [KaTeX](https://katex.org/).
- 📊 **ASCII-to-SVG Graphs**: Instant client-side conversion of textual coordinate diagrams into vector charts (e.g. perfect competition, supply-demand, monopoly curves).
- 🔍 **Live Search Filter**: Zero-latency runtime text indexing for quickly locating notes.
- 🎨 **Minimalist UI & Fluid Transitions**: Elegant ripple theme transitions, snappy micro-interactions, and a distraction-free editorial layout.
- 🖨️ **Print-Ready Styles**: Custom print media CSS rules that hide search widgets, sidebar menus, and headers for clean paper handouts.

---

## 📂 Project Structure

- **[notes/](file:///notes/)**: Raw markdown study guides organized by subject (`CD/` for Compiler Design, `IEFT/` for Industrial Economics).
- **[manifest.json](file:///manifest.json)**: Centralized catalog of subjects, module titles, orders, paths, and total topic counts.
- **[build.mjs](file:///build.mjs)**: Build compiler that extracts YAML frontmatter and generates the manifest index.
- **[app.js](file:///app.js)**: Core client script managing SPA routing, markdown parsing, custom card wrapping, SVG graph generation, search indexing, and theme transitions.
- **[style.css](file:///style.css)**: Theme colors (dark/light), typography configuration, custom animation properties, and layout boxes.
- **[index.html](file:///index.html)**: Main skeleton hosting Marked.js, KaTeX, and application frames.

---

## 📝 Document Formatting Guide

Each note is a markdown file placed in `notes/<SUBJECT_ID>/`. To enable full interactivity, write notes conforming to these conventions:

### Frontmatter Schema
Each note must begin with a YAML frontmatter block:
```yaml
---
title: "Module 1: Introduction to Compilers"
order: 1
---
```

### Priority Badges
Write raw text tags to automatically inject formatted badges:
- `[SURE SHOT]` $\rightarrow$ ★ SURE SHOT (critical exam topics)
- `[HIGH YIELD]` $\rightarrow$ ↑ HIGH YIELD (high probability concepts)
- `[REPEATED PYQ: 2022, 2023]` $\rightarrow$ ↻ PYQ: 2022, 2023 (previous years' questions)

### Dynamic Cards
Raw headings with specific keywords are auto-wrapped into styled cards:
- **what is this** $\rightarrow$ `💡 What is this?` (`section-amber`)
- **theory** $\rightarrow$ `📖 Theory` (`section-blue`)
- **example** $\rightarrow$ `∑ Worked Examples` (`section-green`)
- **exam** $\rightarrow$ `✍ Exam Tips` (`section-purple`)
- **recall / test** $\rightarrow$ `⚡ Rapid Recall` (`section-red`)

### Analogy Blocks
Start blockquotes with **Analogy:** to style them with a custom callout:
```markdown
> **Analogy:** Imagine a factory assembly line sorting raw metals...
```

### SVG Graph Triggers
Textual code blocks containing coordinate characters `^` and `|` are replaced with inline SVGs when keywords match:
- `kink` $\rightarrow$ Kinked demand curve (Oligopoly)
- `market` & `firm` $\rightarrow$ Perfect competition diagram
- `mc` & `ar` $\rightarrow$ Monopoly equilibrium
- `s` & `d` $\rightarrow$ Supply and demand curves

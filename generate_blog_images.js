const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const destDir = path.join(__dirname, 'assets', 'images', 'blog');
if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

function createGradientSVG(width, height, color1, color2, title) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <rect width="100%" height="100%" fill="#ffffff" opacity="0.1" />
        <circle cx="${width/2}" cy="${height/2}" r="${width/4}" fill="#ffffff" opacity="0.05" />
        <circle cx="${width/3}" cy="${height/3}" r="${width/6}" fill="#ffffff" opacity="0.05" />
        
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" opacity="0.5">${title}</text>
    </svg>`;
}

const blogs = [
    { id: 'featured', w: 1200, h: 600, c1: '#2563EB', c2: '#1E40AF', title: 'Featured Article' },
    { id: 'post1', w: 800, h: 500, c1: '#059669', c2: '#047857', title: 'Tech Innovation' },
    { id: 'post2', w: 800, h: 500, c1: '#8B5CF6', c2: '#6D28D9', title: 'Cloud ERP' },
    { id: 'post3', w: 800, h: 500, c1: '#EA580C', c2: '#C2410C', title: 'Data Analytics' },
    { id: 'post4', w: 800, h: 500, c1: '#0EA5E9', c2: '#0369A1', title: 'Cybersecurity' },
    { id: 'post5', w: 800, h: 500, c1: '#F43F5E', c2: '#BE123C', title: 'Future of AI' },
    { id: 'post6', w: 800, h: 500, c1: '#14B8A6', c2: '#0F766E', title: 'Supply Chain' },
    { id: 'case1', w: 600, h: 400, c1: '#334155', c2: '#0F172A', title: 'Case Study: Manufacturing' },
    { id: 'case2', w: 600, h: 400, c1: '#475569', c2: '#1E293B', title: 'Case Study: Healthcare' }
];

async function generateBlogImages() {
    for (const blog of blogs) {
        const svgString = createGradientSVG(blog.w, blog.h, blog.c1, blog.c2, blog.title);
        const destPath = path.join(destDir, `${blog.id}.webp`);
        
        try {
            await sharp(Buffer.from(svgString))
                .webp({ quality: 80 })
                .toFile(destPath);
                
            const stats = fs.statSync(destPath);
            console.log(`Generated ${blog.id}.webp: ${(stats.size / 1024).toFixed(2)} KB`);
        } catch (error) {
            console.error(`Error generating ${blog.id}:`, error);
        }
    }
}

generateBlogImages();

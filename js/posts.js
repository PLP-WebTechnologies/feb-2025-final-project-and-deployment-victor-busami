// Sample blog posts data with local images
var blogPosts = [
    {
        id: 1,
        title: "Getting Started with React",
        date: "2025-02-15",
        excerpt: "Learn the fundamentals of React and how to build your first component.",
        content: `<p>React has revolutionized frontend development with its component-based architecture. In this post, we'll cover:</p>
                 <ul>
                    <li>Setting up your first React project</li>
                    <li>Understanding JSX syntax</li>
                    <li>Building reusable components</li>
                    <li>State management basics</li>
                 </ul>
                 <p>By the end, you'll have a working React application!</p>`,
        image: "./images/react.jpeg",
        tags: ["react", "javascript", "frontend"]
    },
    {
        id: 2,
        title: "CSS Grid Layout Guide",
        date: "2025-01-10",
        excerpt: "Master CSS Grid with this comprehensive guide to modern layouts.",
        content: `<p>CSS Grid provides a powerful two-dimensional layout system. Key topics include:</p>
                 <ol>
                    <li>Grid container vs grid items</li>
                    <li>Fractional units (fr) for responsive layouts</li>
                    <li>Grid template areas for visual organization</li>
                    <li>Advanced alignment techniques</li>
                 </ol>
                 <p>Complete with practical examples you can use today.</p>`,
        image: "./images/css-grid.jpeg",
        tags: ["css", "web design", "layout"]
    },
    {
        id: 3,
        title: "JavaScript ES6 Features",
        date: "2025-03-22",
        excerpt: "Explore the most useful ES6 features for modern JavaScript development.",
        content: `<p>ECMAScript 2015 (ES6) introduced major improvements:</p>
                 <ul>
                    <li>Arrow functions for concise syntax</li>
                    <li>Template literals for better string handling</li>
                    <li>Destructuring for clean variable assignment</li>
                    <li>Modules for better code organization</li>
                 </ul>`,
        image: "./images/es6.jpeg",
        tags: ["javascript", "es6", "web development"]
    },
    {
        id: 4,
        title: "Responsive Design Principles",
        date: "2025-04-05",
        excerpt: "Create websites that work perfectly on any device.",
        content: `<p>Responsive design is no longer optional. Core principles include:</p>
                 <ol>
                    <li>Mobile-first approach</li>
                    <li>Fluid grids and flexible images</li>
                    <li>Media query breakpoints</li>
                    <li>Performance considerations</li>
                 </ol>`,
        image: "./images/responsive.jpeg",
        tags: ["responsive", "css", "design"]
    }
];

// Fallback to Unsplash if local images are missing
blogPosts.forEach(post => {
    if (!post.image.startsWith('http')) {
        post.imageFallback = `https://source.unsplash.com/random/600x400/?${post.tags[0]}`;
    }
});
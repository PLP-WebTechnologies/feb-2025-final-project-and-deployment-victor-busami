document.addEventListener('DOMContentLoaded', function() {
    // Initialize features
    blogUtils.setupThemeToggle();
    blogUtils.setupSearch(blogPosts);
    blogUtils.setupPagination(blogPosts);
    
    // Featured post
    const featuredPostContainer = document.querySelector('.featured-post');
    if (featuredPostContainer && blogPosts.length > 0) {
        const featuredPost = blogPosts[0];
        featuredPostContainer.innerHTML = `
            <article class="featured-article">
                <div class="featured-image" style="background-image: url('${featuredPost.image}')"></div>
                <div class="featured-content">
                    <h2>${featuredPost.title}</h2>
                    <p class="post-meta">Posted on <time datetime="${featuredPost.date}">${new Date(featuredPost.date).toLocaleDateString()}</time></p>
                    <p>${featuredPost.excerpt}</p>
                    <a href="post.html?id=${featuredPost.id}" class="read-more">Read More</a>
                </div>
            </article>
        `;
    }
});
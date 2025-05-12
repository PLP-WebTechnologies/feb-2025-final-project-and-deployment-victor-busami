// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// Create post card element
function createPostCard(post) {
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');
    postCard.innerHTML = `
        <div class="post-image" style="background-image: url('${post.image}')"></div>
        <div class="post-content">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-meta">Posted on <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time></p>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="post.html?id=${post.id}" class="read-more">Read More</a>
        </div>
    `;
    return postCard;
}

// Search functionality
function setupSearch(posts) {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    const resultsContainer = document.getElementById('results-container');
    const clearSearchBtn = document.getElementById('clear-search');
    const postContainer = document.getElementById('post-container');
    const paginationContainer = document.getElementById('pagination');

    if (!searchInput) return;

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;
        
        const results = posts.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.excerpt.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query))
        );
        
        displayResults(results);
    }

    function displayResults(results) {
        searchResults.hidden = false;
        if (postContainer) postContainer.hidden = true;
        if (paginationContainer) paginationContainer.hidden = true;
        
        resultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">No results found. Try a different search term.</p>';
            return;
        }
        
        results.forEach(post => {
            resultsContainer.appendChild(createPostCard(post));
        });
    }

    function clearSearch() {
        searchInput.value = '';
        searchResults.hidden = true;
        if (postContainer) postContainer.hidden = false;
        if (paginationContainer) paginationContainer.hidden = false;
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && performSearch());
    clearSearchBtn.addEventListener('click', clearSearch);
}

// Pagination functionality
function setupPagination(posts, itemsPerPage = 6) {
    const postContainer = document.getElementById('post-container');
    const paginationContainer = document.getElementById('pagination');
    if (!postContainer || !paginationContainer) return;

    let currentPage = 1;
    
    function displayPosts() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedPosts = posts.slice(startIndex, startIndex + itemsPerPage);
        
        postContainer.innerHTML = '';
        paginatedPosts.forEach(post => {
            postContainer.appendChild(createPostCard(post));
        });
        
        renderPaginationButtons();
    }
    
    function renderPaginationButtons() {
        const totalPages = Math.ceil(posts.length / itemsPerPage);
        paginationContainer.innerHTML = '';
        
        if (totalPages <= 1) return;
        
        // Previous button
        if (currentPage > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.classList.add('page-btn');
            prevBtn.addEventListener('click', () => {
                currentPage--;
                displayPosts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationContainer.appendChild(prevBtn);
        }
        
        // Page buttons
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.classList.add('page-btn');
            if (i === currentPage) pageBtn.classList.add('active');
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                displayPosts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationContainer.appendChild(pageBtn);
        }
        
        // Next button
        if (currentPage < totalPages) {
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.classList.add('page-btn');
            nextBtn.addEventListener('click', () => {
                currentPage++;
                displayPosts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationContainer.appendChild(nextBtn);
        }
    }
    
    displayPosts();
}

// Make functions available globally
window.blogUtils = {
    setupThemeToggle,
    createPostCard,
    setupSearch,
    setupPagination
};
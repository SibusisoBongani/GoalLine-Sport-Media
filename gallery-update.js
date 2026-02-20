// This will automatically add new stories to the gallery
async function updateGalleryWithNewStories() {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL);
    const articles = await response.json();
    
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Add new stories to the BEGINNING of gallery
    articles.forEach(article => {
      // Check if image exists
      const imageUrl = `images/${article.image}`;
      const articleId = `index.html#sheet-${article.id}`;
      
      const galleryItem = document.createElement('a');
      galleryItem.href = articleId;
      
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = article.title;
      img.onerror = function() { this.src = 'images/default.jpg'; };
      
      galleryItem.appendChild(img);
      
      // Insert at the beginning of gallery
      galleryGrid.insertBefore(galleryItem, galleryGrid.firstChild);
    });
    
  } catch (error) {
    console.log('Could not load gallery images:', error);
  }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', updateGalleryWithNewStories);

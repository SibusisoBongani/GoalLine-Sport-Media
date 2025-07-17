console.log("Force-rebuilding at: " + new Date());
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Update this path if your posts are in 'posts' instead of '_posts'
const postsDir = path.join(__dirname, '../_posts'); 
const outputFile = path.join(__dirname, '../articles.json');

const articles = fs.readdirSync(postsDir).map(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
  const { data, content: body } = matter(content);
  return { ...data, body };
});

fs.writeFileSync(outputFile, JSON.stringify(articles));
console.log('Generated articles.json!');

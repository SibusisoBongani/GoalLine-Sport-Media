const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, '../_posts');
const outputFile = path.join(__dirname, '../articles.json');

const articles = fs.readdirSync(postsDir).map(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
  const { data, content: body } = matter(content);
  return { ...data, body };
});

fs.writeFileSync(outputFile, JSON.stringify(articles));
console.log('Generated articles.json!');

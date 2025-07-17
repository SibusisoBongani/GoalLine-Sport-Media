const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');


const postsDir = path.join(__dirname, '../_posts');
const outputFile = path.join(__dirname, '../articles.json');


if (!fs.existsSync(postsDir)) {
  console.error('ERROR: _posts directory does not exist!');
  process.exit(1);
}

const articles = fs.readdirSync(postsDir)
  .filter(file => file.endsWith('.md'))
  .map(file => {
    try {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
      const { data, content: body } = matter(content);
      return { 
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Unknown',
        image: data.image || '/images/default.jpg',
        body: body
      };
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
      return null;
    }
  })
  .filter(article => article !== null);

fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
console.log('Successfully generated articles.json');

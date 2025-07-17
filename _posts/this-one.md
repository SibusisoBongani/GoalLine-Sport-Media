---
title: "this one "
date: 2025-07-17T13:55:09.208Z
author: bongani
image: /images/uploads/screenshot-23-.png
---
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // Install with: npm install gray-matter

const postsDir = path.join(**dirname, '../posts');
const outputFile = path.join(**dirname, '../articles.json');

const articles = fs.readdirSync(postsDir).map(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
  const { data, content: body } = matter(content);
  return { ...data, body };
});

fs.writeFileSync(outputFile, JSON.stringify(articles));
console.log('Generated articles.json!');
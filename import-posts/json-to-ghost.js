const converter = require('@tryghost/html-to-mobiledoc');
const fs = require('fs');

const json = JSON.parse(fs.readFileSync('posts.json', 'utf8'));
json.data.posts.forEach((post) => {
  post.mobiledoc = JSON.stringify(converter.toMobiledoc(post.html))
  delete post.html
});

fs.writeFileSync('ruby-together-posts.json', JSON.stringify(json, null, 2), 'utf8');

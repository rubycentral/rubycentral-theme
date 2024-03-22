// Ship JS only active on post pages for better performance
import tocbot from 'tocbot';

tocbot.init({
    // Where to render the table of contents.
    tocSelector: '.gh-toc',
    // Where to grab the headings to build the table of contents.
    contentSelector: '.post',
    // Which headings to grab inside of the contentSelector element.
    headingSelector: 'h2, h3, h4',
    // Ensure correct positioning
    hasInnerContainers: true,
});

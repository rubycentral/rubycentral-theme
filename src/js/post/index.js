// Ship JS only active on post pages for better performance
import tocbot from 'tocbot';

// Set data-language on <pre> elements so CSS can display a clean label.
// Runs on load to ensure Prism's autoloader has finished highlighting.
window.addEventListener('load', () => {
    document.querySelectorAll('pre > code[class*="language-"]').forEach((code) => {
        const match = code.className.match(/\blanguage-(\w+)\b/);
        if (match) code.closest('pre').dataset.language = match[1];
    });
});

// Apply .wrap class to any <pre> immediately following a <!--wrap--> HTML card
document.querySelectorAll('pre').forEach((pre) => {
    let node = pre.closest('.kg-code-card') ?? pre;
    let prev = node.previousSibling;
    while (prev && prev.nodeType === Node.TEXT_NODE) {
        prev = prev.previousSibling;
    }
    if (prev && prev.nodeType === Node.COMMENT_NODE && prev.nodeValue.trim() === 'wrap') {
        pre.classList.add('wrap');
    }
});

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

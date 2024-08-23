const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Replace with the Instagram profile URL
    await page.goto('https://www.instagram.com/username/', { waitUntil: 'networkidle2' });

    // Extract posts' background images
    const posts = await page.evaluate(() => {
        let postElements = Array.from(document.querySelectorAll('article div div'));
        let postUrls = postElements.map(div => {
          console.log("PEs--->", div);
            let style = div.style.backgroundImage;
            return style.slice(5, -2); // Extract URL from 'url("...")'
        });
        return postUrls;
    });

    console.log(posts);

    await browser.close();
})();

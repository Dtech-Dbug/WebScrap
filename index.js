const puppeteer = require('puppeteer');

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://weworkremotely.com/", {
    waitUntil: "domcontentloaded",
  });

 // Get page data
 const jobDetails = await page.evaluate(() => {
  // Find the first `li.feature` element
  const jobElement = document.querySelector(".feature");

  if (jobElement) {
    // Find the `span.company` inside the `a` tag within `li.feature`
    const jobType = jobElement.querySelector("a .title")?.innerText || 'N/A';
    const JobLoc = jobElement.querySelector("a .region")?.innerText || 'N/A';
    return { jobType, JobLoc };
  } else {
    return { jobType: "Not found", JobLoc: "Not Found" };
  }
});

  // Display the job details
  console.log("Job Details:", jobDetails);

  // Display the quotes
  // console.log("final--->", quotes);

  // Close the browser
  await browser.close();
};

module.exports = getQuotes

// Start the scraping
// getQuotes();

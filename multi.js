const puppeteer = require('puppeteer');

const getJobDetails = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
 const url =  'ws://127.0.0.1:9222/devtools/browser/3d6dfe9c-41a9-4803-a588-84f033e16be0'
  const browser = await puppeteer.connect({
    browserWSEndpoint: url,
});

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "https://weworkremotely.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://weworkremotely.com/", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const jobDetails = await page.evaluate(() => {
    // Find all `li.feature` elements
    const jobElements = document.querySelectorAll(".feature");

    // Loop through each job element and extract details
    const jobs = [];
   if (jobElements) {
     jobElements.forEach((jobElement) => {
       const jobType = jobElement.querySelector("a .title")?.innerText || "N/A";
       const jobLoc = jobElement.querySelector("a .region")?.innerText || "N/A";
       const jobLink = jobElement.querySelector("a")?.href || "N/A";
       jobs.push({ jobType, jobLoc, jobLink });
     });
   }

    return jobs;
  });

  // Display the job details
  console.log("Job Details:", jobDetails);
  return jobDetails;

  // Close the browser
  await browser.close();
};

module.exports = getJobDetails

const http = require('http');
const getJobDetails =  require('./multi')


const handleJobsRequest = async(req, res) => {
  // Example response data
  const jobs = await getJobDetails()

  // Set the response header and status code
  res.writeHead(200, { 'Content-Type': 'application/json' });

  // Send the JSON response
  res.end(JSON.stringify(jobs));
};

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/jobs') {
    handleJobsRequest(req, res);
  } else {
    // Handle other routes or methods if needed
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

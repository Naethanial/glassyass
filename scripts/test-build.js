#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BUILD_DIR = path.join(__dirname, '..', 'out');

// MIME types for common file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  // Handle the base path
  let urlPath = req.url;
  if (urlPath.startsWith('/liquidglassreact-true')) {
    urlPath = urlPath.substring('/liquidglassreact-true'.length);
  }
  
  if (urlPath === '' || urlPath === '/') {
    urlPath = '/index.html';
  }
  
  const filePath = path.join(BUILD_DIR, urlPath);
  
  // Security check - ensure the file is within the build directory
  if (!filePath.startsWith(BUILD_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Try to serve index.html for client-side routing
        const indexPath = path.join(BUILD_DIR, 'index.html');
        fs.readFile(indexPath, (indexErr, indexData) => {
          if (indexErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexData);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    } else {
      const mimeType = getMimeType(filePath);
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(data);
    }
  });
});

// Check if build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error('❌ Build directory not found. Please run "npm run build" first.');
  process.exit(1);
}

server.listen(PORT, () => {
  console.log(`🚀 Production build server running at:`);
  console.log(`   Local:    http://localhost:${PORT}/liquidglassreact-true/`);
  console.log(`   Network:  http://localhost:${PORT}/liquidglassreact-true/`);
  console.log('');
  console.log('📁 Serving from:', BUILD_DIR);
  console.log('');
  console.log('Press Ctrl+C to stop the server');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
}); 
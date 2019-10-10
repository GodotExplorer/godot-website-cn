#!/usr/bin/node
const mode = process.argv.indexOf("--debug") == -1 ? 'release' : 'debug';

const express = require('express');
const path = require('path');
const port = 3030;
const app = express();

// For static assets
app.use(express.static(path.join(__dirname, '.')));

// All response set to index.html
app.get('*', (request, response) => {
	response.sendFile(path.resolve(__dirname, '', `index.${mode}.html`));
});

app.listen(port);
console.log(`[${mode}] Server started on port http://localhost:${port}`);

const express = require("express");
const fs = require("fs");
const app = express();

const port = 3000;

const path = require("path");
const pathToFile = path.join(__dirname, "data.json");
const data = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));

app.get("/", (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  data[fullUrl] ++;
  console.log(`Адресс ${fullUrl} посещен раз: ${data[fullUrl]}.`);
	fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2));
	res.end("<a href='/about'>about</a>");
});

app.get("/about", (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	data[fullUrl] ++;
  console.log(`Адресс ${fullUrl} посещен раз: ${data[fullUrl]}.`);
	fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2));
	res.end("<a href='/'>index</a>");
});

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});

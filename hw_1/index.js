// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.


const http = require("http");

const server = http.createServer((req, res) => {
	if (req.url === "/") {
		res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
		res.end("<a href='/about'>about</a>");
		indexNumVisits.increment();
		console.log(`Страница "index" посещена раз: ${indexNumVisits.getValue()}.`);
	} else if (req.url === "/about") {
		res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
		res.end("<a href='/'>index</a>");
		aboutNumVisits.increment();
		console.log(`Страница "about" посещена раз: ${aboutNumVisits.getValue()}.`);
	} else {
		res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
		res.end("<h1>Eror 404</h1>");
	}
});

const numVisits = () => {
	let value = 0;
	return {
		increment() {
			value++;
		},
		getValue() {
			return value;
		},
	};
};

const indexNumVisits = numVisits();
const aboutNumVisits = numVisits();

const port = 3000;

server.listen(port);

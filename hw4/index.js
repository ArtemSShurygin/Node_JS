const express = require("express");
const joi = require("joi");
const fs = require("fs");

const app = express();

const userSchema = joi.object({
	surname: joi.string().min(1).max(100).required(),
	name: joi.string().min(1).max(100).required(),
	patronymic: joi.string().min(1).max(100),
	age: joi.number().min(0).max(200).required(),
});


const path = require("path");
const pathToFile = path.join(__dirname, "data.json");
try {
	fs.readFileSync(pathToFile, "utf-8");
} catch (error) {
	fs.open("data.json", "w", (err) => {
		if (err) throw err;
		console.log("File created");
	});

	const addData = {
		uniqueId: 0,
		users: []
	}

	fs.writeFileSync(pathToFile, JSON.stringify(addData, null, 2));
}

const data = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));

// let uniqueId = 0;
// const users = [];

app.use(express.json());

app.get("/users", (req, res) => {
	res.send(data.users);
});

app.get("/users/:id", (req, res) => {
	const user = data.users.find((user) => user.id === +req.params.id);

	if (user) {
		res.send({ user });
	} else {
		res.status(404);
		res.send({ user: null });
	}
});

app.post("/users", (req, res) => {
	const result = userSchema.validate(req.body);
	if (result.error) {
		return res.status(404).send({ error: result.error.details });
	}

	uniqueId = ++data.uniqueId;

	data.users.push({
		id: uniqueId,
		...req.body,
	});

	fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2));
	// users.push({
	// 	id: uniqueId,
	// 	...req.body,
	// });

	res.send({ id: uniqueId });
});

app.put("/users/:id", (req, res) => {
	const result = userSchema.validate(req.body);
	if (result.error) {
		return res.status(404).send({ error: result.error.details });
	}

	const user = data.users.find((user) => user.id === +req.params.id);

	if (user) {
		user.surname = req.body.surname;
		user.name = req.body.name;
		user.patronymic = req.body.patronymic;
		user.age = req.body.age;

		fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2));
		res.send({ user });
	} else {
		res.status(404);
		res.send({ user: null });
	}
});

app.delete("/users/:id", (req, res) => {
	const user = data.users.find((user) => user.id === +req.params.id);

	if (user) {
		const userIndex = data.users.indexOf(user);
		data.users.splice(userIndex, 1);

		res.send({ user });
	} else {
		res.status(404);
		res.send({ user: null });
	}
});

app.listen(3000);

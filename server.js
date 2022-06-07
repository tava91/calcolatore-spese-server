const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(
	cors({
		origin: ['*', 'http://localhost:3000'],
		//origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type'],
	})
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));

app.route('/').get((req, res) => {
	let peopleJson = fs.readFileSync('./data/people.json');
	try {
		res.send({
			people: JSON.parse(peopleJson),
		});
	} catch {
		console.log(error);
		res.send({
			error: error,
		});
	}
});

app.route('/get-expense').post((req, res) => {
	try {
		if (!req.body) {
			res.send({
				error: 'Nessun body inviato',
			});
		}
		let expenseList = JSON.parse(fs.readFileSync('./data/expenses.json'));
		let { id } = req.body;
		let expense = expenseList.filter(exp => exp.id === id);

		res.send({
			expense: expense.length === 0 ? null : expense[0],
		});
	} catch {
		res.send({
			error: error,
		});
	}
});

app
	.route('/save-expenses')
	.get((req, res) => {
		console.log('pagina: /save-expenses');
	})
	.post((req, res) => {
		try {
			if (!req.body) {
				res.send({
					error: 'Nessun body inviato',
				});
			}

			let newExpense = req.body;
			let expenseList = JSON.parse(fs.readFileSync('./data/expenses.json'));
			expenseList = [...expenseList].filter(exp => exp.id !== newExpense.id);
			let expenses = [...expenseList, newExpense];
			fs.writeFileSync('./data/expenses.json', JSON.stringify(expenses));

			res.send({
				expenses,
			});
		} catch {
			res.send({
				error: error,
			});
		}
	});

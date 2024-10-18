const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sujithsojan:PZmfue7wQkXpWIei@c1.vmhpp.mongodb.net/expensetracker?retryWrites=true&w=majority&appName=C1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const expenseSchema = new mongoose.Schema({
  date: String,
  category: String,
  description: String,
  amount: Number,
});

const Expense = mongoose.model('Expense', expenseSchema);

app.post('/expenses', (req, res) => {
  const expense = new Expense(req.body);
  expense.save()
  .then((newExpense) => {
    return res.status(200).json(newExpense);
  })
  .catch((err) => {
    console.log('error');
  })
});

app.get('/expenses', (req, res) => {
  Expense.find()
  .then({}, (expenses) => {
    return res.status(200).json(expenses);
  })
  .catch((err) => {
    console.log(err); 
  })
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

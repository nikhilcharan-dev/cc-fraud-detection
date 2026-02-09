const express = require('express');
const app = express();
const port = 3000;

const tongueTwisters = [
  "Peter Piper picked a peck of pickled peppers.",
  "Betty Botter bought some butter, but she said the butter's bitter.",
  "She sells seashells by the seashore.",
  "Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair, Fuzzy Wuzzy wasn't fuzzy, was he?",
  "How much wood would a woodchuck chuck if a woodchuck could chuck wood?"
];

app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});

app.get('/tongue-twister', (req, res) => {
  const randomIndex = Math.floor(Math.random() * tongueTwisters.length);
  const randomTwister = tongueTwisters[randomIndex];
  res.send(randomTwister);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

interface ExerciseInput {
  daily_exercises: Array<number>;
  target: number; 
}

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(Number(weight))) {
    return res.status(500).send({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseInput;

  if (!daily_exercises || !target) {
    return res.status(500).send({ error: 'parameters missing' });
  }

  if (daily_exercises.some(data => isNaN(Number(data))) || isNaN(Number(target))) {
    return res.status(500).send({ error: 'malformatted parameters' });
  }

  const data = calculateExercises(daily_exercises, target);
  res.json(data);
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
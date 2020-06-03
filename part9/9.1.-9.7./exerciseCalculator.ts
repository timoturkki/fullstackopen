interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const calculateExercises = (exerciseData: Array<number>, target: number): ExerciseResult => {
  const periodLength = exerciseData.length;
  const trainingDays = exerciseData.filter(data => data > 0).length;
  const average = exerciseData.reduce((acc, cur) => acc + cur, 0) / periodLength;
  const success = average >= target;
  const hourDiff = average - target;
  let rating: number;
  let ratingDescription: string;

  if (hourDiff > 1) {
    rating = 3;
    ratingDescription = 'Great work!';
  } else if (hourDiff > -0.5) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Pls work harder next time!';
  }

  return { periodLength, trainingDays, success, rating,ratingDescription, target, average };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
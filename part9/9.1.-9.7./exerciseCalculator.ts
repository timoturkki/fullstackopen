interface ExerciseInputs {
  trainingData: Array<number>;
  target: number;
}

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseInputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const exerciseArgs = args.slice(2);
  const targetArg = exerciseArgs[0];
  const trainingDataArgs = exerciseArgs.slice(1);

  if (trainingDataArgs.every(data => !isNaN(Number(data))) && !isNaN(Number(targetArg))) {
    return {
      trainingData: trainingDataArgs.map(data => Number(data)),
      target: Number(targetArg)
    };
  } else {
    throw new Error('Please check that all your inputs are numbers!');
  }
};

export const calculateExercises = (exerciseData: Array<number>, target: number): ExerciseResult => {
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
};

try {
  const { trainingData, target } = parseExerciseArguments(process.argv);

  console.log(calculateExercises(trainingData, target));
} catch (e) {
  if (e instanceof Error) {
    console.log('Something went wrong, message: ', e.message );
  } else {
    console.log(e);
  }
}
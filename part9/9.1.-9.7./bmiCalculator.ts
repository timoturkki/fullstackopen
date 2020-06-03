interface BmiInputs {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiInputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Height and weight must be inputted as numbers!');
  }
}

const calculateBmi = (height_cm: number, weight_kg: number): string => { 
  const bmi = weight_kg / Math.pow(height_cm / 100, 2);
  
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

try {
  const { height, weight } = parseBmiArguments(process.argv);

  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Something went wrong, message: ', e.message);
}
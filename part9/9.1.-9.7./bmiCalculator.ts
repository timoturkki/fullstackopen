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

console.log(calculateBmi(180, 74));
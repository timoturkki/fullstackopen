import React, { FC } from 'react';
import { CoursePart } from '../types';

const Total: FC<{ courses: CoursePart[] }> = ({ courses }) => {
  return (
    <p>
      Number of exercises{' '}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;

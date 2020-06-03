import React, { FC } from 'react';
import { CourseInfo } from '../types';

const Total: FC<{ courses: CourseInfo[] }> = ({ courses }) => {
  return (
    <p>
      Number of exercises{' '}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;

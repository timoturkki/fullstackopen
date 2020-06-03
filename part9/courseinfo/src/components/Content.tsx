import React, { FC } from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content: FC<{ courses: CoursePart[] }> = ({ courses }) => {
  return (
    <>
      {courses.map(course => (
        <Part key={course.name} part={course} />
      ))}
    </>
  );
};

export default Content;

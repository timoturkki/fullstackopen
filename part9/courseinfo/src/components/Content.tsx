import React, { FC } from 'react';
import { CourseInfo } from '../types';

const Content: FC<{ courses: CourseInfo[] }> = ({ courses }) => {
  return (
    <>
      <p>
        {courses[0].name} {courses[0].exerciseCount}
      </p>
      <p>
        {courses[1].name} {courses[1].exerciseCount}
      </p>
      <p>
        {courses[2].name} {courses[2].exerciseCount}
      </p>
    </>
  );
};

export default Content;

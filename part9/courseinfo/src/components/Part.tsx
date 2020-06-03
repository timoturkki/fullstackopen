import React, { FC } from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part: FC<{ part: CoursePart }> = ({ part }) => {
  
  const renderIndividualInfo = () => {
    switch (part.name) {
      case 'Fundamentals':
        return (
          <>
            <p>{part.description}</p>
          </>
        );
      case 'Using props to pass data':
        return (
          <>
            <p>Group projects: {part.groupProjectCount}</p>
          </>
        );
      case 'Deeper type usage':
        return (
          <>
            <p>{part.description}</p>
            <p>Submission Link: <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a></p>
          </>
        );
      case 'What a course!':
        return (
          <>
            <p>{part.description}</p>
            <p>{part.teacher}</p>
          </>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <>
      <h2>{part.name}</h2>
      <p>Exercises: {part.exerciseCount}</p>
      {renderIndividualInfo()}
    </>
  );
};

export default Part;

import React from "react";

const Header = ({ courseName }) => <h2>{courseName}</h2>;

const Content = ({ parts }) => (
  <ul>
    {parts.map((part) => (
      <Part key={`part-${part.id}`} part={part} />
    ))}
  </ul>
);

const Part = ({ part }) => (
  <li>
    {part.name}, {part.exerciseAmount} exercices
  </li>
);

const Total = ({ parts }) => {
  const exerciseAmountTotal = parts.reduce(
    (acc, cur) => acc + cur.exerciseAmount,
    0
  );

  return (
    <p>
      <strong>Total number of exercises {exerciseAmountTotal}</strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;

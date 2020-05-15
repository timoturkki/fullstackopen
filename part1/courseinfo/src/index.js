import React from "react";
import ReactDOM from "react-dom";

const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Content = ({ parts }) => (
  <>
    {parts.map((part, i) => (
      <Part key={`part-${i}`} part={part} />
    ))}
  </>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exerciseAmount}
  </p>
);

const Total = ({ parts }) => {
  // calculate total number of exercices with using reduce on the array
  const exerciseAmountTotal = parts.reduce(
    (acc, cur) => acc + cur.exerciseAmount,
    0
  );

  return <p>Number of exercises {exerciseAmountTotal}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exerciseAmount: 10,
      },
      {
        name: "Using props to pass data",
        exerciseAmount: 7,
      },
      {
        name: "State of a component",
        exerciseAmount: 14,
      },
    ],
  };

  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

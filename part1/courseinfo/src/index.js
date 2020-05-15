import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => <h1>{course}</h1>;

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

const Total = ({ amount }) => <p>Number of exercises {amount}</p>;

const App = () => {
  const course = "Half Stack application development";
  // define course parts as an array of objects
  const courseParts = [
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
  ];
  // calculate total number of exercices with using reduce on the array
  const exerciseAmountTotal = courseParts.reduce(
    (acc, cur) => acc + cur.exerciseAmount,
    0
  );

  return (
    <>
      <Header course={course} />
      <Content parts={courseParts} />
      <Total amount={exerciseAmountTotal} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

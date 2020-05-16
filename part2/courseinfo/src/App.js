import React from "react";

import Course from "./components/Course";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exerciseAmount: 10,
          id: 1,
        },
        {
          name: "Using props",
          exerciseAmount: 7,
          id: 2,
        },
        {
          name: "Ccomponent state",
          exerciseAmount: 14,
          id: 3,
        },
        {
          name: "Redux state management",
          exerciseAmount: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exerciseAmount: 3,
          id: 1,
        },
        {
          name: "Middleware",
          exerciseAmount: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>All courses</h1>

      {courses.map((course) => (
        <Course key={`course-${course.id}`} course={course} />
      ))}
    </>
  );
};

export default App;

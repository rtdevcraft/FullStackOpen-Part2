import React from "react";

const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  );
};

const Course = ({ courses }) => (
  <div>
    <Header name={courses.name} />
    <Content parts={courses.parts} />
    <Total parts={courses.parts} />
  </div>
);

export default Course;

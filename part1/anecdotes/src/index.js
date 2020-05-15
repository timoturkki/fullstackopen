import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(0);
  // initialize points with zero to all anecdotes
  const [points, setPoints] = useState(
    [...Array(anecdotes.length)].map(() => 0)
  );

  const handleVoting = () => {
    // update the points after each vote
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);

    // once points are updated, set the new most voted anecdote
    const mostVotes = newPoints.indexOf(Math.max(...newPoints));
    setMostVoted(mostVotes);
  };

  const handleNextAnecdote = () => {
    // get random number between 0 and the amount of anecdotes
    const randomAnecdoteIndex = Math.floor(Math.random() * anecdotes.length);

    setSelected(randomAnecdoteIndex);
  };

  return (
    <>
      <h1>Random anecdote</h1>
      <p>{anecdotes[selected]}</p>
      <p>this one has {points[selected]} points</p>

      <Button handleClick={handleVoting} text="vote" />
      <Button handleClick={handleNextAnecdote} text="next anecdote" />

      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[mostVoted]}</p>
      <p>it has {points[mostVoted]} points</p>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));

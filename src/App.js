import React from "react";
import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {

  const [solution, setSolution] = useState(null)
  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(res => res.json())  // response needs to be passed from json into js object when fetch api is used
      .then(db => {  // another promise returned, async
        // generate random int bw 0 and 14 to get a word as soln
        const randSoln = db[Math.floor(Math.random() * db.length)]
        setSolution(randSoln.word)
      })
  }, [setSolution])

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution} />}
    </div >
  );
}

export default App;

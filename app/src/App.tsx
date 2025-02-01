import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  function handleClick() {
    setCounter(counter + 1);
  }

  return (
    <>
      <h1 className="text-red-600">Hello, world {counter} times</h1>
      <button onClick={handleClick}>Click</button>
      <button
        onClick={() => {
          setCounter(0);
        }}
      >
        Reset
      </button>
    </>
  );
}

export default App;

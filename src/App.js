import React, { useState, useReducer } from "react";
import "./App.css";

export default function App() {
  let nextId = 0;
  const [allColors, dispatch] = useReducer(colorsReducer, []);

  const colors = ["red", "green", "blue", "black", "orange"];
  const [btnColor, setBtnColor] = useState("");
  const randomNumberGenerator = () => {
    let i = Math.floor(Math.random() * colors.length);
    // ensure different number to ensure different color on each click
    if (btnColor === colors[i]) {
      return randomNumberGenerator();
    } else {
      return i;
    }
  };
  const handleBtnClick = () => {
    const randomNumber = randomNumberGenerator();
    btnColor === "blue"
      ? setBtnColor("green")
      : setBtnColor(colors[randomNumber]);
    dispatch({
      type: "added",
      id: nextId++,
      colorName: btnColor === "blue"
      ? "green"
      : colors[randomNumber],
    });
  };

  return (
    <div className="main">
      <button
        className="btn"
        onClick={() => handleBtnClick()}
        style={{ backgroundColor: btnColor, color: "white" }}
      >
        CLICK ME
      </button>
      <br />
      {allColors.map((colorObject) => (
        <span
          key={colorObject.id}
          className="displayColor"
          style={{ color: colorObject.colorName }}
        >
          {colorObject.colorName}<span>, </span>
          </span>
      ))}
    </div>
  );
}

function colorsReducer(allColors, action) {
  switch (action.type) {
    case "added": {
      return [
        ...allColors,
        {
          id: action.id,
          colorName: action.colorName,
        },
      ];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
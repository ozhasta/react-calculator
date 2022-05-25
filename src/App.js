import { useState } from "react"
import Tips from "./Tips"
import "./App.css"

function App() {
  const [currentScreen, setCurrentScreen] = useState("0")

  function handleClick(e) {
    setCurrentScreen((oldCurrentScreen) => {
      return oldCurrentScreen.concat(e.target.dataset.operator)
    })
  }

  return (
    <div className="App">
      <div className="calc-container">
        <div className="screen">
          <div id="previous-screen-container">
            <span id="previous-screen"></span>
            <span id="previous-screen-operand"></span>
          </div>
          <div id="current-screen">{currentScreen}</div>
        </div>
        <div onClick={handleClick} className="btn-container">
          <button className="calc-btn" id="btn-c" data-operator="Delete">
            C
          </button>
          <button className="calc-btn" id="btn-backspace" data-operator="Backspace">
            ←
          </button>
          <button className="calc-btn operation-buttons" id="btn-obelus" data-operator="÷">
            ÷
          </button>
          <button className="calc-btn" id="btn-7" data-operator="7">
            7
          </button>
          <button className="calc-btn" id="btn-8" data-operator="8">
            8
          </button>
          <button className="calc-btn" id="btn-9" data-operator="9">
            9
          </button>
          <button className="calc-btn operation-buttons" id="btn-times" data-operator="x">
            x
          </button>
          <button className="calc-btn" id="btn-4" data-operator="4">
            4
          </button>
          <button className="calc-btn" id="btn-5" data-operator="5">
            5
          </button>
          <button className="calc-btn" id="btn-6" data-operator="6">
            6
          </button>
          <button className="calc-btn operation-buttons" id="btn-minus" data-operator="-">
            -
          </button>
          <button className="calc-btn" id="btn-1" data-operator="1">
            1
          </button>
          <button className="calc-btn" id="btn-2" data-operator="2">
            2
          </button>
          <button className="calc-btn" id="btn-3" data-operator="3">
            3
          </button>
          <button className="calc-btn operation-buttons" id="btn-plus" data-operator="+">
            +
          </button>
          <button className="calc-btn" id="btn-comma" data-operator=".">
            .
          </button>
          <button className="calc-btn" id="btn-0" data-operator="0">
            0
          </button>
          <button className="calc-btn" id="btn-equals" data-operator="=">
            =
          </button>
        </div>
      </div>
      <Tips />
    </div>
  )
}

export default App

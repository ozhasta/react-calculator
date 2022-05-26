import { useReducer } from "react"
import Tips from "./Tips"
import Buttons from "./Buttons"
import "./App.css"

const defaultState = {
  currentInput: "0",
  previousInput: ""
}
function reducer(state, action) {
  action.type = action.type === "*" ? "x" : action.type
  action.type = action.type === "/" ? "÷" : action.type
  console.log(action.type)

  switch (action.type) {
    case "x":
      return { ...state, currentInput: "", previousInput: state.currentInput.concat(action.type) }

    case "÷":
      return { ...state, currentInput: "", previousInput: state.currentInput.concat(action.type) }

    case "-":
      return { ...state, currentInput: "", previousInput: state.currentInput.concat(action.type) }

    case "+":
      return { ...state, currentInput: "", previousInput: state.currentInput.concat(action.type) }

    case "Enter":
    case "=":
      break

    case "Escape":
    case "Delete":
      break

    case "Backspace":
      break

    case ".":
    case ",":
      break

    default:
      if (state.currentInput === "0") {
        return { ...state, currentInput: action.type }
      } else {
        return { ...state, currentInput: state.currentInput.concat(action.type) }
      }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  function handleClick(e) {
    e.preventDefault()
    if (e.target.dataset.input !== undefined) {
      dispatch({ type: e.target.dataset.input })
    }
  }

  return (
    <div className="App">
      <div className="calc-container">
        <div className="screen">
          <div id="previous-screen-container">
            <span id="previous-screen">{state.previousInput}</span>
            <span id="previous-screen-operand"></span>
          </div>
          <div id="current-screen">{state.currentInput}</div>
        </div>
        <Buttons handleClick={handleClick} />
      </div>
      <Tips />
    </div>
  )
}

export default App

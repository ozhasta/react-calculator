import { useReducer } from "react"
import Tips from "./Tips"
import Buttons from "./Buttons"

const defaultState = {
  currentInput: "0",
  previousInput: "",
  operation: ""
}
function reducer(state, action) {
  action.type = action.type === "*" ? "x" : action.type
  action.type = action.type === "/" ? "÷" : action.type

  switch (action.type) {
    case "x":
    case "÷":
    case "-":
    case "+":
      return {
        ...state,
        previousInput: state.currentInput + action.type,
        currentInput: "",
        operation: action.type
      }

    case "Enter":
    case "=":
      if (
        state.previousInput &&
        state.currentInput &&
        state.operation &&
        state.currentInput !== "."
      ) {
        const result = compute(state)
        return {
          ...state,
          currentInput: result,
          previousInput: ""
        }
      } else {
        return state
      }

    case "Escape":
    case "Delete":
      return defaultState

    case "Backspace":
      let tempResult = state.currentInput.substring(0, state.currentInput.length - 1)
      tempResult = state.currentInput.length > 1 ? tempResult : "0"
      return {
        ...state,
        currentInput: tempResult
      }

    case ".":
    case ",":
      if (!state.currentInput.includes(".")) {
        return {
          ...state,
          currentInput: (state.currentInput += state.currentInput ? "." : "0.")
        }
      } else {
        return state
      }

    default:
      if (state.currentInput === "0") {
        return { ...state, currentInput: action.type }
      } else {
        return { ...state, currentInput: state.currentInput.concat(action.type) }
      }
  }
}

function compute(state) {
  let result
  let num1 = parseFloat(state.previousInput)
  let num2 = parseFloat(state.currentInput)
  switch (state.operation) {
    case "+":
      result = num1 + num2
      break
    case "-":
      result = num1 - num2
      break
    case "x":
      result = num1 * num2
      break
    case "÷":
      result = num1 / num2
      break
  }
  result = parseFloat(result.toFixed(8))
  return result
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

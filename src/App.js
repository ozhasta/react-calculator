import { useReducer } from "react"
import Tips from "./Tips"
import Buttons from "./Buttons"

const defaultState = {
  currentInput: "0",
  previousInput: "",
  operation: "",
  invalidOperation: false
}

const invalidOperationState = {
  previousInput: "",
  currentInput: "Invalid operation",
  operation: "",
  invalidOperation: true
}

function reducer(state, action) {
  action.type = action.type === "*" ? "x" : action.type
  action.type = action.type === "/" ? "÷" : action.type

  // first and second numeric inputs are valid (previousInput/num1, currentInput/num2),
  // operation input chosen (+ - * /), ready for calculation
  const validForCalculation =
    (state.previousInput || state.previousInput === "0") &&
    (state.currentInput || state.currentInput === "0") &&
    state.operation

  // previous numeric input present, operation input chosen
  // ready for chaining operations based on previous result
  const validForChainOperation = state.previousInput && !state.currentInput && state.operation

  switch (action.type) {
    case "x":
    case "÷":
    case "-":
    case "+":
      if (validForCalculation) {
        const result = calculate(state)
        isNaN(result)
          ? invalidOperationState
          : {
              ...state,
              currentInput: "",
              operation: action.type,
              previousInput: result
            }
      }

      if (validForChainOperation) {
        return {
          ...state,
          operation: action.type
        }
      }
      return {
        ...state,
        previousInput: state.currentInput,
        currentInput: "",
        operation: action.type
      }
    // TODO: similiar operations
    case "Enter":
    case "=":
      if (validForCalculation) {
        const result = calculate(state)
        isNaN(result)
          ? invalidOperationState
          : {
              ...state,
              currentInput: result,
              operation: "",
              previousInput: ""
            }
      }
      return state

    case "Escape":
    case "Delete":
      return defaultState

    case "Backspace":
      let tempResult = state.currentInput.toString().substring(0, state.currentInput.length - 1)
      return {
        ...state,
        currentInput: state.currentInput.toString().length > 1 ? tempResult : "0"
      }

    case ".":
    case ",":
      if (state.currentInput.toString().includes(".")) {
        return state
      }
      return {
        ...state,
        currentInput: state.currentInput === "" ? "0." : state.currentInput.concat(".")
      }

    default:
      if (isNaN(state.currentInput) || state.currentInput.length >= 12) {
        return state
      }
      if (state.currentInput === "0") {
        return { ...state, currentInput: action.type }
      }
      return {
        ...state,
        currentInput: state.currentInput.toString().concat(action.type)
      }
  }
}
function calculate(state) {
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
    default:
      throw new Error("Invalid operation")
  }
  // decimal length
  result = parseFloat(result.toFixed(7))
  return result.toString()
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  function handleClick(e) {
    e.preventDefault()
    if (e.target.dataset.input !== undefined) {
      if (state.invalidOperation) {
        dispatch({ type: "Delete" })
      }
      dispatch({ type: e.target.dataset.input })
    }
  }

  return (
    <div className="App">
      <div className="calc-container">
        <div className="screen">
          <div id="previous-screen-container">
            <span id="previous-screen">{state.previousInput}</span>
            <span id="previous-screen-operand"> {state.operation}</span>
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

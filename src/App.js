import { useEffect, useReducer } from "react"
import Buttons from "./Buttons"
import Tips from "./Tips"

const defaultState = {
  currentInput: "0",
  previousInput: "",
  operation: "",
  invalidOperation: false
}

const invalidOperationState = {
  previousInput: "😊Invalid",
  currentInput: "operation",
  operation: "",
  invalidOperation: true
}

const inputFilterForKeyboard = ["Delete", "Enter", "Escape", "Backspace", ",", "/", "*", "-", "+"]

function digit(input) {
  if (input.toString().length === 1 && /^[\d]/.test(input)) return input
}

function reducer(state, action) {
  action.type = action.type === "*" ? "x" : action.type
  action.type = action.type === "/" ? "÷" : action.type
  action.type = action.type === "Enter" ? "=" : action.type

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
        return calculate(state, action)
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

    case "=":
      if (validForCalculation) return calculate(state, action)
      else return state

    case "Escape":
    case "Delete":
      return defaultState

    case "Backspace":
      if (state.operation === "=") return defaultState

      let tempResult = state.currentInput.toString().substring(0, state.currentInput.length - 1)
      return {
        ...state,
        currentInput: state.currentInput.toString().length > 1 ? tempResult : "0"
      }

    case ".":
    case ",":
      if (state.currentInput.toString().includes(".") || state.operation === "=") {
        return state
      }

      return {
        ...state,
        currentInput: state.currentInput === "" ? "0." : state.currentInput.concat(".")
      }

    // catching digits here: function evaluates 0-9 as a case clause if input contains 0-9
    case digit(action.type):
      if (state.invalidOperation || state.currentInput.length >= 12) {
        return state
      }
      if (state.operation === "=") {
        return { ...defaultState, currentInput: action.type }
      }
      if (state.currentInput === "0") {
        return { ...state, currentInput: action.type }
      }
      return {
        ...state,
        currentInput: state.currentInput.toString().concat(action.type)
      }
    default:
      return state
  }
}
function calculate(state, action) {
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
      return state
  }
  // decimal length
  result = parseFloat(result.toFixed(7)).toString()

  return isNaN(result)
    ? invalidOperationState
    : {
        ...state,
        currentInput: "",
        operation: action.type,
        previousInput: result
      }
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    document.addEventListener("keydown", handleInputs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // console.log("useEffect")
    return () => document.removeEventListener("keydown", handleInputs)
  }, [])

  function handleInputs(e) {
    const input = e.target.dataset.input || e.key
    const isNumericKeyCode = parseInt(e.key) >= 0 || parseInt(e.key) <= 9
    if (e.type === "keydown" && !isNumericKeyCode && !inputFilterForKeyboard.includes(input)) return
    if (e.type === "click" && input === undefined) return
    e.preventDefault()
    e.target.blur()
    return state.invalidOperation ? dispatch({ type: "Delete" }) : dispatch({ type: input })
  }

  const screenFontSize = {
    fontSize: state.currentInput.length > 9 || state.previousInput.length > 9 ? "1.6rem" : "2.2rem"
  }

  const determineFontSize = () => {
    let fontSize = "2.2rem"
    if (state.currentInput.length > 12 || state.previousInput.length > 12) fontSize = "2rem"
    if (state.currentInput.length > 14 || state.previousInput.length > 14) fontSize = "1.7rem"
    if (state.currentInput.length > 17 || state.previousInput.length > 17) fontSize = "1.3rem"
    return fontSize
  }

  // console.log("render")
  return (
    <div className="App">
      <div className="calc-container">
        <div className="screen" style={{ fontSize: determineFontSize() }}>
          <div id="previous-screen-container">
            <span id="previous-screen">{state.previousInput}</span>
            <span id="previous-screen-operand"> {state.operation}</span>
          </div>
          <div id="current-screen">{state.currentInput}</div>
        </div>
        <Buttons handleInputs={(e) => handleInputs(e)} />
      </div>
      <Tips />
    </div>
  )
}

export default App

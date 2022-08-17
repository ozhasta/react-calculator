import { useEffect, useReducer } from "react"
import Buttons from "./Buttons"
import Tips from "./Tips"

const defaultState = {
  currentInput: "0",
  previousInput: "",
  operation: "",
  invalidOperation: false,
}

const inputFilterForKeyboard = [
  "Delete",
  "Enter",
  "Escape",
  "Backspace",
  ",",
  ".",
  "/",
  "*",
  "-",
  "+",
]

function reducer(state, action) {
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
    case "*":
    case "/":
    case "-":
    case "+":
      if (validForCalculation) return calculate(state, action)
      if (validForChainOperation) {
        return {
          ...state,
          operation: action.type,
        }
      }
      return {
        ...state,
        previousInput: state.currentInput,
        currentInput: "",
        operation: action.type,
      }

    case "Enter":
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
        currentInput: state.currentInput.toString().length > 1 ? tempResult : "0",
      }

    case ".":
    case ",":
      if (state.currentInput.toString().includes(".") || state.operation === "=") return state

      return {
        ...state,
        currentInput: state.currentInput === "" ? "0." : state.currentInput.concat("."),
      }

    // catching digits here: function returns 0-9 as "case clause" if input contains 0-9
    case "digit":
      // max input length
      if (state.currentInput.length >= 12) return state

      // if (state.operation === "=") {
      //   return { ...defaultState, currentInput: action.payload }
      // }
      if (state.currentInput === "0") {
        return { ...state, currentInput: action.payload }
      }
      return {
        ...state,
        currentInput: state.currentInput.toString().concat(action.payload),
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
    ? {
        ...state,
        previousInput: "😊Invalid",
        currentInput: "operation",
        operation: "",
        invalidOperation: true,
      }
    : {
        ...state,
        currentInput: "",
        operation: action.type,
        previousInput: result,
      }
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardInputs)
    return () => document.removeEventListener("keydown", handleKeyboardInputs)
    // eslint-disable-next-line
  }, [])

  function handleKeyboardInputs(e) {
    console.log(e.key)
    if (e.key === undefined) return
    const isNumeric = parseInt(e.key) >= 0 || parseInt(e.key) <= 9
    if (!isNumeric && !inputFilterForKeyboard.includes(e.key)) return
    e.preventDefault()
    e.target.blur()
    return state.invalidOperation ? dispatch({ type: "Delete" }) : dispatch({ type: e.key })
  }

  const determineFontSize = () => {
    let fontSize = "2.2rem"
    if (state.currentInput.length > 12 || state.previousInput.length > 12) fontSize = "2rem"
    if (state.currentInput.length > 14 || state.previousInput.length > 14) fontSize = "1.7rem"
    if (state.currentInput.length > 17 || state.previousInput.length > 17) fontSize = "1.3rem"
    return fontSize
  }

  return (
    <div className="App">
      <div className="calc-container">
        <div className="screen" style={{ fontSize: determineFontSize() }}>
          <div id="previous-screen-container">
            <span id="previous-screen-digits">{state.previousInput}</span>
            <span id="previous-screen-operator"> {state.operation}</span>
          </div>
          <div id="current-screen">{state.currentInput}</div>
        </div>
        <Buttons dispatch={dispatch} />
      </div>
      <Tips />
    </div>
  )
}

export default App

export default function reducer(state, action) {
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
    case "-":
    case "+":
    case "*":
    case "/":
      if (validForCalculation) {
        console.log("valid for calc")
        return calculate(state, action)
      }
      if (validForChainOperation) {
        console.log("valid for chain")
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
      return {
        currentInput: "0",
        previousInput: "",
        operation: "",
        invalidOperation: false,
      }

    case "Backspace":
      let tempResult = state.currentInput.toString().substring(0, state.currentInput.length - 1)
      return {
        ...state,
        currentInput: state.currentInput.toString().length > 1 ? tempResult : "0",
      }

    case ".":
    case ",":
      if (state.currentInput.toString().includes(".")) return state

      return {
        ...state,
        currentInput: state.currentInput === "" ? "0." : state.currentInput.concat("."),
      }

    case "digit":
      // max input length
      if (state.currentInput.length >= 11) return state

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
    case "*":
      result = num1 * num2
      break
    case "/":
      result = num1 / num2
      break
    default:
      return state
  }
  // decimal length
  result = parseFloat(result.toFixed(6)).toString()

  if (isNaN(result)) {
    return {
      ...state,
      previousInput: "😊Invalid",
      currentInput: "operation",
      operation: "",
      invalidOperation: true,
    }
  }

  if (result.length > 16) {
    return {
      ...state,
      previousInput: "😊 Out of",
      currentInput: "range",
      operation: "",
      invalidOperation: true,
    }
  }

  return {
    ...state,
    currentInput: "",
    // operation: action.payload,
    previousInput: result,
  }
}

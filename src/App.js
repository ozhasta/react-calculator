import { useEffect, useReducer } from "react"
import Screen from "./Screen"
import Buttons from "./Buttons"
import Tips from "./Tips"
import reducer from "./utils/reducer"

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

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardInputs)
    return () => document.removeEventListener("keydown", handleKeyboardInputs)
    // eslint-disable-next-line
  }, [])

  function handleKeyboardInputs(e) {
    e.preventDefault()
    e.target.blur()

    const keyboardInput = e.key

    if (keyboardInput === undefined) return
    const isDigit = parseInt(keyboardInput) >= 0 || parseInt(keyboardInput) <= 9

    if (!isDigit && !inputFilterForKeyboard.includes(keyboardInput)) return

    if (state.invalidOperation) {
      return dispatch({ type: "Delete" })
    }

    if (isDigit) {
      return dispatch({ type: "digit", payload: keyboardInput })
    } else {
      return dispatch({ type: keyboardInput, payload: keyboardInput })
    }
  }

  return (
    <main className="app">
      <div className="calc-container">
        <Screen state={state} />
        <Buttons dispatch={dispatch} />
      </div>
      <Tips />
    </main>
  )
}

export default App

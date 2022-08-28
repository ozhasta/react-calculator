function determineOperatorSign(sign) {
  if (sign === "Enter") return null

  if (sign === "/") {
    return <span id="previous-screen-operator">÷</span>
  }

  if (sign === "*") {
    return <span id="previous-screen-operator">x</span>
  }
}

export default function Screen({ state }) {
  const previousScreenOperator = determineOperatorSign(state.operation)

  const determineFontSize = () => {
    let fontSize = "2.2rem"
    if (state.currentInput.length > 12 || state.previousInput.length > 12) fontSize = "2rem"
    if (state.currentInput.length > 14 || state.previousInput.length > 14) fontSize = "1.7rem"
    return fontSize
  }

  return (
    <div className="screen" style={{ fontSize: determineFontSize() }}>
      <div id="previous-screen-container">
        <span id="previous-screen-digits">{state.previousInput}</span>
        {previousScreenOperator}
      </div>
      <div id="current-screen">{state.currentInput}</div>
    </div>
  )
}

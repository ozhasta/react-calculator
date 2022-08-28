function determineOperatorSymbol(symbol) {
  if (symbol === "/") {
    return "÷"
  }

  if (symbol === "*") {
    return "x"
  }

  return symbol
}

export default function Screen({ state }) {
  const operatorSymbol = determineOperatorSymbol(state.operation)

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
        <span id="previous-screen-operator">{operatorSymbol}</span>
      </div>
      <div id="current-screen">{state.currentInput}</div>
    </div>
  )
}

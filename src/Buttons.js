import Button from "./Button"
export default function Buttons({ dispatch }) {
  return (
    <div className="btn-container">
      <Button dispatch={dispatch} type="Delete" renderAs="C" />
      <Button dispatch={dispatch} type="Backspace" renderAs="←" />
      <Button dispatch={dispatch} type="÷" />
      <Button dispatch={dispatch} dataInput="7" />
      <Button dispatch={dispatch} dataInput="8" />
      <Button dispatch={dispatch} dataInput="9" />
      <Button dispatch={dispatch} type="x" />
      <Button dispatch={dispatch} dataInput="4" />
      <Button dispatch={dispatch} dataInput="5" />
      <Button dispatch={dispatch} dataInput="6" />
      <Button dispatch={dispatch} type="-" />
      <Button dispatch={dispatch} dataInput="1" />
      <Button dispatch={dispatch} dataInput="2" />
      <Button dispatch={dispatch} dataInput="3" />
      <Button dispatch={dispatch} type="+" />
      <Button dispatch={dispatch} type="," renderAs="." />
      <Button dispatch={dispatch} dataInput="0" />
      <Button dispatch={dispatch} type="Enter" renderAs="=" />
    </div>
  )
}

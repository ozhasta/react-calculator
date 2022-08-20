export default function Buttons({ dispatch, type, dataInput, renderAs }) {
  return (
    <button onClick={() => dispatch({ type: type || "digit", payload: dataInput || type })}>
      {renderAs || dataInput || type}
    </button>
  )
}

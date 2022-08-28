export default function Button({ dispatch, type, dataInput, renderAs }) {
  return (
    <button onClick={() => dispatch({ type: type || "digit", payload: dataInput })}>
      {renderAs || dataInput || type}
    </button>
  )
}

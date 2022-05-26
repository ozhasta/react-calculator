export default function Buttons({ handleClick }) {
  return (
    <div onClick={handleClick} className="btn-container">
      <button className="calc-btn" id="btn-c" data-input="Delete">
        C
      </button>
      <button className="calc-btn" id="btn-backspace" data-input="Backspace">
        ←
      </button>
      <button className="calc-btn operation-buttons" id="btn-obelus" data-input="÷">
        ÷
      </button>
      <button className="calc-btn" id="btn-7" data-input="7">
        7
      </button>
      <button className="calc-btn" id="btn-8" data-input="8">
        8
      </button>
      <button className="calc-btn" id="btn-9" data-input="9">
        9
      </button>
      <button className="calc-btn operation-buttons" id="btn-times" data-input="x">
        x
      </button>
      <button className="calc-btn" id="btn-4" data-input="4">
        4
      </button>
      <button className="calc-btn" id="btn-5" data-input="5">
        5
      </button>
      <button className="calc-btn" id="btn-6" data-input="6">
        6
      </button>
      <button className="calc-btn operation-buttons" id="btn-minus" data-input="-">
        -
      </button>
      <button className="calc-btn" id="btn-1" data-input="1">
        1
      </button>
      <button className="calc-btn" id="btn-2" data-input="2">
        2
      </button>
      <button className="calc-btn" id="btn-3" data-input="3">
        3
      </button>
      <button className="calc-btn operation-buttons" id="btn-plus" data-input="+">
        +
      </button>
      <button className="calc-btn" id="btn-comma" data-input=".">
        .
      </button>
      <button className="calc-btn" id="btn-0" data-input="0">
        0
      </button>
      <button className="calc-btn" id="btn-equals" data-input="=">
        =
      </button>
    </div>
  )
}

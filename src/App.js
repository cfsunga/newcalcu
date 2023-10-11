import React, { useState } from 'react';
import './App.css';

function CalcLayout({ label, onClick, buttonClassName = "CalcButton" }) {
  return (
    <button className={buttonClassName} onClick={onClick}>
      {label}
    </button>
  );
}

function CalcDisplay({ display }) {
  return (
    <div className="CalcDisplay">
      {display}
    </div>
  );
}

export default function AppLayout() {
  const [disp, setDisp] = useState(0);
  const [num1, setNum1] = useState(null);
  const [oper, setOper] = useState(null);
  const [num2, setNum2] = useState(null);

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    var num = value;
    if (oper === null) {
      if (num1 !== null) {
        num = num1 + num;
      }
      setNum1(num);
      setDisp(num);
    } else {
      if (num2 !== null) {
        num = num2 + num;
      }
      setNum2(num);
      setDisp(num);
    }
  }

  const operatorClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setOper(value);
    setDisp(value);
  }

  const equalClickHandler = (e) => {
    e.preventDefault();

    if (num1 !== null && num2 !== null && oper !== null) {
      let CalcResult;

    if (oper === "+") {
      CalcResult = parseFloat(num1) + parseFloat(num2)
    } else if (oper === "-") {
      CalcResult = parseFloat(num1) - parseFloat(num2)
    } else if (oper === "*") {
      CalcResult = parseFloat(num1) * parseFloat(num2)
    } else if (oper === "/") {
      CalcResult = parseFloat(num1) / parseFloat(num2)
    } else if (oper === "^") {
      CalcResult = Math.pow(parseFloat(num1), parseFloat(num2));
    } else if (oper === "%") {
      CalcResult = parseFloat(num1) % parseFloat(num2);
    }
     else {
      setDisp("ERROR");
    }
    setDisp(CalcResult.toString());
    setNum1(CalcResult.toString());
    setOper(null);
    setNum2(null);
   }
  }

  const clearClickHandler = (e) => {
    e.preventDefault();

    setDisp(0);
    setNum1(null);
    setOper(null);
    setNum2(null);
  }

  const decimalClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (!disp.includes('.')) {
      setDisp(disp + value);
      if (oper === null) {
        setNum1(num1 === null ? value : num1 + value);
      } else {
        setNum2(num2 === null ? value : num2 + value);
      }
    }
  }

  const negateClickHandler = (e) => {
    e.preventDefault();
    setDisp((parseFloat(disp) * -1).toString());
    if (oper === null) {
      setNum1((parseFloat(num1) * -1).toString());
    } else {
      setNum2((parseFloat(num2) * -1).toString());
    }
  }

  return (
   
    <div className="AppLayout">
      <div className="CalcContainer">
        <h1>New Calculator Version 2</h1>
        <CalcDisplay display={disp} />
        <div className="button-row">
          <CalcLayout label={"^"} onClick={operatorClickHandler} />
          <CalcLayout label={"%"} onClick={operatorClickHandler} />
          <CalcLayout label={"±"} onClick={negateClickHandler} />
          <CalcLayout label={"/"} onClick={operatorClickHandler} />
          </div>
          <div className="button-row">
          <CalcLayout label={7} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"}/>
          <CalcLayout label={8} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"}/>
          <CalcLayout label={9} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"}/>
          <CalcLayout label={"*"} onClick={operatorClickHandler} />
          </div>
          <div className="button-row">
          <CalcLayout label={4} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"}/>
          <CalcLayout label={5} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"}/>
          <CalcLayout label={6} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"}/>
          <CalcLayout label={"+"} onClick={operatorClickHandler} />
          </div>
          <div className="button-row">
          <CalcLayout label={1} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"}/>
          <CalcLayout label={2} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"}/>
          <CalcLayout label={3} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"}/>
          <CalcLayout label={"-"} onClick={operatorClickHandler} />
          </div>
          <div className="button-row">
          <CalcLayout label={0} onClick={numberClickHandler} buttonClassName={"CalcButtonNum"}/>
          <CalcLayout label={"."} onClick={decimalClickHandler} />
          <CalcLayout label={"="} onClick={equalClickHandler} />
          </div>
          <div className="button-row">
          <CalcLayout label={"C"} onClick={clearClickHandler} />
          </div>

        </div>

      </div>
  );
}
import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePervious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }
  return (
    <div>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 && "active"}`}> 1</div>
            <div className={`${step >= 2 && "active"}`}> 2</div>
            <div className={`${step >= 3 && "active"}`}> 3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              disabled={step === 1}
              onClick={handlePervious}
              style={{
                backgroundColor: step === 1 ? "#cccccc" : "#7950f2",
                color: step === 1 ? "" : "#fff",
              }}
            >
              Pervious
            </button>
            <button
              disabled={step === 3}
              onClick={handleNext}
              style={{
                backgroundColor: step === 3 ? "#cccccc" : "#7950f2",
                color: step === 1 ? "" : "#fff",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import FirstExample from "@/components/ConditionalForm/FirstExample";
import MultipleDiscriminatedValue from "./components/ConditionalForm/MultipleDiscriminatedValues";
import { useState } from "react";
import SuperRefine from "./components/ConditionalForm/SuperRefine";

function App() {
  const [choice, setChoice] = useState(1);
  return (
    <div className="h-screen w-full bg-slate-100">
      <div>Example Choice</div>
      <ul>
        <li onClick={() => setChoice(1)}>1</li>
        <li onClick={() => setChoice(2)}>2</li>
        <li onClick={() => setChoice(3)}>3</li>
      </ul>
      <div className="flex items-center justify-center">
        {choice === 1 && <FirstExample />}
        {choice === 2 && <MultipleDiscriminatedValue />}
        {choice === 3 && <SuperRefine />}
      </div>
    </div>
  );
}

export default App;

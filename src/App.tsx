import MultipleDiscriminatedValue from "./components/ConditionalForm/MultipleDiscriminatedValues";
import SuperRefine from "./components/ConditionalForm/SuperRefine";
import FirstExample from "@/components/ConditionalForm/FirstExample";

function App() {
  return (
    <div className="h-screen w-full bg-slate-100">
      <div className="flex items-center justify-center">
        <FirstExample />
        {/* <MultipleDiscriminatedValue /> */}
        {/* <SuperRefine /> */}
      </div>
    </div>
  );
}

export default App;

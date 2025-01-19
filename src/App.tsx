import { useState } from "react";
import { examples } from "@/components/ConditionalForm/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function App() {
  const [choice, setChoice] = useState(1);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Conditional Form Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Select an Example:</h2>
            <div className="flex space-x-2">
              {examples.map((example) => (
                <Button
                  key={example.id}
                  variant={choice === example.id ? "default" : "outline"}
                  onClick={() => setChoice(example.id)}
                >
                  {example.title}
                </Button>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-inner">
            {examples.find((example) => example.id === choice)?.component}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

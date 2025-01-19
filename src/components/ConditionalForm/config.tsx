import FirstExample from "./FirstExample";
import MultipleDiscriminatedValue from "./MultipleDiscriminatedValues";
import SuperRefine from "./SuperRefine";

type Example = {
  id: number;
  title: string;
  component: JSX.Element;
};

export const examples: Example[] = [
  { id: 1, title: "First Example", component: <FirstExample /> },
  { id: 2, title: "Multiple Discriminated Values", component: <MultipleDiscriminatedValue /> },
  { id: 3, title: "Super Refine", component: <SuperRefine /> },
];

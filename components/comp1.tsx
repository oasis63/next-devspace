import { Comp1Props } from "./typings";

export default function Comp1({ name, greet }: Comp1Props) {
  return (
    <>
      <h1> {name} </h1>
      <h1> {greet} </h1>
    </>
  );
}

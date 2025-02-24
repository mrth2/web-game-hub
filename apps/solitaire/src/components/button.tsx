import { JSX } from "react";

type ButtonProps = JSX.IntrinsicElements['button'];
function Button(props: ButtonProps) {
  return <button className="cursor-pointer" {...props} />;
}

function GhostButton(props: ButtonProps) {
  return <button className="appearance-none cursor-pointer" {...props} />;
}

export default Button;
export { GhostButton };
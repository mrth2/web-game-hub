import { JSX } from "react";

type ButtonProps = JSX.IntrinsicElements['button'];
function Button(props: ButtonProps) {
  return <button {...props} />;
}

function GhostButton(props: ButtonProps) {
  return <button {...props} className="appearance-none cursor-pointer" />;
}

export default Button;
export { GhostButton };
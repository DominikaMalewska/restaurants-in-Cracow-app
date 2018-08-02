import React from "react";

const Button = props => {
  return (
  <button type="button" aria-label="Toggle Menu" onClick={props.toggleMenu} className="button" />
  )
};

export default Button;

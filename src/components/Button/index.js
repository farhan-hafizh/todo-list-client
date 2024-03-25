import React from 'react';

function Button({ onClick, text, className }) {
  return (
    <button
      type="button" // Set button type to avoid form submission by default
      onClick={onClick}
      className={`${className} text-white font-bold py-2 px-4 rounded`}
    >
      {text}
    </button>
  );
}

export default Button;

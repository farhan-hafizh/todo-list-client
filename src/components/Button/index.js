import React from 'react';

function Button({ onClick, text, className }) {
  return (
    <button
      type="button" 
      onClick={onClick}
      className={`${className && className} text-white font-bold py-2 px-4 rounded`}
    >
      {text}
    </button>
  );
}

export default Button;

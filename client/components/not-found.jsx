import React from 'react';

export default function NotFound(props) {
  return (
    <div className="menu-bar">
      <div className="z-index-5 text-align-center in-center">
        <h3 className="font-color-yellow">Sorry, that page doesn&apos;t exist. <br />Please try it again.</h3>
        <a href="#" className="font-color-yellow hover margin-top-1rem">Return Home</a>
      </div>
    </div>
  );
}

import React from 'react';

export default function NotFound(props) {
  return (
    <div className="not-found-background center">
      <div className="text-align-center">
        <h1>
          Sorry! <br/>We could not find the page you were looking for!
        </h1>
        <h3>
          <a href="#" className="font-color-orange">Return Home</a>
        </h3>
      </div>
    </div>
  );
}

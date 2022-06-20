import React from 'react';

export default function NotFound(props) {
  return (
    <div className="not-found-background">
        <h1 className="not-found-sorry text-align-center">
          Sorry!, we could not find the page you were looking for!
        </h1>
        <h3 className="margin-top-1rem text-align-center">
          <a href="#" className="font-color-orange">Return Home</a>
        </h3>
    </div>
  );
}

import React from 'react';

export const Loading = event => (
  <div className="menu-bar">
    <div className="z-index-5 text-align-center in-center">
      <div className="text-align-center">
       <h3 className="font-color-yellow">Loading</h3>
      </div>
      <div className="lds-ellipsis text-align-center">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

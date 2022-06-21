import React from 'react';

export const Loading = event => (
  <div className="loading-background">
    <div>
      <div className="text-align-center">
       <h1>loading</h1>
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

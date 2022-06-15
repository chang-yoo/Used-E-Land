import React from 'react';

export const Off = () => {
  return (
  <div className="offline-background">
    <div className="loading-center">
      <div className="text-align-center">
          <h1>Sorry,<br/> there was an error connecting to the network! <br/><hr></hr>Please check your internet connection and try again.
          </h1>
      </div>
    </div>
  </div>
  );
};

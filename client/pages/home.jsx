import React from 'react';
import List from '../components/list';

export default function Home(props) {
  return (
    <div className="list-background">
      <h1>Most Recent</h1>
      <div className="row">
        <List />
      </div>
    </div>
  );
}

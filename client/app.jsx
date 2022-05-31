import React from 'react';
import Home from './pages/home';
import Header from './components/navbar';
export default class App extends React.Component {
  render() {
    return (
    <div>
      <Header />
     <Home />;
    </div>
    );
  }
}

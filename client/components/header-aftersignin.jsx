import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      menu: 'off'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.menubar = this.menubar.bind(this);
    this.turnoffMenubar = this.turnoffMenubar.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.hash = 'search?keyword=' + this.state.userInput;
    this.setState({ userInput: '' });
    this.setState({ menu: 'off' });
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ userInput: value });
    this.setState({ menu: 'off' });
  }

  reset() {
    this.setState({ userInput: '' });
  }

  menubar() {
    const { menu } = this.state;
    if (menu === 'off') {
      return this.setState({ menu: 'on' });
    }
    return this.setState({ menu: 'off' });
  }

  turnoffMenubar() {
    this.setState({ menu: 'off' });
  }

  handleSignOut() {
    this.setState({ menu: 'off' });
    window.localStorage.removeItem('lfz-final');
  }

  render() {
    const { menu } = this.state;
    let classvalue = 'hidden';
    if (this.state.userInput.length > 0) {
      classvalue = '';
    }
    if (menu === 'on') {
      return (
        <div className="header">
          <div>
            <a onClick={this.turnoffMenubar} href="#">
              <img className="logo" src="/images/logo.png"></img>
            </a>
          </div>
          <div className="column-full margin-0">
            <div className="row">
              <form onSubmit={this.handleSubmit}>
                <label>
                  <input
                    id="keyword"
                    name="keyword"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.userInput}
                    className="search-bar"
                  />
                </label>
              </form>
              <div className="searching-icons">
                <a className={classvalue}><i onClick={this.reset} className="fa-solid fa-xmark searching-x"></i></a>
                <i onClick={this.handleSubmit} className="fa-solid fa-magnifying-glass search-glass"></i>
              </div>
              <div className="menu-bar slide-right">
                <div>
                  <i onClick={this.menubar} className="fa-solid fa-arrow-right-long fa-2x"></i>
                </div>
                <div className="menubar-container col-row space-around">
                  <div className="margin-left-3rem menu-myaccount-container">
                    <ul><h3>My Account</h3></ul>
                      <a href="#myprofile" onClick={this.turnoffMenubar}><li className="font-color">My Profile</li></a>
                      <a href="#sign-in" onClick={this.turnoffMenubar}><li className="font-color">My Favorite</li></a>
                      <a href="#sign-in" onClick={this.turnoffMenubar}><li className="font-color">My History</li></a>
                      <a href="#upload" onClick={this.turnoffMenubar}><li className="font-color">Upload Today</li></a>
                  </div>
                  <div className="margin-left-3rem sign-out">
                    <a href="#sign-in" className="font-color" onClick={this.handleSignOut}>Sign Out</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="header">
        <div>
          <a href="#">
            <img className="logo" src="/images/logo.png"></img>
          </a>
        </div>
        <div className="column-full margin-0">
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              <label>
                <input
                  id="keyword"
                  name="keyword"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.userInput}
                  className="search-bar"
                />
              </label>
            </form>
            <div className="searching-icons">
              <a className={classvalue}><i onClick={this.reset} className="fa-solid fa-xmark searching-x"></i></a>
              <i onClick={this.handleSubmit} className="fa-solid fa-magnifying-glass search-glass"></i>
            </div>
            <div className="menu-container">
              <i onClick={this.menubar} className="fa-solid fa-bars fa-2x menu-icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

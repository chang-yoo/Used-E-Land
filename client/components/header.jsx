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

  render() {
    const { menu } = this.state;
    let classvalue = 'hidden';
    let logoImage = 'favicon.ico';
    if (this.state.userInput.length > 0) {
      classvalue = '';
    }
    if (screen.width < 620) {
      logoImage = '/favicon.ico';
    } else {
      logoImage = '/images/logo.png';
    }
    if (menu === 'on') {
      return (
        <div className="header">
      <div>
        <a onClick={this.turnoffMenubar} href="#">
              <img className="logo" src={logoImage}></img>
        </a>
      </div>
      <div className="column-full margin-0">
        <div className="row">
              <form onSubmit={this.handleSubmit}>
                <div className="searching-container" id="keyword">
                  <input
                    id="keyword"
                    name="keyword"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.userInput}
                    className="search-bar"
                  />
                  <div className="searching-icons searching-position">
                    <div className={classvalue}>
                      <a><i onClick={this.reset} className="fa-solid fa-xmark searching-x"></i></a>
                    </div>
                    <div>
                      <i onClick={this.handleSubmit} className="fa-solid fa-magnifying-glass search-glass"></i>
                    </div>
                  </div>
                </div>
              </form>
          <div className="menu-bar transition">
            <div>
                <i onClick={this.menubar}className="fa-solid fa-arrow-right-long fa-2x"></i>
            </div>
              <div>
                  <a href="#sign-in" onClick={this.turnoffMenubar}><h4>Sign In</h4></a>
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
            <img className="logo" src={logoImage}></img>
          </a>
        </div>
        <div className="column-full margin-0">
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              <div className="searching-container" id="keyword">
                <input
                  id="keyword"
                  name="keyword"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.userInput}
                  className="search-bar"
                />
                <div className="searching-icons searching-position">
                  <div className={classvalue}>
                    <a><i onClick={this.reset} className="fa-solid fa-xmark searching-x"></i></a>
                  </div>
                  <div>
                    <i onClick={this.handleSubmit} className="fa-solid fa-magnifying-glass search-glass"></i>
                  </div>
                </div>
              </div>
            </form>
            <a href="#favorite"><i className="fa-solid fa-heart fa-2x favorite-page"></i></a>
            <div className="menu-container">
                <i onClick={this.menubar} className="fa-solid fa-bars fa-2x menu-icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

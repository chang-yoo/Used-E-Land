import React from 'react';
import jwtDecode from 'jwt-decode';
import CategoryIcon from '../components/category-icon';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      menu: 'off',
      userId: null,
      screen: screen.width
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.menubar = this.menubar.bind(this);
    this.turnoffMenubar = this.turnoffMenubar.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('lfz-final');
    const decode = jwtDecode(token);
    const getUserId = decode.userId;
    this.setState({ userId: getUserId });
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.hash = 'search?keyword=' + this.state.userInput;
    this.setState({
      userInput: '',
      menu: 'off'
    });
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
    const { menu, userId, screen } = this.state;
    let classvalue = 'hidden';
    if (this.state.userInput.length > 0) {
      classvalue = '';
    }
    if (menu === 'on' && screen <= 600) {
      return (
        <div className="header row column-full">
          <CategoryIcon />
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
                    placeholder="Search for anything"
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
              <div className="menu-bar">
                <div className="row center">
                  <div className="menubar-container">
                    <ul className="menu-text"><h3>My Account</h3>
                      <a href="#myprofile" onClick={this.turnoffMenubar}><li className="menu-text">My Page</li></a>
                      <a href={`#history?userId=${userId}`} onClick={this.turnoffMenubar}><li className="menu-text">Sold</li></a>
                      <a href={`#review?userId=${userId}`} onClick={this.turnoffMenubar}><li className="menu-text">Feedback</li></a>
                      <a href="#upload" onClick={this.turnoffMenubar}><li className="menu-text">Sell Now</li></a>
                      <div className="sign-out">
                        <a href="#sign-in" className="menu-text" onClick={this.handleSignOut}>Sign Out</a>
                      </div>
                      <i onClick={this.menubar} className="fa-solid fa-xmark menu-text fa-2x margin-top-1rem"></i>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (menu === 'off' && screen <= 600) {
      return (
        <div className="header header-height">
          <div>
            <CategoryIcon />
          </div>
          <div className="column-full margin-0">
            <div className="row">
              <form onSubmit={this.handleSubmit}>
                <div className="searching-container">
                  <input
                    id="keyword"
                    name="keyword"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.userInput}
                    className="search-bar"
                    placeholder="Search for anything"
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
              <div className="row header-icons">
                <div>
                  <a href="#favorite"><i className="fa-solid fa-heart fa-2x favorite-page"></i></a>
                </div>
                <div>
                  <i onClick={this.menubar} className="fa-solid fa-bars fa-2x menu-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (menu === 'on' && screen > 600) {
      return (
        <div className="header row column-full">
          <a href="#">
            <img className="logo" src='/images/logo.png'></img>
          </a>
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
                    placeholder="Search for anything"
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
              <div className="menu-bar">
                <div className="row center">
                  <div className="menubar-container">
                      <ul className="menu-text"><h3>My Account</h3>
                        <a href="#myprofile" onClick={this.turnoffMenubar}><li className="menu-text">My Page</li></a>
                        <a href={`#history?userId=${userId}`} onClick={this.turnoffMenubar}><li className="menu-text">Sold</li></a>
                        <a href={`#review?userId=${userId}`} onClick={this.turnoffMenubar}><li className="menu-text">Feedback</li></a>
                        <a href="#upload" onClick={this.turnoffMenubar}><li className="menu-text">Sell Now</li></a>
                    <div className="sign-out">
                      <a href="#sign-in" className="menu-text" onClick={this.handleSignOut}>Sign Out</a>
                    </div>
                      <i onClick={this.menubar} className="fa-solid fa-xmark menu-text fa-2x margin-top-1rem"></i>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="header header-height">
        <div>
          <a href="#">
            <img className="logo" src='/images/logo.png'></img>
          </a>
        </div>
        <div className="column-full margin-0">
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              <div className="searching-container">
                <input
                  id="keyword"
                  name="keyword"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.userInput}
                  className="search-bar"
                  placeholder="Search for anything"
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
            <div className="row header-icons">
              <div>
                <a href="#favorite"><i className="fa-solid fa-heart fa-2x favorite-page"></i></a>
              </div>
              <div>
                <i onClick={this.menubar} className="fa-solid fa-bars fa-2x menu-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

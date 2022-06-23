import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      screen: screen.width
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.hash = 'search?keyword=' + this.state.userInput;
    this.setState({ userInput: '' });
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ userInput: value });
  }

  reset() {
    this.setState({ userInput: '' });
  }

  render() {
    const { screen } = this.state;
    let classvalue = 'hidden';
    let logoImage = 'favicon.ico';
    if (this.state.userInput.length > 0) {
      classvalue = '';
    }
    if (screen < 620) {
      logoImage = 'favicon.ico';
    } else {
      logoImage = '/images/logo.png';
    }
    return (
      <div className="header row">
        <div>
          <a href="#">
            <img className="logo" src={logoImage}></img>
          </a>
        </div>
        <div className="column-full margin-0">
          <div className="row space-around">
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
            <div className="header-column">
            <div className='row text-align-right header-buttons'>
              <div className="column-half margin-right-1rem">
                <a href="#sign-in"><button className="header-sign-up">Sign In</button></a>
              </div>
              <div className="column-half">
                <a href="#sign-up"><button className="header-sign-in">Register</button></a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

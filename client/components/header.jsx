import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
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
    let classvalue = 'hidden';
    if (this.state.userInput.length > 0) {
      classvalue = '';
    }
    return (
    <div className="header">
      <div>
        <a href="#">
          <img className="logo" src="/images/logo.png"></img>
        </a>
      </div>
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
          <a className={classvalue}><i onClick={this.reset} className="fa-solid fa-xmark"></i></a>
          <i onClick={this.handleSubmit} className="fa-solid fa-magnifying-glass search-glass"></i>
        </div>
      </div>
    </div>
    );
  }
}

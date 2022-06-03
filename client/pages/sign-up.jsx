import React from 'react';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      box: 'off',
      error: 'off'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.closeBox = this.closeBox.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/sign-up', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          this.setState({ error: 'on' });
        } else {
          this.setState({ box: 'on' });
        }
      });
  }

  reset() {
    this.setState({
      username: '',
      password: ''
    });
  }

  closeBox() {
    this.setState({ error: 'off' });
  }

  render() {
    let confirm = 'hidden';
    let err = 'hidden';
    if (this.state.box === 'on') {
      confirm = '';
    }
    if (this.state.error === 'on') {
      err = '';
    }
    return (
     <div className="list-background">
        <div>
          <h1>Sign Up</h1>
        </div>
      <div className="full-column">
        <div className="row center">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                <h2>
                  Username
                </h2>
              </label>
              <input
                required
                id="username"
                type="text"
                name="username"
                onChange={this.handleChange}
                className="username"
              />
            </div>
            <div>
              <label>
                <h2>
                  Password
                </h2>
              </label>
              <input
                required
                id="password"
                type="password"
                name="password"
                onChange={this.handleChange}
                className="password"
              />
            </div>
            <div className="row space-between">
              <div>
                <p className="sigin-in-no-account">
                  Already have an account?
                </p>
                <a href="#sign-in" className="sigin-in-no-account">
                  Sign In
                </a>
              </div>
                <div className="margin-top-1rem">
                <button type="submit" className="sign-in-button">
                  <p onClick={this.reset} className="create-account-text">Create!</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={confirm}>
      <div className="column-full">
        <div className="row signup-box-container">
          <div className="sign-up-confirmbox">
            <h2>Thank you for signing up!</h2>
              <p>Click <a href="#sign-in"><span>HERE</span></a> to sign in</p>
          </div>
        </div>
      </div>
      </div>
      <div className={err}>
      <div className="column-full">
        <div className="row signup-box-container">
          <div className="sign-up-confirmbox">
            <h2>Sorry! The username already exists.</h2>
            <h2>Please try different username!</h2>
              <p>Click <a href="#sign-up"><span onClick={this.closeBox}>HERE</span></a> to try again</p>
          </div>
        </div>
      </div>
      </div>
    </div>
    );
  }
}

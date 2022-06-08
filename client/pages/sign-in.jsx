import React from 'react';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      classvalue: 'hide'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideBox = this.hideBox.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/sign-in', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        const { error } = result;
        if (!error) {
          const { token, user } = result;
          window.localStorage.setItem('lfz-final', token);
          const { userId } = user;
          window.location.hash = 'myprofile?userId=' + userId;
        } else {
          this.setState({ classvalue: '' });
        }
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  hideBox() {
    this.setState({ classvalue: 'hide' });
  }

  render() {
    const { classvalue } = this.state;
    return (
    <div className="list-background">
      <div>
        <h1>Sign In</h1>
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
                  <p className="sign-in-no-account">
                    Don&apos;t have account yet? Don&apos;t worry!
                  </p>
                  <a href="#sign-up" className="sign-in-no-account">
                    Sign Up
                  </a>
                </div>
                <div className="margin-top-1rem">
                  <button type="submit" className="sign-in-button create-account-text">
                    Sign In!
                  </button>
                </div>
              </div>
            </form>
        </div>
      </div>
      <div className={classvalue}>
        <div className="column-full">
          <div className="row signup-box-container">
              <i onClick={this.hideBox} className="fa-regular fa-circle-xmark log-in-x"></i>
            <div className="sign-up-confirmbox">
              <h2>You have entered incorret username/password</h2>
              <p className="font-size-20">No account? Click <a href="#sign-up"><span>HERE</span></a> to sign up!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

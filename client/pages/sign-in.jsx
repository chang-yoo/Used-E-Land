import React from 'react';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
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
                  <button className="sign-in-button create-account-text">
                    Sign In!
                  </button>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
    );
  }
}

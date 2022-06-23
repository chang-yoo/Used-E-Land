import React from 'react';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      classvalue: 'hide',
      loading: 'processing',
      offline: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideBox = this.hideBox.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
    this.setState({ username: 'test', password: 'test', loading: 'complete' });
  }

  handleDemo(event) {
    this.setState({ username: 'test', password: 'test' });
    event.preventDefault();
    fetch('/api/sign-in', {
      method: 'POST',
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

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/sign-in', {
      method: 'POST',
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
    const { classvalue, loading, offline } = this.state;
    if (loading === 'processing') {
      return <Loading />;
    }
    if (offline === true) {
      return <Off />;
    }
    return (
    <div className="list-background">
        <div className="full-column text-align-center">
          <div>
            <h1>Sign In to Continue</h1>
          </div>
          <div className="row center">
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                required
                id="username"
                type="text"
                name="username"
                onChange={this.handleChange}
                className="username"
                placeholder="Username*"
                />
              </div>
              <div className="margin-top-1rem">
                <input
                required
                id="password"
                type="password"
                name="password"
                onChange={this.handleChange}
                className="password"
                placeholder="Password*"
                />
              </div>
              <div>
                <p className="text-align-right">Forgot Password? - Not Available Yet</p>
              </div>
              <div className="margin-top-1rem margin-bottom-3rem">
                <button type="submit" className="sign-in-button create-account-text">
                  Sign In
                </button>
              </div>
              <hr/>
              <div className="margin-top-3rem">
                <button onClick={e => { window.location.hash = '#sign-up'; }} className="sign-in-no-account">
                  <a href="#sign-up" className="font-color-yellow">
                    Sign Up
                  </a>
                </button>
              </div>
            <div className="margin-top-1rem">
              <button onClick={this.handleDemo} className="demo-button">Continue as Test Account</button>
            </div>
            </form>
        </div>
      </div>
      <div className={classvalue}>
        <div className="menu-bar">
          <div className="z-index-5 text-align-center in-center">
            <h2 className="font-color-yellow">You have entered incorret username/password</h2>
            <p className="font-color-yellow margin-top-1rem">No Account? Click <a href="#sign-up"><span>HERE</span></a> to Sign Up</p>
            <h4 onClick={this.hideBox} className="font-color-yellow hover">Try Again</h4>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

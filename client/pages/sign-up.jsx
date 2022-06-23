import React from 'react';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      phone: null,
      email: '',
      box: 'off',
      error: 'off',
      loading: 'processing',
      phoneWrong: 'no'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeBox = this.closeBox.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
    this.setState({ loading: 'complete' });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { phone } = this.state;
    if (isNaN(phone)) {
      return this.setState({ phoneWrong: 'yes' });
    }
    fetch('/api/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        const { error } = result;
        if (error) {
          this.setState({ error: 'on' });
        } else {
          this.setState({ box: 'on' });
        }
      });
  }

  closeBox() {
    this.setState({ error: 'off' });
  }

  handleDelete() {
    this.setState({ phoneWrong: 'no' });
  }

  render() {
    const { phoneWrong } = this.state;
    let confirm = 'hidden';
    let err = 'hidden';
    let wrong = 'hidden';
    if (this.state.box === 'on') {
      confirm = '';
    }
    if (phoneWrong === 'yes') {
      wrong = '';
    }
    if (this.state.error === 'on') {
      err = '';
    }
    if (this.state.loading === 'processing') {
      return <Loading />;
    }
    if (this.state.offline === true) {
      return <Off />;
    }
    return (
      <div className="list-background">
        <div className="full-column text-align-center">
          <div>
            <h1 className="margin-bottom-0">Become a Usey</h1>
            <h5 className="none font-color-grey">Enter few details to join the community</h5>
          </div>
          <div className={wrong}>
           <div className="menu-bar">
          <div className="z-index-5 text-align-center in-center">
            <h2 className="font-color-yellow">Check your inputs again. <br/>Phone field should only contain NUMBERS</h2>
            <h4 onClick={this.handleDelete} className="font-color-yellow hover margin-top-1rem">Try Again</h4>
          </div>
        </div>
          </div>
          <div className="row center">
            <div className="width-60 auto">
              <div className="row center">
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <div>
                      <h3 className="text-align-left margin-top-3rem">Create Your Account</h3>
                    </div>
                    <div>
                      <input
                        required
                        id="username"
                        type="text"
                        name="username"
                        onChange={this.handleChange}
                        className="username"
                        placeholder="Username"
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
                        placeholder="Password"
                      />
                    </div>
                    <div>
                      <h3 className="text-align-left margin-top-3rem">Your Detail</h3>
                    </div>
                    <div className="margin-top-1rem">
                      <input
                        required
                        id="phone"
                        type="tel"
                        name="phone"
                        onChange={this.handleChange}
                        className="phone"
                        placeholder="Phone - Numbers Only (No Dash, No Space)"
                      />
                    </div>
                    <div className="margin-top-1rem">
                      <input
                        required
                        id="email"
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                        className="email"
                        placeholder="E-mail"
                      />
                    </div>
                    <div className="margin-top-1rem text-align-right">
                      <button type="submit" className="sign-in-button">
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className={confirm}>
            <div className="column-full">
              <div className="menu-bar">
                <div className="z-index-5 text-align-center in-center">
                  <h2 className="font-color-yellow">Thank you for being a valuable Usey</h2>
                  <h4 onClick={this.hideBox} className="font-color-yellow hover">Click <a href="#sign-in"><span>HERE</span></a> to Sign In</h4>
                </div>
              </div>
            </div>
          </div>
          <div className={err}>
            <div className="column-full">
              <div className="menu-bar">
                <div className="z-index-5 text-align-center in-center">
                  <h2 className="font-color-yellow">Username already exists. <br/> Please try different one</h2>
                  <h4 onClick={this.handleDelete} className="font-color-yellow hover">Try Again</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

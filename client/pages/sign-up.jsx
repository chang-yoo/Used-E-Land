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
        <div>
          <h1>Sign Up</h1>
        </div>
        <div className={wrong}>
          <div className="confirm-delete-box delete-box-height">
            <div className="margin-top-3rem">
              <div className="text-center">
                <h3 className="delete-top-margin">Phone inputs must be numbers only</h3>
              </div>
              <div className="row space-around margin-top-5rem">
                <button onClick={this.handleDelete} className="delete-confirm-button">Okay</button>
              </div>
            </div>
          </div>
        </div>
        <div className="full-column">
          <div className="width-60 auto">
            <div className="row center">
              <form onSubmit={this.handleSubmit}>
                <div className="rows space-between margin-vert-2rem">
                  <div className="margin-vert-2rem">
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
                    <p className="sign-in-no-account">
                      Already have an account?
                    </p>
                    <a href="#sign-in" className="sign-in-no-account">
                      Sign In
                    </a>
                  </div>
                  <div className="margin-vert-2rem">
                    <div>
                      <label>
                        <h2>
                          Phone
                        </h2>
                      </label>
                      <input
                        required
                        id="phone"
                        type="tel"
                        name="phone"
                        onChange={this.handleChange}
                        className="phone"
                        placeholder="no space or dash between numbers!"
                      />
                      <label>
                        <h2>
                          E-mail
                        </h2>
                      </label>
                      <input
                        required
                        id="email"
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                        className="email"
                      />
                    </div>
                    <div className="margin-top-1rem text-align-right">
                      <button type="submit" className="sign-in-button">
                        <p className="create-account-text">Create!</p>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={confirm}>
          <div className="column-full">
            <div className="row signup-box-container  sign-box-vertical">
              <div className="sign-up-confirmbox  sign-box-height">
                <h2>Thank you for being a valuable UsedElander!</h2>
                <p className="font-size-20">Click <a href="#sign-in"><span>HERE</span></a> to sign in</p>
              </div>
            </div>
          </div>
        </div>
        <div className={err}>
          <div className="column-full">
            <div className="row signup-box-container sign-box-vertical">
              <div className="sign-up-confirmbox sign-box-height">
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

import React from 'react';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.postData,
      status: 'off'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { status } = this.state;
    const token = window.localStorage.getItem('lfz-final');
    if (!token) {
      window.location.hash = '#sign-in';
      return;
    }
    if (status === 'on') {
      this.setState({ status: 'off' });
    } else {
      this.setState({ status: 'on' });
    }
  }

  render() {
    const { data, status } = this.state;
    let classvalue = 'hidden';
    if (status === 'off') {
      classvalue = 'hidden';
    } else {
      classvalue = 'contact-background';
    }
    return (
      <div>
        <div>
          <i onClick={this.handleClick} className="fa-solid fa-address-book fa-2x"></i>
        </div>
        <div className={classvalue}>
          <div className="contact-text">
            <div className="margin-bottom-1rem">
              <i className="fa-solid fa-user"></i>{data.username}
            </div>
            <div className="contact-info margin-bottom-1rem">
              <i className="fa-solid fa-mobile-screen"></i>: {data.phone} <br />
              <i className="fa-solid fa-envelope"></i>: {data.email}
            </div>
            <button className="contact-button" onClick={this.handleClick}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

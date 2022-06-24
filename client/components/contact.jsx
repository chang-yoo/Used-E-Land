import React from 'react';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { status } = this.state;
    let classvalue = 'hidden';
    if (status === 'off') {
      classvalue = 'hidden';
    } else {
      classvalue = 'contact-background';
    }
    return (
        <div className="contact-position">
          <button className="open-contact-button" onClick={this.handleClick}>Contact Now</button>
        <div className={classvalue}>
          <div className="contact-text">
            <div className="margin-bottom-1rem">
              <i className="fa-solid fa-user"></i>{this.props.postData.username}
            </div>
            <div className="contact-info ">
              <a href={'tel:' + this.props.postData.phone}><i className="fa-solid fa-mobile-screen"></i>: {this.props.postData.phone}</a> <br />
              <a href={'mailto:' + this.props.postData.email}><i className="fa-solid fa-envelope"></i>: {this.props.postData.email}</a>
            </div>
          </div>
          <button className="contact-button" onClick={this.handleClick}>Close</button>
        </div>
      </div>
    );
  }
}

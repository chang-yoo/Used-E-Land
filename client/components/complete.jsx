import React from 'react';

export default class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.postData.status
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const token = window.localStorage.getItem('lfz-final');
    const { status } = this.state;
    if (status === 'open') {
      fetch(`api/complete/${this.props.postData.postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
        .then(res => res.json())
        .then(result => {
        // console.log(result)
        });
    }
  }

  render() {
    const { status } = this.state;
    if (status === 'open') {
      return (
        <i onClick={this.handleClick} className="fa-solid fa-sack-dollar fa-xl"></i>
      );
    }
  }
}

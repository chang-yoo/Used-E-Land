import React from 'react';

export default class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.postData.status,
      clicked: 'no'
    };
    this.handleMoving = this.handleMoving.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMoving(event) {
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
          const data = result[0].status;
          this.setState({ status: data });
        });
    }
  }

  handleClick(event) {
    const { clicked } = this.state;
    if (clicked === 'yes') {
      this.setState({ clicked: 'no' });
    } else {
      this.setState({ clicked: 'yes' });
    }
  }

  render() {
    const { clicked } = this.state;
    let classvalue = 'hidden';
    if (clicked === 'yes') {
      classvalue = 'confirm-move-box';
    }
    if (clicked === 'no') {
      return (
        <i onClick={this.handleClick} className="fa-solid fa-sack-dollar fa-xl"></i>
      );
    }
    if (clicked === 'yes') {
      return (
        <div className={classvalue}>
          <div className="move-text">
            <h2 className="auto move-warning">Once moved, <span className="font-red">CANNOT</span> undo</h2>
          </div>
          <div className="margin-top-3rem">
            <div className="text-center">
              <h3>Are you sure want to move this item?</h3>
            </div>
            <div className="row space-around margin-top-5rem">
              <button onClick={this.handleMoving} className="delete-confirm-button">Confirm</button>
              <button onClick={this.handleClick} className="delete-cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      );
    }
  }
}

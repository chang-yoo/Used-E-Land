import React from 'react';

export default class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.postData.status,
      clicked: 'no'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
          const data = result[0].status;
          this.setState({ status: data });
        });
    }
  }

  handleCancel(event) {
    const token = window.localStorage.getItem('lfz-final');
    const { status } = this.state;
    if (status === 'closed') {
      fetch(`api/complete/${this.props.postData.postId}`, {
        method: 'PUT',
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

  render() {
    const { status, clicked } = this.state;
    let classvalue = '';
    if (clicked === 'no') {
      classvalue = '';
    }
    if (status === 'open') {
      return (
        <i onClick={this.handleClick} className="fa-solid fa-sack-dollar fa-xl"></i>
      );
    }
    if (status === 'closed') {
      return (
        <div className={classvalue}>
          <div className="confirm-move-box">
            <div className="move-text"><h2 className="auto move-warning">Once moved, <span className="font-red">CANNOT</span> undo</h2></div>
            <div className="margin-top-3rem">
              <div className="text-center">
                <h3>Are you sure want to move this item?</h3>
              </div>
              <div className="row space-around margin-top-5rem">
                <button onClick={this.handleMove} className="delete-confirm-button">Confirm</button>
                <button onClick={this.handleCancel} className="delete-cancel-button">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

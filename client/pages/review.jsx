import React from 'react';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      submit: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  componentDidMount() {
    const token = window.localStorage.getItem('lfz-final');
    if (!token) {
      window.location.hash = '#sign-in';
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const token = window.localStorage.getItem('lfz-final');
    fetch(`/api/review/${this.props.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ submit: 'yes' });
      });
  }

  render() {
    return (
      <div className="text-align-center">
        <form onSubmit={this.handleSubmit}>
          <label>Write a review!</label>
          <input
            required
            id="text"
            type="text"
            name="text"
            onChange={this.handleChange}
            className="text"
          />
          <button type="submit">Enter</button>
        </form>
      </div>
    );
  }
}

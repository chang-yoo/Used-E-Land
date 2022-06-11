import React from 'react';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      reviews: [],
      check: []
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
    fetch(`/api/review/${this.props.userId}`)
      .then(res => res.json())
      .then(result => {
        this.setState({ reviews: result });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.check !== this.state.check) {
      fetch(`/api/review/${this.props.userId}`)
        .then(res => res.json())
        .then(result => {
          this.setState({ reviews: result });
        });
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
        this.setState({ check: result });
      });
  }

  render() {
    const { reviews } = this.state;
    if (reviews.length === 0) {
      return (
      <div className="detail-background">
        <form onSubmit={this.handleSubmit}>
          <div className="row center top-padding-1rem">
            <label>Write a review!</label>
            <input
              required
              id="text"
              type="text"
              name="text"
              onChange={this.handleChange}
              className="text"
            />
            <button className="review-button" type="submit">Enter</button>
          </div>
        </form>
      </div>
      );
    }
    return (
      <div className="detail-background">
        <form onSubmit={this.handleSubmit}>
          <div className="row center top-padding-1rem">
            <label>Write a review!</label>
            <input
              required
              id="text"
              type="text"
              name="text"
              onChange={this.handleChange}
              className="text"
            />
            <button className="review-button" type="submit">Enter</button>
          </div>
        </form>
        <div>
          {reviews.map(eachReview => {
            return (
              <div key={eachReview.reviewId} className="review-background">
                <div className="review-container">
                  <div className="row review-user-container">
                    <i className="fa-solid fa-user review-user"></i><p>{eachReview.username}</p>
                  </div>
                  <div className="review-text-container">
                    <p>{eachReview.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

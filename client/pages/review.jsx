import React from 'react';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';
import { TryAgain } from '../components/try-again';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      reviews: [],
      check: [],
      loading: 'processing',
      offline: false,
      noId: 'no'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  componentDidMount() {
    if (!`${this.props.userId}` || Number(`${this.props.userId}`) === 0) {
      this.setState({
        loading: 'complete',
        noId: 'yes'
      });
    }
    window.addEventListener('offline', event => this.setState({ offline: true }));
    fetch(`/api/review/${this.props.userId}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          reviews: result,
          loading: 'complete'
        });
        const { error } = result;
        if (error) {
          this.setState({
            loading: 'complete',
            noId: 'yes'
          });
        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.noId === this.state.noId || prevState.check !== this.state.check) {
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
    if (!token) {
      window.location.hash = '#sign-in';
    }
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
        const { error } = result;
        if (error) {

          this.setState({
            loading: 'complete',
            noId: 'yes'
          });
        }
      });
  }

  render() {
    const { reviews, offline, loading } = this.state;
    if (offline === true) {
      return <Off />;
    }
    if (loading === 'processing') {
      return <Loading />;
    }
    if (reviews.length === 0) {
      return (
      <div className="detail-background">
        <form onSubmit={this.handleSubmit}>
          <div className="auto text-align-center column-40-for-upload">
            <h3>Write a Review</h3>
            <div className="row justify-center">
              <input
                required
                id="text"
                type="text"
                name="text"
                onChange={this.handleChange}
                className="text"
              />
              <button className="review-submit-button" type="submit">Enter</button>
            </div>
            <h3>0 review</h3>
          </div>
        </form>
      </div>
      );
    }
    if (reviews.length > 0 && loading === 'complete') {
      return (
      <div className="detail-background">
        <form onSubmit={this.handleSubmit}>
            <div className="auto text-align-center column-40-for-upload">
              <h3>Write a Review</h3>
              <div className="row justify-center">
                <input
                  required
                  id="text"
                  type="text"
                  name="text"
                  onChange={this.handleChange}
                  className="text"
                />
                <button className="review-submit-button" type="submit">Enter</button>
              </div>
          </div>
        </form>
        <div>
          {reviews.map(eachReview => {
            return (
              <div key={eachReview.reviewId} className="review-background">
                <div className="auto text-align-center column-40-for-upload">
                  <div className="review-container">
                    <div className="row review-user-container">
                      <i className="fa-solid fa-user review-user"></i><p>{eachReview.username}</p>
                    </div>
                    <div className="review-text-container text-align-left">
                      <p>{eachReview.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      );
    }
    return <TryAgain />;
  }
}

import React from 'react';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';

export default class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      created: '',
      loading: 'processing',
      offline: false
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
    const token = window.localStorage.getItem('lfz-final');
    fetch('/api/favorite', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          post: result
        });
        if (result.length === 0) {
          this.setState({
            created: 'no',
            loading: 'complete'
          });
        }
      });
  }

  handleFavorite(event) {
    const { post } = this.state;
    const token = window.localStorage.getItem('lfz-final');
    fetch(`/api/favorite/${event.target.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(result => {
        const favorited = post.filter(eachpost => Number(eachpost.postId) !== Number(result[0].postId));
        this.setState({ post: favorited });
      });
  }

  render() {
    const { post, created, loading, offline } = this.state;
    if (loading === 'processing') {
      return <Loading />;
    }
    if (offline === true) {
      return <Off />;
    }
    if (created === 'no' || post.length === 0) {
      return (
        <div className="list-background top-3-rem">
          <div className="row space-between">
            <h1 className="welcome-profile">Your Favorite Page!</h1>
          </div>
          <div className="text-align-center in-center">
            <h1>No favorite post added to your page!</h1>
            <a href="#" className="font-color">Return Home</a>
          </div>
        </div>
      );
    }
    if (created === '') {
      return (
        <div className="list-background top-3-rem">
          <div className="row space-between">
              <h1 className="welcome-profile">Your Favorite Page!</h1>
          </div>
          <div className="row wrap">
            {post.map(eachpost => {
              return (
                <div key={eachpost.postId} className="one-fourth-container post">
                  <i onClick={this.handleFavorite} id={eachpost.postId} className='fa-solid fa-heart fa-2x'></i>
                  <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId}>
                    <div className="each-post">
                      <div className="postlistimage-container">
                        <img className='postlist-image' src={eachpost.imageURL}></img>
                      </div>
                      <div className="postlist-text">
                        <h3 className="postlist-title">{eachpost.title}</h3>
                        <p>{eachpost.condition}</p>
                        <p>{eachpost.location}</p>
                        <h5 className="price">${eachpost.price}</h5>
                      </div>
                    </div>
                  </a>
                </div>
              );
            }
            )}
          </div>
        </div>
      );
    }
  }
}

import React from 'react';

export default class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      created: ''
    };
    this.handleHeart = this.handleHeart.bind(this);
  }

  componentDidMount() {
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
          this.setState({ created: 'no' });
        }
      });
  }

  handleHeart(event) {
    const { post } = this.state;
    const token = window.localStorage.getItem('lfz-final');
    fetch(`/api/favorite/${event.target.id}`, {
      method: 'PATCH',
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
    const { post, created } = this.state;
    if (created === 'no' || post.length === 0) {
      return (
        <div className="list-background top-6-rem">
          <div className="row space-between">
            <h1 className="welcome-profile">Your Favorite Page!</h1>
          </div>
          <div className="row center">
            <h1>No favorite post added to your page!</h1>
          </div>
        </div>
      );
    }
    if (created === '') {
      return (
        <div className="list-background top-6-rem">
          <div className="row space-between">
              <h1 className="welcome-profile">Your Favorite Page!</h1>
          </div>
          <div className="row wrap">
            {post.map(eachpost => {
              return (
                <div key={eachpost.postId} className="one-fourth-container post">
                  <i onClick={this.handleHeart} id={eachpost.postId} className='fa-solid fa-heart fa-2x'></i>
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

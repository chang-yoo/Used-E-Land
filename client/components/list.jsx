import React from 'react';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      favorite: null
    };
    this.handleHeart = this.handleHeart.bind(this);
  }

  componentDidMount() {
    fetch('api/main')
      .then(res => res.json())
      .then(data => {
        this.setState({ post: data });
      });
  }

  handleHeart(event) {
    const token = window.localStorage.getItem('lfz-final');
    const { favorite } = this.state;
    if (favorite === null) {
      fetch(`/api/favorite/${event.target.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
        .then(res => res.json())
        .then(result => {
          const { error } = result;
          if (!error) {
            this.setState({ favorite: event.target.id });
          }
          if (error) {
            window.location.hash = '#sign-in';
          }
        });
    }
    if (favorite !== null) {
      fetch(`/api/favorite/${event.target.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
        .then(res => res.json())
        .then(result => {
          this.setState({ favorite: null });
        });
    }
  }

  render() {
    const { post, favorite } = this.state;
    let heart = 'fa-solid fa-heart-circle-plus fa-2x';
    return post.map(eachpost => {
      if (Number(eachpost.postId) === Number(favorite)) {
        heart = 'fa-solid fa-heart fa-2x';
      } else {
        heart = 'fa-solid fa-heart-circle-plus fa-2x';
      }
      return (
        <div key={eachpost.postId} className="one-fourth-container post">
          <i onClick={this.handleHeart} id={eachpost.postId} className={heart}></i>
          <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId} >
            <div className="each-post">
            <div className="postlistimage-container">
              <img className='postlist-image' src = {eachpost.imageURL}></img>
            </div>
            <div>
              <div className="postlist-text">
                <h3 className="postlist-title">{eachpost.title}</h3>
                <p>{eachpost.condition}</p>
                <p>{eachpost.location}</p>
                <h5 className="price">${eachpost.price}</h5>
              </div>
              <div>
              </div>
            </div>
            </div>
          </a>
        </div>
      );
    }
    );
  }
}

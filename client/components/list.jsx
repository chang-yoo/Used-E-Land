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
    const { favorite } = this.state;
    if (favorite === null) {
      return this.setState({ favorite: event.target.id });
    }
    return this.setState({ favorite: null });
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

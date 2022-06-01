import React from 'react';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: []
    };
  }

  componentDidMount() {
    fetch('api/main')
      .then(res => res.json())
      .then(data => {
        this.setState({ post: data });
      });
  }

  render() {
    const { post } = this.state;
    return post.map(eachpost => {
      return (
        <div key={eachpost.postId} className="one-fourth-container post">
          <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId} >
            <div className="each-post">
            <div className="postlistimage-container">
              <img className='postlist-image' src = {eachpost.imageURL}></img>
            </div>
            <div className="postlist-text">
              <h3 className="postlist-title">{eachpost.title}</h3>
              <p>{eachpost.condition}</p>
              <p>{eachpost.location}</p>
              <h5 className="price">{eachpost.price}</h5>
            </div>
            </div>
          </a>
        </div>
      );
    }
    );
  }
}

import React from 'react';
import Post from '../components/post';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: []
    };
  }

  componentDidMount() {
    fetch('/api/main')
      .then(res => res.json())
      .then(data =>
        this.setState({ post: data })
      );
  }

  render() {
    const { post } = this.state;
    if (post.length > 0) {
      return post.map(eachpost => {
        return (
        <div key={eachpost.postId} className="one-fourth-container post">
          <Post key={eachpost.postId} postData={eachpost}/ >
          <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId} >
            <div className="each-post">
              <div className="postlistimage-container">
                <img className='postlist-image' src = {eachpost.imageURL}></img>
              </div>
              <div>
                <div className="postlist-text  text-align-center">
                  <h3 className="postlist-title">{eachpost.title}</h3>
                  <p>{eachpost.condition}</p>
                  <p>{eachpost.location}</p>
                  <h5 className="price">${eachpost.price}</h5>
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
}

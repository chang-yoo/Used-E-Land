import React from 'react';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: []
    };
    this.toDetail = this.toDetail.bind(this);
  }

  componentDidMount() {
    fetch('api/main')
      .then(res => res.json())
      .then(data => {
        this.setState({ post: data });
      });
  }

  toDetail(event) {
    const targetElement = event.target.closest('a');
    const targetId = Number(targetElement.id);
    window.location.hash = `post/${targetId}`;
  }

  render() {
    const { post } = this.state;
    return post.map(eachpost => {
      return (
        <div key={eachpost.postId} onClick={this.toDetail} className="one-fourth-container post">
          <a id={eachpost.postId} >
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

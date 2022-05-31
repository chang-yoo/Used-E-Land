import React from 'react';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: []
    };
  }

  componentDidMount() {
    fetch('api/post')
      .then(res => res.json())
      .then(data =>
        this.setState({ post: data }));
  }

  render() {
    const { post } = this.state;
    return post.map(eachpost => {
      return (
    <div key={eachpost.userId} className="container">
      <div className="row">
      <div className="postlistimage-container">
        <img className='postlist-image' src = {eachpost.imageURL}></img>
      </div>
      <div>
        <h3 className="postlist-title"></h3>
        <p>{eachpost.condition}</p>
        <p>{eachpost.location}</p>
        <h5>{eachpost.price}</h5>
      </div>
      </div>
    </div>
      );
    }
    );
  }
}

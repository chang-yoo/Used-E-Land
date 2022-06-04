import React from 'react';

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      created: ''
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('lfz-final');
    fetch('/api/myprofile', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(result => {
        const { error } = result;
        if (!error) {
          this.setState({ post: result });
        }
        if (!error && result.length === 0) { this.setState({ created: 'no' }); }
      });
  }

  render() {
    const { post } = this.state;
    const { created } = this.state;
    if (created === '') {
      return (
      <div className="list-background top-6-rem">
        <div className="row space-between">
          <div className="column-half">
            <h2 className="profile">Welcome</h2>
          </div>
          <div className="column-half row">
            <a><h2 className="profile">Shop</h2></a>
            <a><h2 className="profile">Post your item today</h2></a>
          </div>
        </div>
        <div className="row">
              {post.map(eachpost => {
                return (
                  <div key={eachpost.postId} className="one-fourth-container post">
                    <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId} >
                      <div className="each-post">
                        <div className="postlistimage-container">
                          <img className='postlist-image' src={eachpost.imageURL}></img>
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
              )}
        </div>
            </div>
      );
    } else if (created === 'no') {
      return (
      <div className="list-background top-6-rem">
        <div className="row space-between">
          <div className="column-half">
            <h2 className="profile">Welcome</h2>
          </div>
          <div className="column-half row">
            <a><h2 className="profile">Shop</h2></a>
            <a><h2 className="profile">Post your item today</h2></a>
          </div>
        </div>
        <div className="row center">
          <h1>You currently don&apos;t have any post uploaded!</h1>
        </div>
      </div>
      );
    }
  }
}

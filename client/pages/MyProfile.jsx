import React from 'react';
import jwtDecode from 'jwt-decode';

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      created: '',
      username: ''
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('lfz-final');
    const decode = jwtDecode(token);
    const getUsername = decode.username;
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
          this.setState({
            post: result,
            username: getUsername
          });
        }
        if (!error && result.length === 0) {
          this.setState({ created: 'no' });
        }
      });
  }

  render() {
    const { post, created, username } = this.state;
    if (created === '') {
      return (
      <div className="list-background top-6-rem">
        <div className="row space-between">
          <div className="column-half">
            <h1 className="welcome-profile">Welcome {username}!</h1>
          </div>
          <div className="column-half">
              <a href="#upload"><h2 className="margin-2rem">Upload your item today</h2></a>
          </div>
        </div>
        <div className="row">
              {post.map(eachpost => {
                return (
                  <div key={eachpost.postId} className="one-fourth-container post">
                    <a href={`#edit?postId=${eachpost.postId}`}><i className="fa-solid fa-pen-to-square"></i></a>
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
    } else if (created === 'no') {
      return (
      <div className="list-background top-6-rem">
        <div className="row space-between">
          <div className="column-half">
            <h1 className="welcome-profile">Welcome {username}!</h1>
          </div>
          <div className="column-half row">
            <a href="#upload"><h2 className="margin-2rem">Upload your item today</h2></a>
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

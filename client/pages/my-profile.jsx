import React from 'react';
import jwtDecode from 'jwt-decode';
import Complete from '../components/complete';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      created: '',
      username: '',
      loading: 'processing',
      offline: false
    };
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
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
        this.setState({
          post: result,
          username: getUsername,
          loading: 'complete'
        });
        if (result.length === 0) {
          this.setState({ created: 'no' });
        }
      });
  }

  render() {
    const { post, created, username, loading, offline } = this.state;
    if (loading === 'processing') {
      return <Loading />;
    }
    if (offline === true) {
      return <Off />;
    }
    if (created === '') {
      return (
      <div className="list-background">
        <div className="row space-between">
          <div className="column-half">
            <h1 className="welcome-profile">Welcome {username}!</h1>
          </div>
          <div className="column-half">
              <a href="#upload"><h2 className="margin-2rem">Sell Now</h2></a>
          </div>
        </div>
        <div className="row wrap">
              {post.map(eachpost => {
                return (
                  <div key={eachpost.postId} className="one-fourth-container post">
                    <a href={`#edit?postId=${eachpost.postId}`}><i className="fa-solid fa-pen-to-square fa-xl"></i></a>
                    <Complete key={eachpost.postId} postData={eachpost}/>
                    <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId}>
                      <div className="each-post">
                        <div className="postlistimage-container">
                          <img className='postlist-image' src={eachpost.imageURL}></img>
                        </div>
                        <div className="postlist-text text-align-center">
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
      <div className="list-background top-3-rem">
        <div className="row space-between">
          <div className="column-half row">
              <a href="#upload"><h2 className="margin-2rem">Sell Now</h2></a>
          </div>
        </div>
          <div className="in-center text-align-center">
            <h3>{username} isn&apos;t selling anything yet. <br/> Check back later.</h3>
        </div>
      </div>
      );
    }
  }
}

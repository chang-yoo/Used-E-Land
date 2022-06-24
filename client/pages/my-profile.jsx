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
        <div className="text-align-left">
          <div className="rows space-between margin-left-1rem">
            <h3>{username}&apos;s Items</h3>
            <button className="link-to-upload-button margin-right-1rem margin-top-1rem margin-bottom-1rem" onClick={e => { window.location.hash = '#upload'; }}>List an item</button>
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
                          <h3 className="margin-top-half-rem postlist-title">{eachpost.title}</h3>
                          <p className="margin-bottom-1rem">{eachpost.location}</p>
                          <h5 className="vert-space-0 price font-size-20">${eachpost.price}</h5>
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
      <div className="list-background">
        <div className="row space-between">
          <div className="column-half row">
              <a href="#upload"><h3 className="margin-left-1rem">{username} have no listings yet</h3></a>
          </div>
        </div>
          <div className="in-center text-align-center">
            <button className="link-to-upload-button" onClick={e => { window.location.hash = '#upload'; }}>List an item</button>
        </div>
      </div>
      );
    }
  }
}

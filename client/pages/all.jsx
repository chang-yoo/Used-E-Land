import React from 'react';
import Post from '../components/post';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';
import { TryAgain } from '../components/try-again';

export default class ViewAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      loading: 'processing',
      offline: false
    };
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
    fetch('/api/all')
      .then(res => res.json())
      .then(data => {
        this.setState({
          post: data,
          loading: 'complete'
        });
      }
      );
  }

  render() {
    const { post, loading, offline } = this.state;
    if (loading === 'processing') {
      return <Loading />;
    }
    if (offline === true) {
      return <Off />;
    }
    if (loading === 'complete' && post.length > 0) {
      return (
      <div className="list-background column-full top-padding-1rem">
        <div className="row wrap">
          {post.map(eachpost => {
            return (
          <div key={eachpost.postId} className="one-fourth-container post">
            <Post key={eachpost.postId} postData={eachpost} />
            <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId} >
              <div className="each-post">
                <div className="postlistimage-container">
                  <img className='postlist-image' src={eachpost.imageURL}></img>
                </div>
                <div>
                  <div className="postlist-text text-align-center">
                    <h3 className="margin-top-half-rem postlist-title">{eachpost.title}</h3>
                    <p className="margin-bottom-1rem">{eachpost.location}</p>
                    <h5 className="vert-space-0 price font-size-20">${eachpost.price}</h5>
                  </div>
                </div>
              </div>
            </a>
          </div>
            );
          })}
        </div>
      </div>
      );
    }
    return <TryAgain/>;
  }
}

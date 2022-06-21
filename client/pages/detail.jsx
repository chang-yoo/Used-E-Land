import React from 'react';
import Contact from '../components/contact';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';
import { TryAgain } from '../components/try-again';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      loading: 'processing',
      offline: false,
      noId: 'no',
      postId: this.props.postId
    };
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
    if (!`${this.props.postId}` || Number(`${this.props.postId}`) === 0) {
      this.setState({
        loading: 'complete',
        noId: 'yes'
      });
    }
    fetch(`/api/post/${this.props.postId}`)
      .then(res => res.json())
      .then(result => {
        const { error } = result;
        if (error) {
          this.setState({ noId: 'yes' });
        }
        if (result.length > 0) {
          const [data] = result;
          this.setState({
            post: data,
            loading: 'complete'
          });
        }
        if (result.length === 0) {
          this.setState({
            noId: 'yes'
          });
        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.post === this.state.post) {
      fetch(`/api/post/${this.props.postId}`)
        .then(res => res.json())
        .then(result => {
          const { error } = result;
          if (error) {
            this.setState({ post: '' });
          }
          if (result.length > 0) {
            const [data] = result;
            this.setState({
              post: data,
              loading: 'complete'
            });
          }
          if (result.length === 0) {
            this.setState({
              noId: 'yes'
            });
          }
        });
    }
  }

  render() {
    const { post, loading, offline, noId } = this.state;
    if (offline === true) {
      return <Off />;
    }
    if (loading === 'processing' && noId === 'no') {
      return <Loading />;
    }
    if (post && loading === 'complete' && noId === 'no') {
      return (
      <div className="detail-container">
        <div className="rows detail-background">
          <Contact key={post.postId} postData={post} />
          <div className="detail-description detail-column-half">
            <div className="column-80">
              <div className="detail-image-container">
                <img className="detail-image-height margin-top-1rem" src={post.imageURL}></img>
              </div>
              <div className="detail-text">
                <div className="row space-between vertical-margin">
                  <div>
                      <a href={`#history?userId=${post.userId}`}><h4>Seller: <span>{post.username}</span> </h4></a>
                  </div>
                  <div>
                    <a href={`#review?userId=${post.userId}`}><h5 className="font-color">How am I?</h5></a>
                  </div>
                </div>
                <hr></hr>
                <h2>{post.title}</h2>
                <hr></hr>
                <div className="row">
                  <div>
                    <h3 className="price font-size">${post.price}</h3>
                  </div>
                  <div>
                    <h3 className="price font-size">Size</h3>
                  </div>
                </div>
                <hr></hr>
                <div>
                  <h4>Condition: {post.condition}</h4>
                </div>
                <hr></hr>
              </div>
            </div>
          </div>
          <div className="detail-description detail-column-half">
            <div className="column-80">
              <hr></hr>
              <div className="row">
                <div>
                  <p>{post.brand}</p>
                </div>
                <div>
                  <p>{post.style}</p>
                </div>
              </div>
              <hr></hr>
              <div className="row">
                <div>
                  <p>{post.color}</p>
                </div>
                <div>
                    <p className="font-size-20">{post.location}</p>
                </div>
              </div>
              <hr></hr>
              <h2>{post.description}</h2>
            </div>
          </div>
        </div>
      </div>
      );
    }
    return <TryAgain />;
  }
}

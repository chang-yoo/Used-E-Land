import React from 'react';
import Contact from '../components/contact';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';
import { TryAgain } from '../components/try-again';
import Post from '../components/post';

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
          <div className="detail-description column-half">
            <div className="column-80">
              <div className=" detail-image-height">
                  <img className="detail-image-container  margin-top-1rem" src={post.imageURL}></img>
              </div>
            </div>
          </div>
          <div className="detail-description column-half">
            <div className="column-80">
                <div className="detail-text">
                  <div className="margin-top-1rem">
                    <Contact key={post.postId} postData={post} />
                  </div>
                  <div className="vertical-margin border-bottom-yellow">
                    <Post key={post.postId} postData={post} />
                    <a href={`#history?userId=${post.userId}`}><p className="bottom-0">Seller:</p></a>
                    <h3 className="vert-space-0">{post.username}</h3>
                    <p className="vert-space-0">{post.location}</p>
                    <a href={`#review?userId=${post.userId}`}><p className="vert-space-0 font-color">How am I?</p></a>
                  </div>
                  <div className="border-bottom-yellow">
                    <p className="vert-space-0">Price</p>
                    <h3 className="vert-space-0">${post.price}</h3>
                  </div>
                  <div className="border-bottom-yellow">
                    <p className="vert-space-0">Name:</p>
                    <h3 className="vert-space-0">{post.title}</h3>
                  </div>
                  <div className="border-bottom-yellow">
                    <p className="vert-space-0">Description:</p>
                    <h3 className="vert-space-0">{post.description}</h3>
                  </div>
                  <div className="border-bottom-yellow">
                    <p className="vert-space-0">Brand:</p>
                    <h3 className="vert-space-0">{post.brand}</h3>
                  </div>
                  <div className="border-bottom-yellow">
                    <p className="vert-space-0">Size:</p>
                    <h4 className="vert-space-0">{post.size}</h4>
                  </div>
                  <div className="border-bottom-yellow">
                    <p className="vert-space-0"> Condition:</p>
                    <h4 className="vert-space-0">{post.condition}</h4>
                  </div>
                </div>
              <div className="border-bottom-yellow">
                <p className="vert-space-0">Style:</p>
                <h4 className="vert-space-0">{post.style}</h4>
              </div>
              <div className="border-bottom-yellow margin-bottom-1rem">
                <p className="vert-space-0">Color:</p>
                <h4 className="vert-space-0">{post.color}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }
    return <TryAgain />;
  }
}

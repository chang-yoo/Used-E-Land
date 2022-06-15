import React from 'react';
import Contact from '../components/contact';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      loading: 'processing',
      offline: false
    };
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
    fetch(`/api/post/${this.props.postId}`)
      .then(res => res.json())
      .then(result => {
        const [data] = result;
        this.setState({
          post: data,
          loading: 'complete'
        });
      });
  }

  render() {
    const { post, loading, offline } = this.state;
    if (offline === true) {
      return <Off />;
    }
    if (loading === 'processing') {
      return <Loading />;
    }
    return (
      <div className="detail-container">
        <div className="rows detail-background">
          <Contact key={post.postId} postData={post} />
          <div className="detail-description detail-column-half">
            <div className="column-80">
              <div className="detail-image-container">
                <img className="margin-top-1rem" src={post.imageURL}></img>
              </div>
              <div className="detail-text">
                <div className="row space-between vertical-margin">
                  <div>
                    <a href={`#history?userId=${post.userId}`}><h4>Seller: {post.username} </h4></a>
                  </div>
                  <div>
                    <a href={`#review?userId=${post.userId}`}><h5 className="font-color">How am I?</h5></a>
                  </div>
                </div>
                <h4>condition: {post.condition}</h4>
                <p className="font-size-20">{post.location}</p>
                <h3 className="price font-size">${post.price}</h3>
              </div>
            </div>
          </div>
          <div className="detail-description detail-column-half">
            <div className="column-80">
              <hr></hr>
              <h2>{post.title}</h2>
              <hr></hr>
              <h2>Description:<br /><br />{post.description}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

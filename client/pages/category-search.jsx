import React from 'react';
import Post from '../components/post';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';
import { TryAgain } from '../components/try-again';

export default class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      loading: 'processing',
      offline: false,
      keyword: null
    };
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
    if (!`${this.props.keyword}`) {
      this.setState({
        loading: 'complete'
      });
    }
    fetch(`/api/category/${this.props.keyword}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          post: data,
          loading: 'complete'
        })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.keyword !== this.props.keyword) {
      fetch(`/api/category/${this.props.keyword}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            post: data,
            keyword: null
          });
        });
    }
  }

  render() {
    const { post, loading, offline } = this.state;
    if (loading === 'processing') {
      return <Loading />;
    }
    if (offline === true) {
      return <Off />;
    }
    if (post.length === 0 && loading === 'complete') {
      return <div className="list-background">
        <h1 className="margin-padding-bottom-0">Based on your search: {this.props.keyword}</h1>
        <div className="text-align-center in-center">
          <h2 className="padding-left-1rem ">Sorry! Nothing matches to your search keyword</h2>
          <a className="font-color" href="#">Return Home</a>
        </div>
      </div>;
    }
    if (post.length > 0 && loading === 'complete') {
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
                    <div className="postlist-text  text-align-center">
                      <h3 className="postlist-title">{eachpost.title}</h3>
                      <p>{eachpost.condition}</p>
                      <p>{eachpost.location}</p>
                      <h5 className="price">${eachpost.price}</h5>
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

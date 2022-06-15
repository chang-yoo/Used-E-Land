import React from 'react';
import Post from '../components/post';
import { Loading } from '../components/spinner';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: [],
      loading: 'processing'
    };
  }

  componentDidMount() {
    fetch(`api/search/${this.props.keyword}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          match: data,
          loading: 'complete'
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.match === this.state.match) {
      fetch(`api/search/${this.props.keyword}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ match: data });
        });
    }
  }

  render() {
    const { match, loading } = this.state;
    if (loading === 'processing') {
      return <Loading />;
    }
    if (match.length === 0 && loading === 'complete') {
      return <div className="list-background">
            <h1 className="margin-padding-bottom-0">Based on your search: {this.props.keyword}</h1>
            <div className="text-align-center margin-top-min-6rem">
              <h2 className="padding-left-1rem">Sorry! Nothing matches to your search keyword</h2>
              <a className="font-color" href="#">Return Home</a>
            </div>
      </div>;
    }
    return <div className="search-background">
      <h1 className="margin-padding-bottom-0">Based on your search: {this.props.keyword}</h1>
      <h2 className="padding-left-1rem">Look at what we have found!</h2>
        <div className="row wrap">
        {match.map(eachpost => {
          return (
        <div key={eachpost.postId} className="one-fourth-container post">
          <Post key={eachpost.postId} postData={eachpost} />
          <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId} >
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
        })}
      </div>
      </div>;
  }
}

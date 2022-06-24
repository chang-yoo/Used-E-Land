import React from 'react';
import Post from './post';
import { Loading } from './spinner';
import { TryAgain } from './try-again';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: [],
      loading: 'processing'
    };
  }

  componentDidMount() {
    if (!`${this.props.keyword}`) {
      this.setState({
        loading: 'complete'
      });
    }
    fetch(`/api/search/${this.props.keyword}`)
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
        <h3 className="margin-padding-bottom-0 text-align-center">Search results for <br /> <span className="search-result">&quot;{this.props.keyword}&quot;</span></h3>
              <div className="text-align-center in-center">
                <h4 className="padding-left-1rem ">Sorry, we couldn&apos;t find anything</h4>
                <a className="font-color" href="#">Return Home</a>
              </div>
            </div>;
    }
    if (match.length > 0 && loading === 'complete') {
      return <div className="search-background">
        <h3 className="margin-padding-bottom-0 text-align-center">Search results for <br /> <span className="search-result">&quot;{this.props.keyword}&quot;</span></h3>
        <div className="row wrap">
        {match.map(eachpost => {
          return (
        <div key={eachpost.postId} className="one-fourth-container post">
          <Post key={eachpost.postId} postData={eachpost} />
          <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId} >
            <div className="each-post ">
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
        })}
      </div>
      </div>;
    }
    return <TryAgain />;
  }
}

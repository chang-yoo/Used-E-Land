import React from 'react';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: [],
      favorite: null
    };
    this.handleHeart = this.handleHeart.bind(this);
  }

  componentDidMount() {
    fetch(`api/search/${this.props.keyword}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ match: data });
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

  handleHeart(event) {
    const token = window.localStorage.getItem('lfz-final');
    const { favorite } = this.state;
    if (favorite === null) {
      fetch(`/api/favorite/${event.target.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
        .then(res => res.json())
        .then(result => {
          this.setState({ favorite: event.target.id });
          const { error } = result;
          if (error) {
            window.location.hash = '#sign-in';
          }
        });
    }
    this.setState({ favorite: null });
  }

  render() {
    const { match, favorite } = this.state;
    let heart = 'fa-solid fa-heart-circle-plus fa-2x';
    if (match.length === 0) {
      return <div className="list-background">
        <h1 className="margin-padding-bottom-0">Based on your search: {this.props.keyword}</h1>
        <h2 className="padding-left-1rem">Sorry! Nothing matches to your search keyword</h2>
        <a className="return-home" href="#">Return Home</a>
      </div>;
    }
    return <div className="search-background">
      <h1 className="margin-padding-bottom-0">Based on your search: {this.props.keyword}</h1>
      <h2 className="padding-left-1rem">Look at what we have found!</h2>
        <div className="row">
        {match.map(eachpost => {
          if (Number(eachpost.postId) === Number(favorite)) {
            heart = 'fa-solid fa-heart fa-2x';
          } else {
            heart = 'fa-solid fa-heart-circle-plus fa-2x';
          }
          return (
        <div key={eachpost.postId} className="one-fourth-container post">
          <i onClick={this.handleHeart} id={eachpost.postId} className={heart}></i>
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

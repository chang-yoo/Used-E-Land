import React from 'react';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: []
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
    const icon = event.target.closest('i');
    const classvalue = icon.getAttribute('class');

    if (classvalue === 'fa-solid fa-heart-circle-plus fa-2x') {
      fetch(`/api/favorite/${event.target.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
        .then(res => res.json())
        .then(result => {
          const { error } = result;
          if (!error) {
            this.setState({ favorite: 'on' });
            event.target.setAttribute('class', 'fa-solid fa-heart fa-2x');
          }
          if (error) {
            window.location.hash = '#sign-in';
          }
        });
    }
    if (classvalue === 'fa-solid fa-heart fa-2x') {
      fetch(`/api/favorite/${event.target.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
        .then(res => res.json())
        .then(result => {
          this.setState({ favorite: 'off' });
          const icon = event.target.closest('i');
          icon.setAttribute('class', 'fa-solid fa-heart-circle-plus fa-2x');
        });
    }
  }

  render() {
    const { match } = this.state;
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
        <div className="row wrap">
        {match.map(eachpost => {
          return (
        <div key={eachpost.postId} className="one-fourth-container post">
              <i onClick={this.handleHeart} id={eachpost.postId} className='fa-solid fa-heart-circle-plus fa-2x'></i>
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

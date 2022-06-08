import React from 'react';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: []
    };
    this.handleHeart = this.handleHeart.bind(this);
  }

  componentDidMount() {
    fetch('api/main')
      .then(res => res.json())
      .then(data => {
        this.setState({
          post: data
        });
      });
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
          const icon = event.target.closest('i');
          icon.setAttribute('class', 'fa-solid fa-heart-circle-plus fa-2x');
        });
    }
  }

  render() {
    const { post } = this.state;
    return post.map(eachpost => {
      return (
        <div key={eachpost.postId} className="one-fourth-container post">
          <i onClick={this.handleHeart} id={eachpost.postId} className='fa-solid fa-heart-circle-plus fa-2x'></i>
          <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId} >
            <div className="each-post">
              <div className="postlistimage-container">
                <img className='postlist-image' src = {eachpost.imageURL}></img>
              </div>
              <div>
                <div className="postlist-text">
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
    }
    );
  }
}

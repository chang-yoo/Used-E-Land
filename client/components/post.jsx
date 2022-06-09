import React from 'react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.postData.isFavorite
    };
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  handleFavoriteClick(event) {
    const token = window.localStorage.getItem('lfz-final');
    const { isFavorite } = this.state;
    if (isFavorite === false) {
      fetch(`/api/favorite/${this.props.postData.postId}`, {
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
            this.setState({ isFavorite: true });
          }
          if (error) {
            window.location.hash = '#sign-in';
          }
        });
    }
    if (isFavorite) {
      fetch(`/api/favorite/${this.props.postData.postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
        .then(res => res.json())
        .then(result => {
          this.setState({ isFavorite: false });
        });
    }
  }

  render() {
    const { isFavorite } = this.state;
    let classvalue = 'fa-solid fa-heart-circle-plus fa-2x';
    if (isFavorite === true) {
      classvalue = 'fa-solid fa-heart fa-2x';
    } else {
      classvalue = 'fa-solid fa-heart-circle-plus fa-2x';
    }
    return <i onClick={this.handleFavoriteClick} className={classvalue}></i>;
  }
}

import React from 'react';

export default class SearchResult extends React.Component {

  componentDidMount() {
    fetch('api/searching/:keyword')
      .then(res => res.json())
      .then(data =>
        this.setState({ post: data }));
  }
}

import React from 'react';

export default class Distance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      originPlace: null
    };
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
    } else {
      alert('Please turn on your location service');
    }
  }

  getCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  handleLocationError(error) {
    if (error.PERMISSION_DENIED || error.POSITION_UNAVAILABLE || error.TIMEOUT || error.UNKNOWN_ERROR) {
      return null;
    }
  }

  render() {
    return (
        <div>
          <p>latitude: {this.state.latitude}</p>
          <p>longtitude: {this.state.longitude}</p>
        </div>
    );
  }

}

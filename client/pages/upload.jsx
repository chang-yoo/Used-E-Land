import React from 'react';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: 'images/image-placeholder.png',
      condition: '',
      location: '',
      price: '',
      title: '',
      description: '',
      image: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleImageSubmit(event) {
    const token = window.localStorage.getItem('lfz-final');
    event.preventDefault();

    const formData = new FormData();
    const image = this.fileInputRef.current.files[0];
    this.setState({ imageURL: image.name });
    formData.append('image', image);

    fetch('/api/images', {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        const { url } = data;
        this.setState({
          imageURL: url,
          image: url
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageURL !== this.state.imageURL) {
      this.setState({ imageURL: this.state.image });
    }
  }

  handleSubmit(event) {
    const token = window.localStorage.getItem('lfz-final');
    event.preventDefault();
    fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        window.location.hash = '#myprofile';
      })
      .catch(err => console.error(err));
  }

  render() {
    const { imageURL } = this.state;
    return <div className="column-full">
      <div className="upload-container">
        <div className="image-submit">
          <form onSubmit={this.handleImageSubmit}>
              <div className="row space-between">
            <label id="uploading" htmlFor="upload">Choose File</label>
            <input
              required
              id="upload"
              type="file"
              name="imageURL"
              ref={this.fileInputRef}
              accept=".png, .jpg, .jpeg, .gif"
              className="search-button margin-top-1rem"
              hidden
            />
              <button type="submit" className="image-upload">Upload</button>
              </div>
          </form>
        </div>
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="column-half">
            <div className="image-container">
              <img src={imageURL}></img>
            </div>
            <div className="test">
              <div className="condition-container">
                <label id="font-color" htmlFor="condition">Condition: </label>
                <select className="condition" onChange={this.handleChange} name="condition" required>
                  <option className="select">Please select</option>
                  <option className="select" value="very used">very used</option>
                  <option className="select" value="used">used</option>
                  <option className="select" value="like new">like new</option>
                  <option className="select" value="brand new">brand new</option>
                </select>
              </div>
              <div className="location-container">
                <input
                required
                id="location"
                type="text"
                name="location"
                onChange={this.handleChange}
                placeholder='location'
                />
              </div>
              <div className="price-container">
                <input
                required
                id="price"
                type="text"
                name="price"
                onChange={this.handleChange}
                placeholder="$price"
                />
              </div>
            </div>
          </div>
          <div className="column-half">
            <div className="row center margin-top-1rem">
              <div>
                <div className="title-container">
                  <input
                  required
                  id="title"
                  type="text"
                  name="title"
                  onChange={this.handleChange}
                  className="title"
                  placeholder='Name your item!'
                  />
                </div>
                <hr></hr>
                <div className="description-container">
                  <textarea
                  required
                  autoFocus
                  id="description"
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                  className="description"
                  placeholder="Tell us about your item!"
                  />
                </div>
                <div className="row space-between margin-top-1rem">
                    <button type="submit" className="upload-button">Upload</button>
                    <a href="#myprofile" className="cancel-button"><p className="cancel-button-text">Cancel</p></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>
    </div>;
  }
}

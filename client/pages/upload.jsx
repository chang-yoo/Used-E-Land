import React from 'react';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: 'images/image-placeholder.png'
      // condition: '',
      // location: '',
      // price: '',
      // title: '',
      // description: '',
      // token: '',
      // image: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleImageSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    const image = this.fileInputRef.current.files[0];
    formData.append('image', image);

    fetch('/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.state.token
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ imageURL: image, image });
        this.fileInputRef.current.value = null;
      });
  }

  componentDidMount() {
    const token = window.localStorage.getItem('lfz-final');
    this.setState({ token });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageURL !== this.state.imageURL) {
      this.setState({ imageURL: this.state.image });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.state.token
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
      });
  }

  render() {
    // const {imageURL, condition, location, price, title, description} = this.state
    return <div className="column-full">
      <div className="upload-container">
        <div className="image-submit">
        <form onSubmit={this.handleImageSubmit}>
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
        </form>
        </div>
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="column-half">
            <div className="image-container">
              <img src={this.state.imageURL}></img>
            </div>
            <div className="test">
              <div className="condition-container">
                <label id="font-color" htmlFor="condition">Condition: </label>
                <select className="condition" name="condition" required>
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
                  placeholder='title'
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
                  placeholder='description'
                  />
                </div>
                <div className="row space-between margin-top-1rem">
                  <a href="myprofile" ><button type="submit" className="upload-button">Upload</button></a>
                  <a href="#myprofile"><button className="cancel-button">Cancel</button></a>
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

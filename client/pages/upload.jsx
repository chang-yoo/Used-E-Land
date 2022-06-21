import React from 'react';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '/images/image-placeholder.png',
      condition: '',
      location: '',
      price: '',
      size: '',
      brand: '',
      style: '',
      color: '',
      title: '',
      description: '',
      image: '',
      loading: 'processing',
      offline: false,
      uploading: 'no',
      tryAgain: 'no'
    };
    this.handleChange = this.handleChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
    this.setState({ loading: 'complete' });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleImageSubmit(event) {
    this.setState({ uploading: 'yes' });
    const token = window.localStorage.getItem('lfz-final');
    event.preventDefault();

    const formData = new FormData();
    const image = this.fileInputRef.current.files[0];
    this.setState({ imageURL: image });
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
          image: url,
          uploading: 'no'
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

  handleDelete(event) {
    this.setState({
      tryAgain: 'no'
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { price } = this.state;
    if (isNaN(price)) {
      return this.setState({ tryAgain: 'yes' });
    } else {
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
  }

  render() {
    const { imageURL, loading, offline, uploading, tryAgain } = this.state;
    let classvalue = 'hidden';
    let showAgain = 'hidden';
    if (loading === 'processing') {
      return <Loading />;
    }
    if (offline === true) {
      return <Off />;
    }
    if (uploading === 'no') {
      classvalue = 'hidden';
    } else {
      classvalue = '';
    }
    if (tryAgain === 'yes') {
      showAgain = '';
    } else {
      showAgain = 'hidden';
    }
    return <div className="column-full">
      <div className="upload-container edit-width">
        <div className={showAgain}>
          <div className="confirm-delete-box delete-box-height">
            <div className="margin-top-3rem">
              <div className="text-center">
                <h3 className="delete-top-margin">Price must be numbers only</h3>
              </div>
              <div className="row space-around margin-top-5rem">
                <button onClick={this.handleDelete} className="delete-confirm-button">Okay</button>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="rows">
            <div className="edit-column-half">
              <div className="column-80 margin-top-1rem">
                <div className="image-container">
                  <img src={imageURL}></img>
                  <h3 id="uploading-image" className={classvalue}>Please Wait</h3>
                </div>
                <div className="row space-between">
                  <div className="margin-top-1rem">
                    <label id="uploading" htmlFor="upload">Choose File</label>
                    <input
                      id="upload"
                      type="file"
                      name="imageURL"
                      ref={this.fileInputRef}
                      accept=".png, .jpg, .jpeg, .gif"
                      className="search-button"
                      hidden
                    />
                  </div>
                  <div className="margin-top-half-rem">
                    <button onClick={this.handleImageSubmit} className="image-load">Upload</button>
                  </div>
                </div>
                <div className="margin-top-1rem column-full edit-text-align">
              <hr></hr>
              <div className="title-container">
                <label>Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  onChange={this.handleChange}
                  className="title edit-text-width-second-half"
                  placeholder="Name your item!"
                />
              </div>
                  <hr></hr>
              <div className="row">
                <div className="price-container">
                  <label>Price</label>
                  <input
                  required
                  id="price"
                  type="text"
                  name="price"
                  onChange={this.handleChange}
                  placeholder="Number Only"
                  className="edit-text-width-first-half"
                  />
                </div>
                <div>
                  <label>Size</label>
                  <input
                    required
                    id="size"
                    type="text"
                    name="size"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
                  <hr></hr>
                  <div className="condition-container">
                    <label id="font-color" htmlFor="condition">Condition: </label>
                    <select className="condition" onChange={this.handleChange} name="condition" required>
                      <option className="select" value="">Please select</option>
                      <option className="select" value="Used - Fair">Used - Fair</option>
                      <option className="select" value="Used - Good">Used - Good</option>
                      <option className="select" value="Used - Very Good">Used - Very Good</option>
                      <option className="select" value="Used - Excellent">Used - Excellent</option>
                      <option className="select" value="Pristine">Pristine</option>
                    </select>
                  </div>
            </div>
          </div>
          </div>
            <div className="edit-column-half">
              <div className="column-80 edit-text-align">
                <div className="margin-top-1rem">
                  <hr></hr>
                  <div className="row">
                    <div>
                    <label>Brand</label>
                    <input
                      id="brand"
                      type="text"
                      name="brand"
                      onChange={this.handleChange}
                    />
                    </div>
                  <div>
                    <label>Style</label>
                    <input
                      required
                      id="style"
                      type="text"
                      name="brand"
                      onChange={this.handleChange}
                    />
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                  <div>
                    <label>Color</label>
                    <input
                      required
                      id="color"
                      type="text"
                      name="color"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="location-container">
                    <label>Location</label>
                    <input
                      required
                      id="location"
                      type="text"
                      name="location"
                      onChange={this.handleChange}
                      className="edit-text-width-first-half"
                    />
                  </div>
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
                  className="description edit-text-width-second-half"
                  wrap="hard"
                  placeholder="Tell us about your item!"
                  />
                </div>
                  <div className="row space-between margin-top-1rem">
                    <button type="submit" className="upload-button">Update</button>
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

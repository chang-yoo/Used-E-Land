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
      title: '',
      description: '',
      image: '',
      loading: 'processing',
      offline: false,
      uploading: 'no'
    };
    this.handleChange = this.handleChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { imageURL, loading, offline, uploading } = this.state;
    let classvalue = 'hidden';
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
    return <div className="column-full">
      <div className="upload-container edit-width">
        <form onSubmit={this.handleSubmit}>
          <div className="rows">
            <div className="edit-column-half">
              <div className="column-80 margin-top-1rem">
                <div className="image-container">
                  <img src={imageURL}></img>
                  <h3 id="uploading-image" className={classvalue}>Uploading</h3>
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
                      className="edit-text-width-first-half"
                />
              </div>
              <div className="price-container">
                <input
                required
                id="price"
                type="text"
                name="price"
                onChange={this.handleChange}
                placeholder="$price (Number Only)"
                className="edit-text-width-first-half"
                />
              </div>
            </div>
          </div>
          </div>
            <div className="edit-column-half">
              <div className="column-80 edit-text-align">
                <div className="margin-top-1rem">
                  <hr></hr>
                  <div className="title-container">
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

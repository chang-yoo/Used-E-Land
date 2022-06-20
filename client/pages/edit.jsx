import React from 'react';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';
import { TryAgain } from '../components/try-again';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
      condition: '',
      location: '',
      price: '',
      title: '',
      description: '',
      classvalue: 'hidden',
      loading: 'processing',
      offline: false,
      noId: 'no'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.handleDeleteBox = this.handleDeleteBox.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
    const token = window.localStorage.getItem('lfz-final');
    if (!`${this.props.postId}`) {
      this.setState({
        loading: 'complete',
        noId: 'yes'
      });
    }
    fetch(`/api/post/${this.props.postId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.length > 0) {
          const [data] = result;
          const { imageURL, condition, location, price, title, description } = data;
          this.setState({ imageURL, condition, location, price, title, description, loading: 'complete' });
        }
        if (result.length === 0) {
          this.setState({
            loading: 'complete',
            noId: 'yes'
          });
        }
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleImageSubmit(event) {
    const { token } = this.state;
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

  handleDelete() {
    const token = window.localStorage.getItem('lfz-final');
    fetch(`/api/edit/${this.props.postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(result => {
        this.handleDeleteBox();
        window.location.hash = '#myprofile';
      });
  }

  handleDeleteBox() {
    const { classvalue } = this.state;
    if (classvalue === 'hidden') {
      return this.setState({ classvalue: '' });
    }
    return this.setState({ classvalue: 'hidden' });
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('lfz-final');
    fetch(`/api/edit/${this.props.postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        this.setState(result);
        window.location.hash = '#myprofile';
      });
  }

  render() {
    const { imageURL, condition, location, price, title, description, loading, offline, noId } = this.state;
    if (offline === true) {
      return <Off />;
    }
    if (loading === 'processing') {
      return <Loading />;
    }
    if (noId === 'yes') {
      return <TryAgain/>;
    }
    return (
      <div className="column-full">
        <div className="upload-container edit-width">
          <form onSubmit={this.handleSubmit}>
            <div className="rows">
              <div className="edit-column-half">
                <div className="column-80 margin-top-1rem">
                  <div className="image-container">
                    <img className="detail-image-height" src={imageURL}></img>
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
                      <select className="condition edit-text-width-first-half" onChange={this.handleChange} name="condition">
                        <option className="select">{condition}</option>
                        <option className="select" value="very used">very used</option>
                        <option className="select" value="used">used</option>
                        <option className="select" value="like new">like new</option>
                        <option className="select" value="brand new">brand new</option>
                      </select>
                    </div>
                    <div className="location-container">
                      <input
                        id="location"
                        type="text"
                        name="location"
                        onChange={this.handleChange}
                        placeholder={location}
                        className="edit-text-width-first-half"
                      />
                    </div>
                    <div className="price-container">
                      <input
                        id="price"
                        type="text"
                        name="price"
                        onChange={this.handleChange}
                        placeholder={price}
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
                          placeholder={title}
                        />
                        <i onClick={this.handleDeleteBox} className="fa-solid fa-delete-left fa-2x"></i>
                      </div>
                      <hr></hr>
                      <div className="description-container">
                        <textarea
                          autoFocus
                          id="description"
                          type="text"
                          name="description"
                          onChange={this.handleChange}
                          className="description edit-text-width-second-half"
                          placeholder={description}
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
        <div className={this.state.classvalue}>
          <div className="confirm-delete-box delete-box-height">
            <div className="delete-text"><h2 className="auto delete">Delete</h2></div>
              <div className="margin-top-3rem">
                <div className="text-center">
                  <h3 className="delete-top-margin">Are you sure want to delete this item?</h3>
                </div>
                <div className="row space-around margin-top-5rem">
                  <button onClick={this.handleDelete}className="delete-confirm-button">Confirm</button>
                  <button onClick={this.handleDeleteBox} className="delete-cancel-button">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

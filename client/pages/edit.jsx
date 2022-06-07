import React from 'react';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
      condition: '',
      location: '',
      price: '',
      title: '',
      description: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('lfz-final');
    fetch(`/api/post/${this.props.postId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(result => {
        const [data] = result;
        const { imageURL, condition, location, price, title, description } = data;
        this.setState({ imageURL, condition, location, price, title, description });
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
      method: 'post',
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

  handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('lfz-final');
    fetch(`/api/edit/${this.props.postId}`, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
      // console.log(result)
      });
  }

  render() {
    const { imageURL, condition, location, price, title, description } = this.state;
    return <div className="column-full">
      <div className="upload-container">
        <div className="image-submit">
          <form onSubmit={this.handleImageSubmit}>
            <div className="row space-between">
              <label id="uploading" htmlFor="upload">Choose File</label>
              <input
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
                  <select className="condition" onChange={this.handleChange} name="condition">
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
                  />
                </div>
                <div className="price-container">
                  <input
                    id="price"
                    type="text"
                    name="price"
                    onChange={this.handleChange}
                    placeholder={price}
                  />
                </div>
              </div>
            </div>
            <div className="column-half">
              <div className="row center margin-top-1rem">
                <div>
                  <div className="title-container">
                    <input
                      id="title"
                      type="text"
                      name="title"
                      onChange={this.handleChange}
                      className="title"
                      placeholder={title}
                    />
                  </div>
                  <hr></hr>
                  <div className="description-container">
                    <textarea
                      autoFocus
                      id="description"
                      type="text"
                      name="description"
                      onChange={this.handleChange}
                      className="description"
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
    </div>;
  }
}

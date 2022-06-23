import React from 'react';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';
import { TryAgain } from '../components/try-again';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
      category: '',
      condition: '',
      location: '',
      price: '',
      size: '',
      brand: '',
      style: '',
      color: '',
      title: '',
      description: '',
      classvalue: 'hidden',
      loading: 'processing',
      offline: false,
      noId: 'no',
      uploading: 'no',
      tryAgain: 'no',
      currentImageStatus: 'yes',
      valueStatus: 'off'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.handleSpinner = this.handleSpinner.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTryAgain = this.handleTryAgain.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleValueStatus = this.handleValueStatus.bind(this);
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
          const { imageURL, condition, location, price, title, description, size, brand, category, style, color } = data;
          this.setState({ imageURL, condition, location, price, title, description, size, brand, category, style, color, loading: 'complete' });
        }
        if (result.length === 0) {
          this.setState({
            loading: 'complete',
            noId: 'yes'
          });
        }
      });
  }

  handleUploadImage() {
    this.setState({ currentImageStatus: '' });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleImageSubmit(event) {
    this.setState({ uploading: 'yes' });
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
          image: url,
          uploading: 'no',
          currentImageStatus: 'yes'
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  handleTryAgain(event) {
    this.setState({
      tryAgain: 'no'
    });
  }

  handleDelete(event) {
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
        this.handleSpinner();
        window.location.hash = '#myprofile';
      });
  }

  handleSpinner(event) {
    const { classvalue } = this.state;
    if (classvalue === 'hidden') {
      return this.setState({ classvalue: '' });
    }
    return this.setState({ classvalue: 'hidden' });
  }

  handleValueStatus(event) {
    event.preventDefault();
    if (this.state.valueStatus === 'off') {
      return this.setState({ valueStatus: 'on' });
    }
    return this.setState({ valueStatus: 'off' });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { price } = this.state;
    if (isNaN(price)) {
      return this.setState({ tryAgain: 'yes' });
    } else {
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
          const { error } = result;
          if (error) {
            return this.setState({ tryAgain: 'yes' });
          }
          this.setState(result);
          window.location.hash = '#myprofile';
        });
    }
  }

  render() {
    const { imageURL, category, uploading, condition, location, price, title, size, brand, color, style, description, loading, offline, noId, tryAgain, currentImageStatus, valueStatus } = this.state;
    let classvalue = 'hidden';
    let inputCheck = 'hidden';
    let imageStatus = 'uploading';
    let handleImage = 'hidden';
    let handleValue = 'hidden';
    if (offline === true) {
      return <Off />;
    }
    if (loading === 'processing') {
      return <Loading />;
    }
    if (tryAgain === 'yes') {
      inputCheck = '';
    }
    if (noId === 'yes') {
      return <TryAgain/>;
    }
    if (uploading === 'no') {
      classvalue = 'hidden';
    } else {
      classvalue = 'text-align-center';
    }
    if (currentImageStatus === 'yes') {
      imageStatus = 'hidden';
      handleImage = 'handle-image';
    } else {
      imageStatus = 'uploading';
      handleImage = 'hidden';
    }
    if (valueStatus === 'on') {
      handleValue = 'text-align-center';
    } else {
      handleValue = 'hidden';
    }
    return (
      <div className="column-40-for-upload auto">
        <div className="row justify-center">
          <div className="upload-container column-full text-align-center auto">
            <div className={inputCheck}>
              <div className="menu-bar">
                <div className="z-index-5 text-align-center in-center">
                  <h2 className="font-color-yellow">Check your inputs again.</h2>
                  <h4 onClick={this.handleTryAgain} className="font-color-yellow hover margin-top-1rem">Try Again</h4>
                </div>
              </div>
            </div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <h1 className="margin-top-1rem margin-bottom-0 padding-0 text-align-left">Edit an item</h1>
              <hr />
              <div>
                <button className="delete-post-button" onClick={this.handleValueStatus}>Delete</button>
                <h2 className="text-align-left margin-top-2rem margin-bottom-0">Photo</h2>
              </div>
              <div className="image-container">
                <div className={handleImage}>
                  <i onClick={this.handleUploadImage} className="fa-solid fa-xmark fa-2x font-color-yellow"></i>
                </div>
                  <label className={imageStatus} htmlFor="upload"><i className="fa-solid fa-camera fa-2x"></i><h4>Add a photo</h4></label>
                  <input
                    id="upload"
                    type="file"
                    name="imageURL"
                    ref={this.fileInputRef}
                    accept=".png, .jpg, .jpeg, .gif"
                    className="search-button margin-bottom-1rem"
                    hidden
                  />
                  <img className="upload-image" src={imageURL} />
                  <div id={classvalue} className='lds-ellipsis'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  <div className="margin-top-2rem">
                    <h2 className="text-align-left margin-bottom-half">Description</h2>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      onChange={this.handleChange}
                      className="title edit-text-width-second-half"
                      placeholder={title}
                    />
                  </div>
                  <div className="margin-top-1rem">
                    <textarea
                      autoFocus
                      id="description"
                      type="text"
                      name="description"
                      onChange={this.handleChange}
                      className="description "
                      wrap="hard"
                      placeholder={description}
                    />
                  </div>
                  <div className="margin-top-2rem">
                    <h2 className="text-align-left margin-bottom-half">Info</h2>
                    <div className="category-container">
                      <select className="category" value="" onChange={this.handleChange} name="category">
                          <option className="select" value="">{category}</option>
                          <optgroup label="Menswear">
                            <option className="select" value="Menswear-Tops">Tops</option>
                            <option className="select" value="Menswear-Bottoms">Bottoms</option>
                            <option className="select" value="Menswear-Coats-and-Jackets">Coats and Jackets</option>
                            <option className="select" value="Menswear-Jumpsuits-and-Rompers">Jumpsuits and Rompers</option>
                            <option className="select" value="Menswear-Suits">Suits</option>
                            <option className="select" value="Menswear-Footwear">Footwear</option>
                            <option className="select" value="Menswear-Accessories">Accessories</option>
                            <option className="select" value="Menswear-Sleepwear">Sleepwear</option>
                            <option className="select" value="Menswear-Underwear">Underwear</option>
                            <option className="select" value="Menswear-Swimwear">Swimwear</option>
                            <option className="select" value="Menswear-Costume">Costume</option>
                          </optgroup>
                          <optgroup label="Womenswear">
                            <option className="select" value="Womenswear-Tops">Tops</option>
                            <option className="select" value="Womenswear-Bottoms">Bottoms</option>
                            <option className="select" value="Womenswear-Coats-and-Jackets">Coats and Jackets</option>
                            <option className="select" value="Womenswear-Jumpsuits-and-Rompers">Jumpsuits and Rompers</option>
                            <option className="select" value="Womenswear-Suits">Suits</option>
                            <option className="select" value="Womenswear-Footwear">Footwear</option>
                            <option className="select" value="Womenswear-Accessories">Accessories</option>
                            <option className="select" value="Womenswear-Sleepwear">Sleepwear</option>
                            <option className="select" value="Womenswear-Underwear">Underwear</option>
                            <option className="select" value="Womenswear-Swimwear">Swimwear</option>
                            <option className="select" value="Womenswear-Costume">Costume</option>
                          </optgroup>
                          <optgroup label="Kids">
                            <option className="select" value="Kids-Tops">Tops</option>
                            <option className="select" value="Kids-Bottoms">Bottoms</option>
                            <option className="select" value="Kids-Coats-and-Jackets">Coats and Jackets</option>
                            <option className="select" value="Kids-Jumpsuits-and-Rompers">Jumpsuits and Rompers</option>
                            <option className="select" value="Kids-Suits">Suits</option>
                            <option className="select" value="Kids-Footwear">Footwear</option>
                            <option className="select" value="Kids-Accessories">Accessories</option>
                            <option className="select" value="Kids-Sleepwear">Sleepwear</option>
                            <option className="select" value="Kids-Underwear">Underwear</option>
                            <option className="select" value="Kids-Swimwear">Swimwear</option>
                            <option className="select" value="Kids-Costume">Costume</option>
                          </optgroup>
                          <optgroup label="Jewelery">
                            <option className="select" value="Jewelery-Necklaces">Necklaces</option>
                            <option className="select" value="Jewelery-Pins">Pins</option>
                            <option className="select" value="Jewelery-Body-Jewelry">Body Jewelry</option>
                            <option className="select" value="Jewelery-Bracelets">Bracelets</option>
                            <option className="select" value="Jewelery-Earings">Earings</option>
                            <option className="select" value="Jewelery-Rings">Rings</option>
                            <option className="select" value="Jewelery-Watches">Watches</option>
                          </optgroup>
                          <optgroup label="Beauty">
                            <option className="select" value="Beauty-Face">Face</option>
                            <option className="select" value="Beauty-Eyes">Eyes</option>
                            <option className="select" value="Beauty-Lips">Lips</option>
                            <option className="select" value="Beauty-Perfume">Perfume</option>
                            <option className="select" value="Beauty-Bath-Body">Bath & Body</option>
                            <option className="select" value="Beauty-Hair-Care">Hair Care</option>
                          </optgroup>
                          <optgroup label="Home">
                            <option className="select" value="Home-Bath">Bath</option>
                            <option className="select" value="Home-Bedding">Bedding</option>
                            <option className="select" value="Home-Dining-Entertaining">Dining & Entertaining</option>
                            <option className="select" value="Home-Kitchen">Kitchen</option>
                            <option className="select" value="Home-Home-Decor">Home Decor</option>
                            <option className="select" value="Home-Luggage-Travel">Luggage & Travel</option>
                            <option className="select" value="Home-Furniture-Mattresses">Furniture & Mattresses</option>
                          </optgroup>
                          <optgroup label="More">
                            <option className="select" value="More-Tech-Accessories">Tech Accessories</option>
                            <option className="select" value="More-Art">Art</option>
                            <option className="select" value="More-Books-and-Magazines">Books and Magazines</option>
                            <option className="select" value="More-Music">Music</option>
                            <option className="select" value="More-Party-Supplies">Party Supplies</option>
                            <option className="select" value="More-Sports-Equipment">Sports Equipment</option>
                            <option className="select" value="More-Others">Others</option>
                          </optgroup>
                      </select>

                  </div>
                    <div className="condition-container">
                      <select className="condition" onChange={this.handleChange} name="condition" placeholder={condition}>
                        <option className="select" value="">{condition}</option>
                        <option className="select" value="Used-Fair">Used - Fair</option>
                        <option className="select" value="Used-Good">Used - Good</option>
                        <option className="select" value="Used-Very Good">Used - Very Good</option>
                        <option className="select" value="Used-Excellent">Used - Excellent</option>
                        <option className="select" value="Pristine">Pristine</option>
                      </select>
                    </div>
                    <div className="margin-top-1rem">
                      <input
                        id="brand"
                        type="text"
                        name="brand"
                        className="brand"
                        onChange={this.handleChange}
                        placeholder={brand}
                      />
                    </div>
                    <div className="size-container">
                      <h2 className="text-align-left margin-top-2rem margin-bottom-half">Enhance Your Description</h2>
                      <input
                        id="size"
                        type="text"
                        name="size"
                        onChange={this.handleChange}
                        className="size"
                        placeholder={size}
                      />
                    </div>
                    <div className="margin-top-1rem">
                      <input
                        id="color"
                        type="text"
                        name="color"
                        onChange={this.handleChange}
                        placeholder={color}
                        className="color"
                      />
                    </div>
                    <div className="margin-top-1rem">
                      <input
                        id="style"
                        type="text"
                        name="style"
                        onChange={this.handleChange}
                        placeholder={style}
                        className="style"
                      />
                    </div>
                    <div className="margin-top-1rem">
                      <h2 className="text-align-left margin-top-2rem margin-bottom-half">Location</h2>
                      <input
                        id="location"
                        type="text"
                        name="location"
                        onChange={this.handleChange}
                        className="location"
                        placeholder={location}
                    />
                    </div>
                    <div className="margin-top-1rem">
                      <h2 className="text-align-left margin-top-2rem margin-bottom-half">Price</h2>
                      <input
                          id="price"
                          type="text"
                          name="price"
                          onChange={this.handleChange}
                          placeholder={price}
                          className="price"
                        />
                </div>
                <div className="row space-between margin-top-1rem ">
                  <button type="submit" className="upload-button margin-bottom-1rem">Update</button>
                  <button onClick={e => { window.location.hash = '#myprofile'; }} className="cancel-button margin-bottom-1rem">Cancel</button>
                </div>
              </div>
              <div>
              </div>
            </div>
        </div>
      </form>
          </div >
        </div >
        <div className={handleValue}>
          <div className="menu-bar">
            <div className="z-index-5 text-align-center in-center">
              <h2 className="font-color-yellow">Delete this item?</h2>
              <div className="row justify-center space-between">
                <div className="margin-right-3rem">
                  <h4 onClick={this.handleDelete} className="font-color-yellow hover margin-top-1rem">Yes</h4>
                </div>
                <div className="margin-left-3rem">
                  <h4 onClick={this.handleValueStatus} className="font-color-yellow hover margin-top-1rem">No</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

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
      tryAgain: 'no'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileInputRef = React.createRef();
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.handleDeleteBox = this.handleDeleteBox.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
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

  handleConfirmDelete(event) {
    event.preventDefault();
    this.setState({
      tryAgain: 'no'
    });
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
          this.setState(result);
          window.location.hash = '#myprofile';
        });
    }
  }

  render() {
    const { imageURL, category, condition, location, price, title, size, brand, color, style, description, loading, offline, noId, tryAgain } = this.state;
    let showAgain = 'hidden';
    if (offline === true) {
      return <Off />;
    }
    if (loading === 'processing') {
      return <Loading />;
    }
    if (tryAgain === 'yes') {
      showAgain = '';
    }
    if (noId === 'yes') {
      return <TryAgain/>;
    }
    return (
      <div className="column-full">
        <div className={showAgain}>
          <div className="confirm-delete-box delete-box-height">
            <div className="margin-top-3rem">
              <div className="text-center">
                <h3 className="delete-top-margin">Price must be numbers only</h3>
              </div>
              <div className="row space-around margin-top-5rem">
                <button onClick={this.handleConfirmDelete} className="delete-confirm-button">Okay</button>
              </div>
            </div>
          </div>
        </div>
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
                    </div>
                    <hr></hr>
                    <div className="row">
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
                      <div>
                        <input
                          id="size"
                          type="text"
                          name="size"
                          onChange={this.handleChange}
                          placeholder={size}
                        />
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
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
                        <input
                          id="brand"
                          type="text"
                          name="brand"
                          onChange={this.handleChange}
                          placeholder={brand}
                        />
                      </div>
                      <div>
                        <input
                          id="style"
                          type="text"
                          name="brand"
                          onChange={this.handleChange}
                          placeholder={style}
                        />
                        <i onClick={this.handleDeleteBox} className="fa-solid fa-delete-left fa-2x"></i>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div>
                        <input
                          id="color"
                          type="text"
                          name="color"
                          onChange={this.handleChange}
                          placeholder={color}
                        />
                      </div>
                      <div className="location-container">
                        <input
                          id="location"
                          type="text"
                          name="location"
                          onChange={this.handleChange}
                          className="edit-text-width-first-half"
                          placeholder={location}
                        />
                      </div>
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
                        wrap="hard"
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

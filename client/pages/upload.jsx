import React from 'react';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: '',
      location: '',
      price: '',
      title: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return <div className="column-full">
      <div className="upload-container">
      <form>
        <label></label>
        <div className="row">
          <div className="column-half">
            <div className="image-container">
              <img src="images/image-placeholder.png"></img>
              <button className="search-button margin-top-1rem">Search</button>
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
                onChagne={this.handleChange}
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

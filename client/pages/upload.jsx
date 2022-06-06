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
              <image></image>
            </div>
            <div>
              <label htmlFor="condition">Condition</label>
              <select name="condition" required>
                <option value="very used">very used</option>
                <option value="used">used</option>
                <option value="like new">like new</option>
                <option value="brand new">brand new</option>
              </select>
              <input
              required
              id="location"
              type="text"
              name="location"
              onChange={this.handleChange}
              />
              <input
              required
              id="price"
              type="text"
              name="price"
              onChagne={this.handleChange}
              />
            </div>
          </div>
          <div className="column-half">
            <input
            required
            id="title"
            type="text"
            name="title"
            onChange={this.handleChange}
            />
            <hr/>
            <input
            required
            id="description"
            type="text"
            name="description"
            onChange={this.handleChange}
            />
          </div>
        </div>
      </form>
      </div>
    </div>;
  }
}

import React from 'react';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: screen.width,
      dropdown: 'no'
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(event) {
    const { dropdown } = this.state;
    if (dropdown === 'yes') {
      this.setState({ dropdown: 'no' });
    } else {
      this.setState({ dropdown: 'yes' });
    }
  }

  render() {
    const { screen, dropdown } = this.state;
    let classValue = 'hidden';
    if (dropdown === 'no') {
      classValue = 'hidden';
    } else {
      classValue = 'dropdown';
    }
    if (screen > 600) {
      return (
      <div className="column-full category-container">
        <ul className="auto padding-0">
          <div className="row">
            <div className="category-list">
              <li>
                <a onClick={this.handleFilter}className="category-title">Men</a>
                <ul className={classValue} id="drop-down-width">
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#categories?keyword=Mens">Show All</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Menswear-Tops">Tops</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Menswear-Bottoms">Bottoms</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Menswear-Coats-and-Jackets">Coats and Jackets</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Menswear-Jumpsuits-and-Rompers">Jumpsuits and Rompers</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Menswear-Suits">Suits</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Menswear-Footwear">Footwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Menswear-Accessories">Accessories</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Menswear-Sleepwear">Sleepwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Menswear-Underwear">Underwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Menswear-Swimwear">Swimwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Menswear-Costume">Costume</a></li>
                </ul>
              </li>
            </div>
            <div className="category-list">
              <li>
                <a onClick={this.handleFilter}className="category-title">Women</a>
                <ul className={classValue} id="drop-down-width">
                  <li onClick={this.handleFilter} className="select"><a className="category-link-text" onClick={this.handleFilter} href="#categories?keyword=Womens">Show All</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Womenswear-Tops">Tops</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Womenswear-Bottoms">Bottoms</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Womenswear-Coats-and-Jackets">Coats and Jackets</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Womenswear-Jumpsuits-and-Rompers">Jumpsuits and Rompers</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Womenswear-Suits">Suits</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Womenswear-Footwear">Footwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Womenswear-Accessories">Accessories</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Womenswear-Sleepwear">Sleepwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Womenswear-Underwear">Underwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Womenswear-Swimwear">Swimwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Womenswear-Costume">Costume</a></li>
                </ul>
              </li>
            </div>
            <div className="category-list">
              <li>
                <a onClick={this.handleFilter}className="category-title">Kids</a>
                <ul className={classValue} id="drop-down-width">
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#categories?keyword=Kids">Show All</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Kids-Tops">Tops</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Kids-Bottoms">Bottoms</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Kids-Coats-and-Jackets">Coats and Jackets</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Kids-Jumpsuits-and-Rompers">Jumpsuits and Rompers</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Kids-Suits">Suits</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Kids-Footwear">Footwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Kids-Accessories">Accessories</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Kids-Sleepwear">Sleepwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Kids-Underwear">Underwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Kids-Swimwear">Swimwear</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Kids-Costume">Costume</a></li>
                </ul>
              </li>
            </div>
            <div className="category-list">
              <li>
                <a onClick={this.handleFilter}className="category-title">Jewelery</a>
                <ul className={classValue} id="drop-down-width">
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#categories?keyword=Jewelery">Show All</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Jewelery-Necklace">Necklace</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Jewelery-Pins">Pins</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Jewelery-Body">Body Jewelry</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Jewelery-Bracelets">Bracelets</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Jewelery-Earrings">Earrings</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Jewelery-Rings">Rings</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Jewelery-Watches">Watches</a></li>
                </ul>
              </li>
            </div>
            <div className="category-list">
              <li>
                <a onClick={this.handleFilter}className="category-title">Beauty</a>
                <ul className={classValue} id="drop-down-width">
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#categories?keyword=Beauty">Show All</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Beauty-Face">Face</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Beauty-Eyes">Eyes</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Beauty-Lips">Lips</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Beauty-Perfume">Perfume</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Beauty-Bath-Body">Bath & Body</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Beauty-Hair-Care">Hair Care</a></li>
                </ul>
              </li>
            </div>
            <div className="category-list">
              <li>
                <a onClick={this.handleFilter}className="category-title">Home Goods</a>
                <ul className={classValue} id="drop-down-width">
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#categories?keyword=Home">Show All</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Home-Bath">Bath</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Home-Bedding">Bedding</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Home-Dining">Dining</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Home-Kitchen">Kitchen</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Home-Home-Decor">Bath & Body</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Home-Luggage-travel">Home-Luggage & Travel</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=Home-Furniture">Furniture</a></li>
                </ul>
              </li>
            </div>
            <div className="category-list">
              <li>
                <a onClick={this.handleFilter}className="category-title">More</a>
                <ul className={classValue} id="drop-down-width">
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#categories?keyword=More">Show All</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=More-Tech-Accessories">Tech Accessories</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=More-Art">Art</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=More-Books-and-Magazines">Books and Magazines</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=More-Music">Music</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=More-Party-Supplies">Party Supplies</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=More-Sports-Equipment">Sports Equipment</a></li>
                  <li className="select"><a className="category-link-text" onClick={this.handleFilter} href="#category?keyword=More-Others">Others</a></li>
                </ul>
              </li>
            </div>
            </div>
          </ul>
      </div>
      );
    }
  }
}

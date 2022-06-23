import React from 'react';

export default class CategoryIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'no'
    };
    this.handleCategory = this.handleCategory.bind(this);
  }

  handleCategory() {
    this.setState({ display: 'yes' });
    if (this.state.display === 'yes') {
      this.setState({ display: 'no' });
    }
  }

  render() {
    const { display } = this.state;
    if (display === 'no') {
      return <i onClick={this.handleCategory} className="fa-solid fa-list-ul fa-xl"></i>;
    }
    if (display === 'yes') {
      return (
        <div className="menu-bar">
          <ul className="auto padding-0">
            <div className="category-icon-list-container">
              <div className="category-icon-list">
                <div className="category-list">
                  <li>
                    <a href="#" className="category-title">Home</a>
                  </li>
                </div>
                <div className="category-list">
                  <li>
                    <a className="category-title">Mens</a>
                    <ul className="dropdown column-half">
                      <li className="select"><a className="category-link-text" href="#categories?keyword=Mens">Show All</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Menswear-Tops">Tops</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Menswear-Bottoms">Bottoms</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Menswear-Coats-and-Jackets">Coats and Jackets</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Menswear-Jumpsuits-and-Rompers">Jumpsuits and Rompers</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Menswear-Suits">Suits</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Menswear-Footwear">Footwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Menswear-Accessories">Accessories</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Menswear-Sleepwear">Sleepwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Menswear-Underwear">Underwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Menswear-Swimwear">Swimwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Menswear-Costume">Costume</a></li>
                    </ul>
                  </li>
                </div>
                <div className="category-list">
                  <li>
                    <a className="category-title">Women</a>
                    <ul className="dropdown column-half">
                      <li className="select"><a className="category-link-text" href="#categories?keyword=Womens">Show All</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Womenswear-Tops">Tops</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Womenswear-Bottoms">Bottoms</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Womenswear-Coats-and-Jackets">Coats and Jackets</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Womenswear-Jumpsuits-and-Rompers">Jumpsuits and Rompers</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Womenswear-Suits">Suits</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Womenswear-Footwear">Footwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Womenswear-Accessories">Accessories</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Womenswear-Sleepwear">Sleepwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Womenswear-Underwear">Underwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Womenswear-Swimwear">Swimwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Womenswear-Costume">Costume</a></li>
                    </ul>
                  </li>
                </div>
                <div className="category-list">
                  <li>
                    <a className="category-title">Kids</a>
                    <ul className="dropdown column-half">
                      <li className="select"><a className="category-link-text" href="#categories?keyword=Kids">Show All</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Kids-Tops">Tops</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Kids-Bottoms">Bottoms</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Kids-Coats-and-Jackets">Coats and Jackets</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Kids-Jumpsuits-and-Rompers">Jumpsuits and Rompers</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Kids-Suits">Suits</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Kids-Footwear">Footwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Kids-Accessories">Accessories</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Kids-Sleepwear">Sleepwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Kids-Underwear">Underwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Kids-Swimwear">Swimwear</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Kids-Costume">Costume</a></li>
                    </ul>
                  </li>
                </div>
                <div className="category-list">
                  <li>
                    <a className="category-title">Jewelery</a>
                    <ul className="dropdown column-half">
                      <li className="select"><a className="category-link-text" href="#categories?keyword=Jewelery">Show All</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Jewelery-Necklace">Necklace</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Jewelery-Pins">Pins</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Jewelery-Body">Body Jewelry</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Jewelery-Bracelets">Bracelets</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Jewelery-Earings">Earings</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Jewelery-Rings">Rings</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Jewelery-Watches">Watches</a></li>
                    </ul>
                  </li>
                </div>
                <div className="category-list">
                  <li>
                    <a className="category-title">Beauty</a>
                    <ul className="dropdown column-half">
                      <li className="select"><a className="category-link-text" href="#categories?keyword=Beauty">Show All</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Beauty-Face">Face</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Beauty-Eyes">Eyes</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Beauty-Lips">Lips</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Beauty-Perfume">Perfume</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Beauty-Bath-Body">Bath & Body</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Beauty-Hair-Care">Hair Care</a></li>
                    </ul>
                  </li>
                </div>
                <div className="category-list">
                  <li>
                    <a className="category-title">Home</a>
                    <ul className="dropdown column-half">
                      <li className="select"><a className="category-link-text" href="#categories?keyword=Home">Show All</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Home-Bath">Bath</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Home-Bedding">Bedding</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Home-Dining">Dining</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Home-Kitchen">Kitchen</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Home-Home-Decor">Bath & Body</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Home-Luggage-travel">Home-Luggage & Travel</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=Home-Furniture">Furniture</a></li>
                    </ul>
                  </li>
                </div>
                <div className="category-list">
                  <li>
                    <a className="category-title">More</a>
                    <ul className="dropdown column-half">
                      <li className="select"><a className="category-link-text" href="#categories?keyword=More">Tech Accessories</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=More-">Art</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=More-Books-and-Magazines">Books and Magazines</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=More-Music">Music</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=More-Party-Supplies">Party Supplies</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=More-Sports-Equipment">Sports Equipment</a></li>
                      <li className="select"><a className="category-link-text" href="#category?keyword=More-Others">Others</a></li>
                    </ul>
                  </li>
                </div>
                <div className="category-list">
                  <li>
                    <a onClick={this.handleCategory}className="category-title">Close</a>
                  </li>
                </div>
              </div>
            </div>
          </ul>
        </div>
      );
    }
  }
}

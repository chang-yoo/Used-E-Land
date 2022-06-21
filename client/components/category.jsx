import React from 'react';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.keyword
    };
  }

  render() {
    return (
      <div className="column-full">
            <ul>
          <div className="row space-around">
            <div className="category-list">
            <li>
              <a href="">Mens &#9662;</a>
              <ul className="dropdown">
                <li className="select"><a href="#categories?keyword=Mens">Show All</a></li>
                <li className="select"><a href="#category?keyword=Menswear-Tops">Tops</a></li>
                <li className="select"><a href="#category?keyword=Menswear-Bottoms">Bottoms</a></li>
                <li className="select"><a href="#category?keyword=Menswear-Coats">Coats and Jackets</a></li>
                <li className="select"><a href="#category?keyword=Menswear-Jumpsuits">Jumpsuits and Rompers</a></li>
                <li className="select"><a href="#category?keyword=Menswear-Suits">Suits</a></li>
                <li className="select"><a href="#category?keyword=Menswear-Footwear">Footwear</a></li>
                <li className="select"><a href="#category?keyword=Menswear-Accessories">Accessories</a></li>
                <li className="select"><a href="#category?keyword=Menswear-Sleepwear">Sleepwear</a></li>
                <li className="select"><a href="#category?keyword=Menswear-Underwear">Underwear</a></li>
                <li className="select"><a href="#category?keyword=Menswear-Swimwear">Swimwear</a></li>
                <li className="select"><a href="#category?keyword=Menswear-Costume">Costume</a></li>
              </ul>
            </li>
            </div>
            <div className="category-list">
            <li>
              <a href="">Women &#9662;</a>
              <ul className="dropdown">
                  <li className="select"><a href="#categories?keyword=Womens">Show All</a></li>
                <li className="select"><a href="#category?keyword=Womenswear-Tops">Tops</a></li>
                <li className="select"><a href="#category?keyword=Womenswear-Bottoms">Bottoms</a></li>
                <li className="select"><a href="#category?keyword=Womenswear-Coats">Coats and Jackets</a></li>
                <li className="select"><a href="#category?keyword=Womenswear-Jumpsuits">Jumpsuits and Rompers</a></li>
                <li className="select"><a href="#category?keyword=Womenswear-Suits">Suits</a></li>
                <li className="select"><a href="#category?keyword=Womenswear-Footwear">Footwear</a></li>
                <li className="select"><a href="#category?keyword=Womenswear-Accessories">Accessories</a></li>
                <li className="select"><a href="#category?keyword=Womenswear-Sleepwear">Sleepwear</a></li>
                <li className="select"><a href="#category?keyword=Womenswear-Underwear">Underwear</a></li>
                <li className="select"><a href="#category?keyword=Womenswear-Swimwear">Swimwear</a></li>
                <li className="select"><a href="#category?keyword=Womenswear-Costume">Costume</a></li>
              </ul>
            </li>
            </div>
            <div className="category-list">
              <li>
                <a href="">Kids &#9662;</a>
                <ul className="dropdown">
                  <li className="select" value="Kids-all"><a href="">Show All</a></li>
                  <li className="select" value="Kids-Tops"><a href="">Tops</a></li>
                  <li className="select" value="Kids-Bottoms"><a href="">Bottoms</a></li>
                  <li className="select" value="Kids-Coats and Jackets"><a href="">Coats and Jackets</a></li>
                  <li className="select" value="Kids-Jumpsuits and Rompers"><a href="">Jumpsuits and Rompers</a></li>
                  <li className="select" value="Kids-Suits"><a href="">Suits</a></li>
                  <li className="select" value="Kids-Footwear"><a href="">Footwear</a></li>
                  <li className="select" value="Kids-Accessories"><a href="">Accessories</a></li>
                  <li className="select" value="Kids-Sleepwear"><a href="">Sleepwear</a></li>
                  <li className="select" value="Kids-Underwear"><a href="">Underwear</a></li>
                  <li className="select" value="Kids-Swimwear"><a href="">Swimwear</a></li>
                  <li className="select" value="Kids-Costume"><a href="">Costume</a></li>
                </ul>
              </li>
            </div>
            <div className="category-list">
              <li>
                <a href="">Jewelery &#9662;</a>
                <ul className="dropdown">
                  <li className="select" value="Jewelery-Necklaces"><a href="">Necklaces</a></li>
                  <li className="select" value="Jewelery-Pins"><a href="">Pins</a></li>
                  <li className="select" value="Jewelery-Body Jewelry"><a href="">Body Jewelry</a></li>
                  <li className="select" value="Jewelery-Perfume"><a href="">Perfume</a></li>
                  <li className="select" value="Jewelery-Bath & Body"><a href="">Bath & Body</a></li>
                  <li className="select" value="Jewelery-Hair Care"><a href="">Hair Care</a></li>
                </ul>
              </li>
            </div>
            <div className="category-list">
              <li>
                <a href="">Home &#9662;</a>
                <ul className="dropdown">
                  <li className="select" value="Home-Bath"><a href="">Bath</a></li>
                  <li className="select" value="Home-Bedding"><a href="">Bedding</a></li>
                  <li className="select" value="Home-Dining & Entertaining"><a href="">Dining & Entertaining</a></li>
                  <li className="select" value="Home-Kitchen"><a href="">Kitchen</a></li>
                  <li className="select" value="Home-Home Decor"><a href="">Home Decor</a></li>
                  <li className="select" value="Home-Luggage & Travel"><a href="">Luggage & Travel</a></li>
                  <li className="select" value="Home-Furniture & Mattresses"><a href="">Furniture & Mattresses</a></li>
                </ul>
              </li>
            </div>
            <div className="category-list">
              <li>
                <a href="">More &#9662;</a>
                <ul className="dropdown">
                  <li className="select" value="More-Tech Accessories"><a href="">Tech Accessories</a></li>
                  <li className="select" value="More-Art"><a href="">Art</a></li>
                  <li className="select" value="More-Books and Magazines"><a href="">Books and Magazines</a></li>
                  <li className="select" value="More-Music"><a href="">Music</a></li>
                  <li className="select" value="More-Party Supplies"><a href="">Party Supplies</a></li>
                  <li className="select" value="More-Sports Equipment"><a href="">Sports Equipment</a></li>
                  <li className="select" value="More-Others"><a href="">Others</a></li>
                </ul>
              </li>
            </div>
            </div>
          </ul>
      </div>
    );
  }
}

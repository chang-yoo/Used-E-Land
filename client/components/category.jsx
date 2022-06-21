import React from 'react';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
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
                <li className="select" value="Menswear-all"><a href="">Show All</a></li>
                <li className="select" value="Menswear-Tops"><a href="">Tops</a></li>
                <li className="select" value="Menswear-Bottoms"><a href="">Bottoms</a></li>
                <li className="select" value="Menswear-Coats and Jackets"><a href="">Coats and Jackets</a></li>
                <li className="select" value="Menswear-Jumpsuits and Rompers"><a href="">Jumpsuits and Rompers</a></li>
                <li className="select" value="Menswear-Suits"><a href="">Suits</a></li>
                <li className="select" value="Menswear-Footwear"><a href="">Footwear</a></li>
                <li className="select" value="Menswear-Accessories"><a href="">Accessories</a></li>
                <li className="select" value="Menswear-Sleepwear"><a href="">Sleepwear</a></li>
                <li className="select" value="Menswear-Underwear"><a href="">Underwear</a></li>
                <li className="select" value="Menswear-Swimwear"><a href="">Swimwear</a></li>
                <li className="select" value="Menswear-Costume"><a href="">Costume</a></li>
              </ul>
            </li>
            </div>
            <div className="category-list">
            <li>
              <a href="">Women &#9662;</a>
              <ul className="dropdown">
                <li className="select" value="Womenswear-all"><a href="">Show All</a></li>
                <li className="select" value="Womenswear-Tops"><a href="">Tops</a></li>
                <li className="select" value="Womenswear-Bottoms"><a href="">Bottoms</a></li>
                <li className="select" value="Womenswear-Coats and Jackets"><a href="">Coats and Jackets</a></li>
                <li className="select" value="Womenswear-Jumpsuits and Rompers"><a href="">Jumpsuits and Rompers</a></li>
                <li className="select" value="Womenswear-Suits"><a href="">Suits</a></li>
                <li className="select" value="Womenswear-Footwear"><a href="">Footwear</a></li>
                <li className="select" value="Womenswear-Accessories"><a href="">Accessories</a></li>
                <li className="select" value="Womenswear-Sleepwear"><a href="">Sleepwear</a></li>
                <li className="select" value="Womenswear-Underwear"><a href="">Underwear</a></li>
                <li className="select" value="Womenswear-Swimwear"><a href="">Swimwear</a></li>
                <li className="select" value="Womenswear-Costume"><a href="">Costume</a></li>
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

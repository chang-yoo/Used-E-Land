import React from 'react';
import List from '../components/list';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'processing',
      offline: false
    };
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
    this.setState({ loading: 'complete' });
  }

  render() {
    const { loading, offline } = this.state;
    if (loading === 'processing') {
      return <Loading />;
    }
    if (offline === true) {
      return <Off />;
    }
    return (
      <div className="column-full">
        <div className="main-list-background column-full">
          <div className="rows">
            <div className="column-half main-image-furniture">
              <img src="images/furniture.jpeg"/>
            </div>
            <div className="column-half main-image-furniture-text-container">
              <img src="images/main-image-furniture-text-background.png"/>
              <div className="main-image-furniture-text text-align-center">
                <p className="main-image-furniture-actual-text">FILL UP YOUR <br/> DREAM WITH <br/> PRELOVED ITEMS</p>
                <a href="#all"><button className="main-show-now-button">Shop Now</button></a>
              </div>
            </div>
          </div>
          <h1 className="margin-0">WHAT&apos;S NEW TODAY</h1>
          <div className="row wrap justify-center">
            <List key={this.props.postId}/>
          </div>
          <div className="column-full closet-image-container">
            <img src="images/closet.jpeg"/>
            <div className="closet-image-text text-align-center">
              <p className="closet-image-h1">DISCOVER YOUR STYLE AND <br/> SELL YOUR OWN</p>
              <a href="#all"><button className="main-show-more-button shop-more">SHOP MORE</button></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

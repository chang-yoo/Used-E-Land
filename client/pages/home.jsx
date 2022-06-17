import React from 'react';
import List from '../components/list';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';

const images = [
  { id: 0, image: '../../server/public/images/carousel-1.png' },
  { id: 1, image: '../../server/public/images/carousel-2.png' },
  { id: 2, image: '../../server/public/images/carousel-3.png' }
];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      imageSrc: images[0],
      loading: 'processing',
      offline: false
    };
    this.nextImage = this.nextImage.bind(this);
    this.imageSwap = this.imageSwap.bind(this);
  }

  nextImage() {
    clearInterval(this.timerId);
    const { current } = this.state;
    if (current >= 0) {
      this.setState({ current: current + 1 });
    }
    if (current === images.length - 1) {
      this.setState({ current: 0 });
    }
    this.timerId = setInterval(() => this.nextImage(), 5000);
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
    this.timerId = setInterval(() => this.nextImage(), 5000);
    this.setState({ loading: 'complete' });
  }

  imageSwap(event) {
    clearInterval(this.timerId);
    const dotId = Number(event.target.id);
    this.setState({ current: dotId });
    this.timerId = setInterval(() => this.nextImage(), 5000);
  }

  render() {
    const { current, loading, offline } = this.state;
    if (loading === 'processing') {
      return <Loading />;
    }
    if (offline === true) {
      return <Off />;
    }
    return (
      <div className="column-full">
        <div className="home-image-container">
          {images.map(image => {
            if (current === image.id) {
              return <div key={image.id}className="main-image">
                       <img key={image.id} src={image.image}></img>
                     </div>;
            } else {
              return null;
            }
          })
        }
        </div>
          <div className="dot-container vertical-margin">
            {images.map(dot => {
              if (this.state.current === dot.id) {
                return <i key={dot.id} id={dot.id} onClick={this.imageSwap} className='fas fa-circle horz-margin'></i>;
              } else {
                return <i key={dot.id} id={dot.id} onClick={this.imageSwap} className='far fa-circle horz-margin'></i>;
              }
            })}
          </div>
        <div className="list-background column-full">
          <h1>Most Recent</h1>
          <div className="row wrap">
            <List key={this.props.postId}/>
          </div>
        </div>
      </div>
    );
  }
}

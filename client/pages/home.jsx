import React from 'react';
import List from '../components/list';

const images = [
  { id: 0, image: 'images/carousel-1.png' },
  { id: 1, image: 'images/carousel-2.png' },
  { id: 2, image: 'images/carousel-3.png' }
];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      imageSrc: images[0]
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
    this.timerId = setInterval(() => this.nextImage(), 5000);
  }

  imageSwap(event) {
    clearInterval(this.timerId);
    const dotId = Number(event.target.id);
    this.setState({ current: dotId });
    this.timerId = setInterval(() => this.nextImage(), 5000);
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <div className="home-image-container">
          {images.map(image => {
            if (current === image.id) {
              return <img className="main-image" key={image.id} src={image.image}></img>;
            } else {
              return null;
            }
          })
        }
        </div>
        <div className="dot-container">
          {images.map(dot => {
            if (this.state.current === dot.id) {
              return <i key={dot.id} id={dot.id} onClick={this.imageSwap} className='fas fa-circle horz-margin'></i>;
            } else {
              return <i key={dot.id} id={dot.id} onClick={this.imageSwap} className='far fa-circle horz-margin'></i>;
            }
          })}
        </div>
        <div className="list-background">
          <h1>Most Recent</h1>
          <div className="row">
            <List />
          </div>
        </div>
      </div>
    );
  }
}

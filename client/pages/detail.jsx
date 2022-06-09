import React from 'react';
import Contact from '../components/contact';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ''
    };
  }

  componentDidMount() {
    fetch(`/api/post/${this.props.postId}`)
      .then(res => res.json())
      .then(result => {
        const [data] = result;
        this.setState({
          post: data
        });
      });
  }

  render() {
    const { post } = this.state;
    return (
      <div className="detail-container">
        <div className="row detail-background">
          <Contact key={post.postId} postData={post} />
          <div className="detail-description column-half">
            <div className="detail-image-container">
              <img src={post.imageURL}></img>
            </div>
            <div className="detail-text">
              <div className="row space-even">
                <h4>username: {post.username} </h4>
                <h4>rating</h4>
              </div>
              <h4>condition: {post.condition}</h4>
              <p className="font-size-20">{post.location}</p>
              <h3 className="price font-size">${post.price}</h3>
            </div>
          </div>
          <div className="detail-description column-half">
            <h2>{post.title}</h2>
            <hr></hr>
            <h2>Description:<br /><br />{post.description}</h2>
          </div>
        </div>
      </div>
    );
  }
}

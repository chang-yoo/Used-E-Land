import React from 'react';

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: []
    };
  }

  render() {
    const { completed } = this.state;
    if (completed.length === 0) {
      return <div className="list-background">
              <h1 className="margin-padding-bottom-0">Currently Empty!</h1>
              <a className="return-home" href="#">Return Home</a>
            </div>;
    }
    return (
      <div className="row wrap">
        {completed.map(eachpost => {
          return (
            <div key={eachpost.postId} className="one-fourth-container post">
              <a href={`#edit?postId=${eachpost.postId}`}><i className="fa-solid fa-pen-to-square"></i></a>
              <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId}>
                <div className="each-post">
                  <div className="postlistimage-container">
                    <img className='postlist-image' src={eachpost.imageURL}></img>
                  </div>
                  <div className="postlist-text">
                    <h3 className="postlist-title">{eachpost.title}</h3>
                    <p>{eachpost.condition}</p>
                    <p>{eachpost.location}</p>
                    <h5 className="price">${eachpost.price}</h5>
                  </div>
                </div>
              </a>
            </div>
          );
        }
        )}
      </div>
    );
  }
}

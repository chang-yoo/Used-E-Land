import React from 'react';
import { Loading } from '../components/spinner';
import { Off } from '../components/offline';
import { TryAgain } from '../components/try-again';

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: [],
      loading: 'processing',
      offline: false,
      noId: 'no',
      userId: this.props.userId
    };
  }

  componentDidMount() {
    const { userId } = this.state;
    window.addEventListener('offline', event => this.setState({ offline: true }));
    if (!userId || userId === 0) {
      this.setState({
        loading: 'complete',
        noId: 'yes'
      });
    }
    fetch(`/api/complete/${this.props.userId}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          completed: result,
          loading: 'complete'
        });
      });
  }

  render() {
    const { completed, loading, offline } = this.state;
    if (loading === 'processing') {
      return <Loading />;
    }
    if (offline === true) {
      return <Off />;
    }
    if (completed.length === 0) {
      return <div className="list-background">
               <div>
                <h3 className="margin-left-1rem">No items sold yet</h3>
               </div>
              <div className="text-align-center in-center">
                 <h4>Once sold, items will show up here</h4>
                 <a className="font-color" href="#">Return Home</a>
               </div>
             </div>;
    }
    if (completed.length > 0 && loading === 'complete') {
      return (
      <div className="list-background">
        <h3 className='margin-left-1rem'>{completed[0].username}&apos;s sold items</h3>
        <div className="row wrap">
          {completed.map(eachpost => {
            return (
              <div key={eachpost.postId} className="one-fourth-container post">
                <a href={`#post?postId=${eachpost.postId}`} id={eachpost.postId}>
                  <div className="each-post">
                    <div className="postlistimage-container">
                      <img className='postlist-image' src={eachpost.imageURL}></img>
                    </div>
                    <div className="postlist-text text-align-center">
                      <h3 className="margin-top-half-rem postlist-title">{eachpost.title}</h3>
                      <p className="margin-bottom-1rem">{eachpost.location}</p>
                      <h5 className="vert-space-0 price font-size-20">${eachpost.price}</h5>
                    </div>
                  </div>
                </a>
              </div>
            );
          }
          )}
        </div>
      </div>
      );
    }
    return <TryAgain/>;
  }
}

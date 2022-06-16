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
      noId: 'no'
    };
  }

  componentDidMount() {
    if (!`${this.props.userId}`) {
      this.setState({
        loading: 'complete',
        noId: 'yes'
      });
    }
    window.addEventListener('offline', event => this.setState({ offline: true }));
    fetch(`/api/complete/${this.props.userId}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          completed: result,
          loading: 'complete'
        });
        const { error } = result;
        if (error) {
          this.setState({
            loading: 'complete',
            noId: 'yes'
          });
        }
      });
  }

  render() {
    const { completed, loading, offline, noId } = this.state;
    if (loading === 'processing') {
      return <Loading />;
    }
    if (offline === true) {
      return <Off />;
    }
    if (completed.length === 0) {
      return <div className="list-background">
               <div>
                 <h1 className="margin-padding-bottom-0">Currently Empty!</h1>
               </div>
              <div className="text-align-center in-center">
                 <h1>You didn&apos;t make any history yet</h1>
                 <a className="font-color" href="#">Return Home</a>
               </div>;
             </div>;
    }
    if (noId === 'yes') {
      return <TryAgain/>;
    }
    return (
      <div className="list-background top-6-rem">
        <h1>{completed[0].username}&apos;s History</h1>
        <div className="row wrap">
          {completed.map(eachpost => {
            return (
              <div key={eachpost.postId} className="one-fourth-container post">
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
      </div>
    );
  }
}

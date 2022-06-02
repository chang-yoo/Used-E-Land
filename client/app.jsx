import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import parseRoute from './lib/parse-route.js';
import Detail from './pages/detail';
import PageContainer from './components/page-container';
import SearchResult from './components/SearchResult';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    } else if (path === 'post') {
      return <Detail postId={this.state.route.params.get('postId')} />;
    } else if (path === 'search') {
      return <SearchResult keyword={this.state.route.params.get('keyword')} />;
    } else if (path === 'sign-in') {
      return <SignIn />;
    } else if (path === 'sign-up') {
      return <SignUp />;
    }
  }

  render() {
    return (
    <div>
      <Header />
      <PageContainer>
        {this.renderPage()}
      </PageContainer>
    </div>
    );
  }
}

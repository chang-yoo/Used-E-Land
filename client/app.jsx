import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import parseRoute from './lib/parse-route.js';
import Detail from './pages/detail';
import PageContainer from './components/page-container';
import SearchResult from './components/SearchResult';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import MyProfile from './pages/MyProfile';
import jwtDecode from 'jwt-decode';
import HeaderAfterSiginIn from './components/header-aftersignin';
import Upload from './pages/upload';
import Edit from './pages/edit';
import Favorite from './pages/Favorite';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      isAuthorize: 'no'
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('lfz-final');
    if (!token) {
      this.setState({ isAuthorize: 'no' });
    }
    if (token && jwtDecode(token)) {
      this.setState({ isAuthorize: 'yes' });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.route !== this.state.route) {
      const token = window.localStorage.getItem('lfz-final');
      if (!token) {
        this.setState({ isAuthorize: 'no' });
      }
      if (token && jwtDecode(token)) {
        this.setState({ isAuthorize: 'yes' });
      }
    }
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
    } else if (path === 'myprofile') {
      return <MyProfile userId={this.state.route.params.get('userId')} />;
    } else if (path === 'upload') {
      return <Upload />;
    } else if (path === 'edit') {
      return <Edit postId={this.state.route.params.get('postId')} />;
    } else if (path === 'favorite') {
      return <Favorite />;
    }
  }

  render() {
    const { isAuthorize } = this.state;
    if (isAuthorize === 'yes') {
      return (
      <div>
        <HeaderAfterSiginIn />
        <PageContainer>
          {this.renderPage()}
        </PageContainer>
      </div>
      );
    } else {
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
}

import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import parseRoute from './lib/parse-route.js';
import Detail from './pages/detail';
import PageContainer from './components/page-container';
import SearchResult from './components/search-result';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import MyProfile from './pages/my-profile';
import jwtDecode from 'jwt-decode';
import HeaderAfterSiginIn from './components/header-aftersignin';
import Upload from './pages/upload';
import Edit from './pages/edit';
import Favorite from './pages/favorite';
import History from './pages/history';
import Review from './pages/review';
import NotFound from './components/not-found';
import { Off } from './components/offline';
import { Loading } from './components/spinner';
import ViewAll from './pages/all';
import Category from './components/category';
import CategorySearch from './pages/category-search';
import ShowAll from './pages/show-all';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      isAuthorize: 'no',
      offline: false
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('offline', event => this.setState({ offline: true }));
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
    } else if (path === 'history') {
      return <History userId={this.state.route.params.get('userId')}/>;
    } else if (path === 'review') {
      return <Review userId={this.state.route.params.get('userId')} />;
    } else if (path === 'all') {
      return <ViewAll />;
    } else if (path === 'category') {
      return <CategorySearch keyword={this.state.route.params.get('keyword')} />;
    } else if (path === 'categories') {
      return <ShowAll keyword ={this.state.route.params.get('keyword')}/>;
    } else {
      return <NotFound />;
    }
  }

  render() {
    const { isAuthorize, offline, loading } = this.state;
    if (offline === true) {
      return <Off/>;
    }
    if (loading === 'processing') {
      return <Loading />;
    }
    if (isAuthorize === 'yes') {
      return (
      <div className="column-full">
        <HeaderAfterSiginIn />
        <Category />
        <PageContainer>
          {this.renderPage()}
        </PageContainer>
      </div>
      );
    } else {
      return (
        <div className="column-full">
          <Header />
          <Category />
          <PageContainer>
            {this.renderPage()}
          </PageContainer>
        </div>
      );
    }
  }
}

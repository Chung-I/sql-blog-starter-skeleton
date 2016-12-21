import React, { Component } from 'react';

import HomePage from './HomePage';
import SingleUserHomePage from './SingleUserHomePage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import ArticlesPage from './ArticlesPage';
import SingleArticlePage from './SingleArticlePage';
import CreateArticlePage from './CreateArticlePage';

class App extends Component {
  state = {
    route: window.location.hash.substr(1),
    user: null,
  };

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }


  renderRoute() {
    if (this.state.user === null) {
      if (this.state.route === '/signin') {
        return <SignInPage setUserInfo={user => { this.setState({ user }); }} />;
      }
      if (this.state.route === '/signup') {
        return <SignUpPage setUserInfo={user => { this.setState({ user }); }} />;
      }
    } else {
      if (this.state.route === '/articles') {
        return <ArticlesPage user={this.state.user} />;
      }

      if (this.state.route === '/articles/new') {
        return <CreateArticlePage user={this.state.user} />;
      }

      if (this.state.route.startsWith('/articles/')) {
        const id = this.state.route.split('/articles/')[1];
        return <SingleArticlePage id={id} user={this.state.user} />;
      }
      return <SingleUserHomePage user={this.state.user} />;
    }
    return <HomePage />;
  }

  renderBreadcrumb() {
    if (this.state.route === '/articles') {
      return (
        <ol className="breadcrumb">
          <li><a href="#/">Home</a></li>
          <li><a href="#/articles">Articles</a></li>
        </ol>
      );
    }

    if (this.state.route.startsWith('/articles/')) {
      const id = this.state.route.split('/articles/')[1];
      return (
        <ol className="breadcrumb">
          <li><a href="#/">Home</a></li>
          <li><a href="#/articles">Articles</a></li>
          <li><a href={`#/articles/${id}`}>{id}</a></li>
        </ol>
      );
    }

    return (
      <ol className="breadcrumb">
        <li><a href="#/">Home</a></li>
      </ol>
    );
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#/">Web Seminar - Blog</a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <a href="#/">Home</a>
              </li>
              <li>
                <a href="#/articles">Articles</a>
              </li>
              {this.state.user ? (<li>
                <a href="#/" onClick={() => { this.setState({ user: null }); }}>Log Out</a>
              </li>) : null}
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.renderBreadcrumb()}
            </div>
          </div>
        </div>
        {this.renderRoute()}
      </div>
    );
  }
}


export default App;

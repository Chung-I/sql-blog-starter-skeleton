import React, { Component } from 'react';


class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      loginFailed: false,
    };
  }

  handleUsernameChange = e => {
    this.setState({
      name: e.target.value
    });
  }

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmitClick = () => {
    const body = this.state;
    fetch('/api/auth/signin', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body),
    }).then(res => res.json())
    .then(user => {
      this.setState({
        name: '',
        password: '',
      });
      console.log(user);
      if (user.success) {
        delete user.success;
        window.alert('登入成功！');
        this.props.setUserInfo(user);
        document.location.href = '#/';
      } else {
        this.setState({ loginFailed: true });
        window.alert('登入失敗！');
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>Hi, Welcome Blog!</h1>
              <div className="row">
                <div className="col-md-12">
                  <div className="input-group">
                    <span className="input-group-addon" >用戶名稱</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="請輸入用戶名稱"
                      value={this.state.name}
                      onChange={this.handleUsernameChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="input-group">
                    <span className="input-group-addon" >密碼</span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="請輸入密碼"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                  </div>
                </div>
              </div>
              {this.state.loginFailed ? (<p>wrong password. please try again</p>) : null}
              <button
                className="btn btn-success btn-lg"
                role="button"
                onClick={this.handleSubmitClick}
              >登入</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignInPage.propTypes = {
  setUserInfo: React.PropTypes.func
};

export default SignInPage;

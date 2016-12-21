import React, { Component } from 'react';


class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
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

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  }

  handleSubmitClick = () => {
    const body = this.state;
    console.log('handling submit click');
    fetch('/api/auth/signup', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body),
    }).then(user => {
      this.setState({
        name: '',
        password: '',
        email: '',
      });
      console.log(user);
      user.name = body.name;
      user.email = body.email;
      delete user.success;
      window.alert('成功建立帳戶！');
      this.props.setUserInfo(user);
    })
    .catch(err => {
      console.log('error:');
      console.log(err);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>Sign Up</h1>
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
              <div className="row">
                <div className="col-md-12">
                  <div className="input-group">
                    <span className="input-group-addon" >E-mail</span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="請輸入E-mail"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                  </div>
                </div>
              </div>
              <button
                className="btn btn-success btn-lg"
                role="button"
                onClick={this.handleSubmitClick}
              >建立帳戶</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  setUserInfo: React.PropTypes.func
};

export default SignUpPage;

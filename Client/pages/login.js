import React, { Component } from 'react'

import LoginForm from '../components/common/LoginForm'
import Layout from '../components/layout/layout'
import "../style.css";
class Login extends Component {
  render() {
    return (
      <Layout>
        <LoginForm/>
      </Layout>
    )
  }
}

export default Login;

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {password: '', username: ''}

  submit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const details = {username: username, password: password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',

      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      console.log('success')
    } else {
      console.log('failure')
    }
    this.setState({username: '', password: ''})
  }

  functionInput1 = event => {
    this.setState({username: event.target.value})
  }

  functionInput2 = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password} = this.state

    return (
      <div className="loginDiv1">
        <form className="loginDiv2" onSubmit={this.submit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="Jobbyweblogo1"
          />
          <label htmlFor="labelId1" className="label1">
            USERNAME
          </label>
          <input
            type="text"
            placeholder="Username"
            id="labelId1"
            className="Input1"
            onChange={this.functionInput1}
            value={username}
          />
          <label htmlFor="labelId2" className="label1">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="Password"
            id="labelId2"
            className="Input1"
            onChange={this.functionInput2}
            value={password}
          />
          <button className="Loginbtn1" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default Login

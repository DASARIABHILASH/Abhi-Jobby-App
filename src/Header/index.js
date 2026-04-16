import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props
  const Headerlogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="HeaderDiv1">
      <Link to="/" className="Headerlink1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="HeaderJobbyweblogo1"
        />
      </Link>
      <ul className="HeaderDiv2">
        <li className="link">
          <Link to="/" className="Headerlink1">
            <h1 className="Headerheading1 ">Home</h1>
          </Link>
        </li>
        <li className="link">
          <Link to="/jobs" className="Headerlink1">
            <h1 className="Headerheading1 ">Jobs</h1>
          </Link>
        </li>
        <li>
          <button
            className="Headerlogout1"
            type="button"
            onClick={Headerlogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)

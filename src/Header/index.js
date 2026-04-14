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
      <div className="HeaderDiv2">
        <Link to="/" className="Headerlink1">
          <h1 className="Headerheading1">Home</h1>
        </Link>
        <Link to="/jobs" className="Headerlink1">
          <h1 className="Headerheading1">Jobs</h1>
        </Link>
      </div>
      <button className="Headerlogout1" type="button" onClick={Headerlogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)

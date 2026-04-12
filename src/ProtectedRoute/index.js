import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'
import './index.css'

const ProtectedRoute = props => {
  const check = Cookies.get('jwt_token')
  if (check === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
export default ProtectedRoute

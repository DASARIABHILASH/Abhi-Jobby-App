import './index.css'

const NotFound = () => (
  <div className="DivNotFound ">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="JobErrorlogo"
    />
    <h1 className="JobDivErroH1">Page Not Found</h1>

    <p className="JobDivErrorP1">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)
export default NotFound

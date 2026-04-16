import './index.css'

import {Link, withRouter} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const {history} = props
  const HomeJobs = () => {
    history.replace('/jobs')
  }

  return (
    <div className="HomeDiv1">
      <Header />
      <div className="HomeDiv2">
        <h1 className="HomeH1">Find The Job That Fits Your Life</h1>
        <p className="HomeP1">
          <p>
            Millions of people are searching for jobs. This is a good
            platform...
          </p>
        </p>
        <Link to="/jobs" className="link">
          <button className="Homebutton1">Find Jobs</button>
        </Link>
      </div>
    </div>
  )
}
export default withRouter(Home)

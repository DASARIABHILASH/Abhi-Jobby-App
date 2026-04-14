import './index.css'

import {withRouter} from 'react-router-dom'
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
          Millions of people are searching for here this is good platfom for to
          get a job very fast and easy way of an it people are searching for
          here this is good platfom
        </p>

        <button className="Homebutton1" onClick={HomeJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}
export default withRouter(Home)

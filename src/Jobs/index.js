import {BsSearch, BsGeoAlt, BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocalPostOffice} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const constantCheck2 = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  process: 'PROCESS',
}
class Jobs extends Component {
  state = {profile: {}, jobs: [], api2: constantCheck2.initial, load: true}

  componentDidMount() {
    this.getData1()
    this.getData2()
  }

  getData1 = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({api2: constantCheck2.process})
    const response = await fetch(url, options)
    const data = await response.json()
    const newobj1 = {
      profileDetails: data.profile_details.name,
      profileimageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({profile: newobj1})
  }

  getData2 = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data2 = await response.json()
    console.log(data2)

    if (response.ok) {
      const newobj2 = data2.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packageanul: each.package_per_annum,
        title: each.title,
        rating: each.rating,
        id: each.id,
      }))
      this.setState({jobs: newobj2, api2: constantCheck2.success, load: false})
    } else {
      this.setState({api2: constantCheck2.failure, load: true})
    }
  }

  div3 = () => {
    const {salaryData, employmentData} = this.props
    const {profile, load} = this.state

    return (
      <div className="JobDiv3">
        {load ? (
          <div className="JobDiv6">
            <div>
              <img
                src={profile.profileimageUrl}
                className="Jobprofile"
                alt="profile"
              />
              <h1 className="JobDivh1">{profile.profileDetails}</h1>
              <p className="JobDivp1">{profile.shortBio}</p>
            </div>
          </div>
        ) : (
          <div className="JobError1">
            <button className="JobLogout2">Retry</button>
          </div>
        )}
        <hr className="JobHr1" />
        <h1 className="JobH1">Type of Employment</h1>
        <ul className="Jobul1">
          {employmentData.map(each => (
            <li key={each.employmentTypeId} className="Jobli">
              <input type="checkbox" />
              <h1 className="JobP1">{each.label}</h1>
            </li>
          ))}
        </ul>
        <hr className="JobHr" />
        <h1 className="JobH1">Salary Range</h1>
        <ul className="Jobul2">
          {salaryData.map(each => (
            <li key={each.salaryRangeId} className="Jobli">
              <input type="radio" />
              <h1 className="JobP1">{each.label}</h1>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  div4 = () => {
    const {jobs, load} = this.state
    return (
      <div className="JobDiv4">
        <div className="SearchDiv1">
          <input type="search" className="SearchInput1" placeholder="Search" />
          <button
            type="button"
            data-testid="searchButton"
            className="searchButton"
          >
            <BsSearch className="searchicon" />
          </button>
        </div>
        {load ? (
          <ul className="JobDivul">
            {jobs.map(each => (
              <Link to={`/jobs/${each.id}`} className="JobLink">
                <li key={each.id} className="JobDivli">
                  <div className="JobDivli1">
                    <img
                      src={each.companyLogoUrl}
                      alt="company logo"
                      className="JobCompanylogo1"
                    />

                    <div>
                      <h1 className="JobDivlih1">{each.title}</h1>
                      <div className="JobDivli2">
                        <BsFillStarFill className="JobDivicon1" />
                        <p className="JobDivlip1">{each.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="JobDivli3">
                    <div className="JobDivli4">
                      <div className="JobDivli2">
                        <BsGeoAlt className="JobDivicon2" />
                        <p className="JobDivlip2">{each.location}</p>
                      </div>
                      <div className="JobDivli2">
                        <MdLocalPostOffice className="JobDivicon2" />
                        <p className="JobDivlip2">{each.employmentType}</p>
                      </div>
                    </div>
                    <h1 className="JobDivlih1">{each.packageanul}</h1>
                  </div>
                  <hr className="JobHr2" />
                  <div>
                    <h1 className="JobDivliH3">Description</h1>
                    <p className="JobDivliP3">{each.jobDescription}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="JobError2 ">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="JobErrorlogo"
            />
            <h1 className="JobDivErrorH1">Oops! Something Went Wrong</h1>
            <p className="JobDivErrorP1">We cant seen the page loading on it</p>
            <button className="JobLogout2">Retry</button>
          </div>
        )}
      </div>
    )
  }

  process2 = () => (
    <div>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  failure2 = () => {
    console.log('fail')
    return (
      <div>
        <h1>Failure</h1>
      </div>
    )
  }

  success2 = () => {
    const {jobItemList} = this.state
    console.log(jobItemList)
    return (
      <div className="JobDiv2">
        {this.div3()}
        {this.div4()}
      </div>
    )
  }

  switch = () => {
    const {api2} = this.state
    switch (api2) {
      case constantCheck2.success:
        return this.success2()
      case constantCheck2.failure:
        return this.failure2()
      case constantCheck2.process:
        return this.process2()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="JobDiv1 ">
        <Header />
        {this.switch()}
      </div>
    )
  }
}
export default Jobs

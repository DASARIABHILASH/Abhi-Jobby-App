import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {BsGeoAlt, BsFillStarFill} from 'react-icons/bs'
import {MdLocalPostOffice} from 'react-icons/md'
import Header from '../Header'
import './index.css'

const constantCheck1 = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  process: 'PROCESS',
}

class JobItem extends Component {
  state = {jobItemList: {}, api: constantCheck1.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {id} = match.params
    this.setState({api: constantCheck1.process})
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data2 = await response.json()

    if (response.ok) {
      const d = {
        companyLogoUrl: data2.job_details.company_logo_url,
        companyWebsiteUrl: data2.job_details.company_website_url,
        employmentType: data2.job_details.employment_type,
        id: data2.job_details.id,
        title: data2.job_details.title,
        jobDescription: data2.job_details.job_description,
        skills: data2.job_details.skills,
        lifeatCompany: data2.job_details.life_at_company,
        similarJobs: data2.similar_jobs,
        location: data2.job_details.location,
        packagePerAnnum: data2.job_details.package_per_annum,
        rating: data2.job_details.rating,
      }
      this.setState({api: constantCheck1.success, jobItemList: d})
    } else {
      this.setState({api: constantCheck1.failure})
    }
  }

  process = () => (
    <div>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="ffffff" height="50" width="50" />
      </div>
    </div>
  )

  retry = () => {
    this.getData()
  }

  failure = () => (
    <div className="JobError2 ">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="JobErrorlogo"
      />
      <h1 className="JobDivErrorH1">Oops! Something Went Wrong</h1>
      <p className="JobDivErrorP1">
        We cannot seem to find the page you are looking for
      </p>
      <button className="JobLogout2" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  success = () => {
    const {jobItemList} = this.state
    console.log(jobItemList.similarJobs)
    return (
      <div className="JobItemDiv1">
        <div className="JobItemDiv2">
          <ul className="JobDivul">
            <li key={jobItemList.id} className="JobDivli">
              <div className="JobDivli1">
                <img
                  src={jobItemList.companyLogoUrl}
                  alt="job details company logo"
                  className="JobCompanylogo1"
                />

                <div>
                  <h1 className="JobDivlih1">{jobItemList.title}</h1>
                  <div className="JobDivli2">
                    <BsFillStarFill className="JobDivicon1" />
                    <p className="JobDivlip1">{jobItemList.rating}</p>
                  </div>
                </div>
              </div>
              <div className="JobDivli3">
                <div className="JobDivli4">
                  <div className="JobDivli2">
                    <BsGeoAlt className="JobDivicon2" />
                    <p className="JobDivlip2">{jobItemList.location}</p>
                  </div>
                  <div className="JobDivli2">
                    <MdLocalPostOffice className="JobDivicon2" />
                    <p className="JobDivlip2">{jobItemList.employmentType}</p>
                  </div>
                </div>
                <p className="JobDivlih1">{jobItemList.packagePerAnnum}</p>
              </div>
              <hr className="JobHr2" />
              <div>
                <div className="JobItem">
                  <h1 className="JobDivliH3">Description</h1>
                  <a
                    className="JobItembtn1"
                    target="_blank"
                    rel="noreferrer"
                    href={jobItemList.companyWebsiteUrl}
                  >
                    Visit
                  </a>
                </div>
                <p className="JobDivliP3">{jobItemList.jobDescription}</p>
              </div>
              <div>
                <h1 className="JobDivliH3">Skills</h1>
                <ul className="JobItemul1">
                  {jobItemList.skills.map(each => (
                    <li className="JobItemli1" key={each.name}>
                      <img
                        src={each.image_url}
                        alt={each.name}
                        className="JobItemLogo2"
                      />
                      <h1 className="JobDivlip1">{each.name}</h1>
                    </li>
                  ))}
                </ul>
                <div className="JobDivLife1">
                  <h1 className="JobDivliH3">Life at Company</h1>
                  <div className="JobDivLife2">
                    <p className="JobDivliP3">
                      {jobItemList.lifeatCompany.description}
                    </p>
                    <img
                      src={jobItemList.lifeatCompany.image_url}
                      className="JobCompanylogo2"
                      alt="life at company"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="JobDivliH3">Similar Jobs</h1>
          <ul className="SimilarUl1">
            {jobItemList.similarJobs.map(each => (
              <li key={each.id} className="SimilarLi1">
                <div className="JobDivli1">
                  <img
                    src={each.company_logo_url}
                    alt="similar job company logo"
                    className="JobCompanylogo1"
                  />
                  <div>
                    <p className="JobDivlih1">{each.title}</p>
                    <div className="JobDivli2">
                      <BsFillStarFill className="JobDivicon1" />
                      <p className="JobDivlip1">{each.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="JobDivliH3">Description</h1>

                <p className="p">{each.job_description} </p>
                <div className="JobDivli3">
                  <div className="JobDivli4">
                    <div className="JobDivli2">
                      <BsGeoAlt className="JobDivicon2" />
                      <p className="JobDivlip2">{each.location}</p>
                    </div>
                    <div className="JobDivli2">
                      <MdLocalPostOffice className="JobDivicon2" />
                      <p className="JobDivlip2">{each.employment_type}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  switch = () => {
    const {api} = this.state
    switch (api) {
      case constantCheck1.success:
        return this.success()
      case constantCheck1.failure:
        return this.failure()
      case constantCheck1.process:
        return this.process()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="JobItemDiv1">
        <Header />
        {this.switch()}
      </div>
    )
  }
}
export default withRouter(JobItem)

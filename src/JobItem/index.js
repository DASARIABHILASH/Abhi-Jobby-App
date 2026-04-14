import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

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
      console.log(data2)
      const d = {
        companyLogoUrl: data2.job_details.company_logo_url,
        companyWebsiteUrl: data2.job_details.company_website_url,
        employmentType: data2.job_details.employment_type,
        id: data2.job_details.id,
        jobDescription: data2.job_details.job_description,
        skills: data2.job_details.skills,
        lifeAtCompany: data2.job_details.life_at_company,
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

  failure = () => {
    console.log('fail')
    return (
      <div>
        <h1>Failure</h1>
      </div>
    )
  }

  success = () => {
    const {jobItemList} = this.state
    console.log(jobItemList)
    return (
      <div>
        <h1>{jobItemList.location}</h1>
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
    return <div>{this.switch()}</div>
  }
}
export default withRouter(JobItem)

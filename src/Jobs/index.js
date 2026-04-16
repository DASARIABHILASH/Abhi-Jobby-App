import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsGeoAlt, BsSearch, BsFillStarFill} from 'react-icons/bs'
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
  state = {
    profile: {},
    jobs: [],
    api2: constantCheck2.initial,
    searchInput: '',
    activeEmployeeId: [],
    activesalaryId: '',
  }

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
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const newobj1 = {
        profileDetails: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profile: newobj1})
    } else {
      this.setState({profile: constantCheck2.failure})
    }
  }

  getData2 = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({api2: constantCheck2.process})
    const {activeEmployeeId, activesalaryId, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmployeeId.join(
      ',',
    )}&minimum_package=${activesalaryId}&search=${searchInput}`
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
        packagePerAnnum: each.package_per_annum,
        title: each.title,
        rating: each.rating,
        id: each.id,
      }))
      this.setState({jobs: newobj2, api2: constantCheck2.success})
    } else {
      this.setState({api2: constantCheck2.failure})
    }
  }

  search = event => {
    this.setState({searchInput: event.target.value})
  }

  radio = id => {
    this.setState({activesalaryId: id}, this.getData2)
    console.log(id)
  }

  checkbox = updated2 => {
    this.setState(prevState => {
      const isExist = prevState.activeEmployeeId.includes(updated2)

      if (isExist) {
        return {
          activeEmployeeId: prevState.activeEmployeeId.filter(
            each => each !== updated2,
          ),
        }
      }
      return {
        activeEmployeeId: [...prevState.activeEmployeeId, updated2],
      }
    }, this.getData2)
  }

  retry1 = () => {
    this.getData1()
  }

  retry2 = () => {
    this.getData2()
  }

  div3 = () => {
    const {salaryData, employmentData} = this.props
    const {profile, activeEmployeeId, activesalaryId} = this.state

    return (
      <div className="JobDiv3">
        {profile === constantCheck2.failure ? (
          <button type="button" onClick={this.retry1}>
            Retry
          </button>
        ) : (
          profile.profileDetails && (
            <div className="JobDiv6">
              <div>
                <img
                  src={profile.profileImageUrl}
                  className="Jobprofile"
                  alt="profile"
                />
                <h1 className="JobDivh1">{profile.profileDetails}</h1>
                <p className="JobDivp1">{profile.shortBio}</p>
              </div>
            </div>
          )
        )}

        <hr className="JobHr1" />
        <h1 className="JobH1">Type of Employment</h1>
        <ul className="Jobul1">
          {employmentData.map(each => (
            <li key={each.employmentTypeId} className="Jobli">
              <input
                type="checkbox"
                name="employe"
                checked={activeEmployeeId.includes(each.employmentTypeId)}
                id={each.employmentTypeId}
                onChange={() => this.checkbox(each.employmentTypeId)}
              />
              <label htmlFor={each.employmentTypeId} className="JobP1">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="JobHr" />
        <h1 className="JobH1">Salary Range</h1>
        <ul className="Jobul2">
          {salaryData.map(each => (
            <li key={each.salaryRangeId} className="Jobli">
              <input
                type="radio"
                name="salary"
                id={each.salaryRangeId}
                checked={activesalaryId === each.salaryRangeId}
                onChange={() => this.radio(each.salaryRangeId)}
              />
              <label htmlFor={each.salaryRangeId} className="JobP1">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  div4 = () => {
    const {jobs} = this.state
    const p = jobs.length
    return (
      <div className="JobDiv4">
        {p > 0 ? (
          <ul className="JobDivul">
            {jobs.map(each => (
              <Link to={`/jobs/${each.id}`} className="JobLink" key={each.id}>
                <li className="JobDivli">
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
                    <h1 className="JobDivlih1">{each.packagePerAnnum}</h1>
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
          <div className="DivNotFound ">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="JobErrorlogo5"
            />
            <h1 className="JobDivErroH1">No Jobs Found</h1>
            <p className="JobDivErrorP1">
              We could not find any jobs Try other filters
            </p>
          </div>
        )}
      </div>
    )
  }

  process2 = () => (
    <div className="load">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  failure2 = () => (
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
      <button className="JobLogout2" type="button" onClick={this.retry2}>
        Retry
      </button>
    </div>
  )

  // success2 = () => {
  //   return (
  //     <div className="JobDiv2">
  //       {this.div3()}
  //       {this.div4()}
  //     </div>
  //   )
  // }

  switch = () => {
    const {api2} = this.state
    switch (api2) {
      case constantCheck2.success:
        return this.div4()
      case constantCheck2.failure:
        return this.failure2()
      case constantCheck2.process:
        return this.process2()
      default:
        return null
    }
  }

  // render() {
  //   const {searchInput} = this.state
  //   return (
  //     <div className="JobDiv1 ">
  //       <Header />
  //       <div className="SearchDiv1">
  //         <input
  //           type="search"
  //           className="SearchInput1"
  //           value={searchInput}
  //           placeholder="Search"
  //           onChange={this.search}
  //         />
  //         <button
  //           type="button"
  //           data-testid="searchButton"
  //           className="searchButton"
  //           onClick={this.getData2}
  //         >
  //           <BsSearch className="searchicon" />
  //         </button>
  //       </div>
  //       {this.switch()}
  //     </div>
  render() {
    const {searchInput} = this.state

    return (
      <div className="JobDiv1">
        <Header />
        <div className="JobDiv2">
          {this.div3()}

          <div>
            <div className="SearchDiv1">
              <input
                type="search"
                className="SearchInput1"
                value={searchInput}
                placeholder="Search"
                onChange={this.search}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
                onClick={this.getData2}
              >
                <BsSearch className="searchicon" />
              </button>
            </div>

            {this.switch()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs

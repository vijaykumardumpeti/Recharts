import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    coverageData: [],
    byAgeData: [],
    byGenderData: [],
  }

  componentDidMount() {
    this.getDataFromUrl()
  }

  getDataFromUrl = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({apiStatus: apiStatusConstants.success})

      const coverageData = data.last_7_days_vaccination.map(o => ({
        dose1: o.dose_1,
        dose2: o.dose_2,
        vaccineDate: o.vaccine_date,
      }))
      // console.log(coverageData)

      const vaccinationByAgeData = data.vaccination_by_age.map(o => ({
        age: o.age,
        count: o.count,
      }))
      // console.log(vaccinationByAgeData)

      const vaccinationByGenderData = data.vaccination_by_gender.map(o => ({
        count: o.count,
        gender: o.gender,
      }))
      // console.log(vaccinationByGenderData)
      this.setState({
        coverageData,
        byAgeData: vaccinationByAgeData,
        byGenderData: vaccinationByGenderData,
      })
    }
    if (response.ok !== true) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  successView = () => {
    const {coverageData, byAgeData, byGenderData, apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div>
        <div className="vaccination-coverage-container background">
          <h1 className="para-of-bar">Vaccination Coverage</h1>
          <VaccinationCoverage coverageData={coverageData} />
        </div>

        <div className="vaccination-by-gender-container background">
          <h1 className="para-of-bar">Vaccination by gender</h1>
          <VaccinationByGender byGenderData={byGenderData} />
        </div>

        <div className="vaccination-by-age-container background">
          <h1 className="para-of-bar">Vaccination by Age</h1>
          <VaccinationByAge byAgeData={byAgeData} />
        </div>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-view">
      <img
        className="failure-view-para"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="error-failure-msg">Something went wrong</h1>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  switchMethod = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="cowin-container">
          <div className="content-container">
            <div className="icon-and-name">
              <img
                className="website-logo"
                alt="website logo"
                src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              />
              <p className="cowin-text">Co-WIN</p>
            </div>
            <h1 className="para">coWIN Vaccination in India</h1>
            {this.switchMethod()}
          </div>
        </div>
      </div>
    )
  }
}

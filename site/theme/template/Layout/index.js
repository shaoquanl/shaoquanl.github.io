import React from 'react'
import Header from './Header'
import '../../static/style'

export default class SiteLayout extends React.Component {
  render() {
    return (
      <div className="page-wrapper">
        <Header />
        <div className="main-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types';
import { pathOr } from 'ramda'
import { StaticPageBody } from './StaticPageBody.component'
import { NotFound } from '../NotFound'

export class StaticPage extends React.Component {
  render() {
    const pageData = pathOr(null, [ 'staticContext', 'pageData' ], this.props)
    console.log('pageData', pageData)

    return pageData !== null ? <StaticPageBody {...pageData} /> : <NotFound />
  }
}

StaticPage.propTypes = {
  staticContext: PropTypes.shape({
    pageData: PropTypes.object
  })
}
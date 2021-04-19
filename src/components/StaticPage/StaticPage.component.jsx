import React from 'react'
import { pathOr } from 'ramda'
import { StaticPageBody } from './StaticPageBody.component'
import { NotFound } from '../NotFound'

export class StaticPage extends React.Component {
  constructor(props) {
    console.log('StaticPage.constructor()')
    super()
  }

  render() {
    const pageData = pathOr(null, [ 'staticContext', 'pageData' ], this.props)
    console.log('pageData', pageData)

    return pageData !== null ? <StaticPageBody {...pageData} /> : <NotFound />
  }
}

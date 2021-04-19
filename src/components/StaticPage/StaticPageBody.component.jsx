import React from 'react'

export const StaticPageBody = (props) => {
  return (
    <div>
      <h1 className="page-title">{props.title}</h1>
      <div className="page-content" dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  )
}

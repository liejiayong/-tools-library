import React from 'react'
import './index.less'

function Loading() {
  return (
    <div className="preLoading">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading

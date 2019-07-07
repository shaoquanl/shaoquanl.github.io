import React from 'react'
import DocumentTitle from 'react-document-title'
import Img from '../../img/bj.jpg'
export default (props) => {

  return (
    <DocumentTitle title="LEI-首页">
      <div className="page page-home">
        <img className="bg" src={Img}/>
        <div className="banner">
          <div className="title">Lei</div>
          <div className="version"> —— React 组件库</div>
          <div className="choose">
            <a href="https://github.com/shaoquanl/shaoquanl.github.io" className="btn">安装</a>
            <a href="/guide" className="btn">开始</a>
          </div>
        </div>
      </div>
    </DocumentTitle>
  );
}

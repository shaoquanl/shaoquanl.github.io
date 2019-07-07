import React from 'react';
import DocumentTitle from 'react-document-title';

export default (props) => {
  return (
    <DocumentTitle title="Not Found">
		<div className="page-404">
			<div className="placeholder"></div>
			<div className="tip">没找到当前页面，<a href="/">返回首页</a></div>
		</div>
    </DocumentTitle>
  )
}

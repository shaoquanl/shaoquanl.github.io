import React from 'react'
import DocumentTitle from 'react-document-title';
import { getChildren } from 'jsonml.js/lib/utils';

export default class MainDoc extends React.Component{

    render(){
        const props = this.props
        const pageData = this.props.index
        const { meta, description, content } = pageData;
        return (
            <DocumentTitle title="Lei-组件">
                <article>
                <section className="markdown">
                    <h1>{meta.title || meta.english} {meta.subtitle || meta.chinese}</h1>
                    {
                    props.utils.toReactComponent(
                        ['section', { className: 'markdown' }]
                        .concat(getChildren(content))
                    )
                    }
                </section>
                </article>
            </DocumentTitle>
        )
    }
}

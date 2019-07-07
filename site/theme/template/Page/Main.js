import React from 'react'
import DocumentTitle from 'react-document-title'
import { getChildren } from 'jsonml.js/lib/utils'
import Demo from './Demo'

export default class MainDoc extends React.Component{

    showDemos(demo, props) {
        return demo
        .sort((a,b)=>{
          return a.meta.order - b.meta.order
        })
        .map((d, index) => {
          return (
            <Demo key={index} {...d} {...props}/>
          )
        })
    }

    render(){
        const props = this.props
        const {pageData, utils, demos} = props
        const { meta, description, content } = pageData;
        const {chinese,english} = meta
        let codeTitle
        let tpl 
        if(demos && demos.length){
          codeTitle = <h2>代码演示</h2>
          tpl = <DocumentTitle title={`${chinese} ${english}`}>
                <article>
                  <section className="markdown">
                    <h1>{meta.title || meta.english} {meta.subtitle || meta.chinese}</h1>
                    {
                      props.utils.toReactComponent(
                        ['section', { className: 'markdown' }]
                          .concat(getChildren(content))
                      )
                    }
                    {codeTitle}
                  </section>
                  <section>
                    {
                      demos && demos.length ? this.showDemos(demos, props) : null
                    }
                  </section>
                  <section>
                    {
                      props.utils.toReactComponent(
                        ['section', {
                          className: 'markdown api-container',
                        }].concat(getChildren(pageData.api || ['placeholder']))
                      )
                    }
                  </section>
                </article>
              </DocumentTitle>
        }else{
          codeTitle = null
          tpl = <DocumentTitle title="Lei-指南">
                <article>
                    <section className="markdown">
                        {
                        props.utils.toReactComponent(
                            ['section', { className: 'markdown' }]
                            .concat(getChildren(content))
                        )
                        }
                    </section>
                </article>
            </DocumentTitle>
        }

        return tpl
    }
}

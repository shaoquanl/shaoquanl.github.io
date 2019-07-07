import React from 'react';
import DocumentTitle from 'react-document-title';
import Layout from '../Layout';
import * as utils from '../utils'
import Promise from 'bluebird';
import Content from './Content'

export function collect(nextProps, callback) {
    let libList = utils.collectDocs(nextProps.data.lib)
    const pathname = nextProps.location.pathname;
    const index = nextProps.data.README()
    const promises = [Promise.all(libList),index]
    const demos = nextProps.utils.get(nextProps.data, [...pathname.split('/'), 'demo']);

    if (demos) {
        promises.push(Promise.all(
            Object.keys(demos)
            .map((key) => demos[key]())
        ));
    }
    Promise.all(promises).then((list) => callback(null, {
        ...nextProps,
        lib: list[0],
        index:list[1],
        demos: list[2],
    }))
}

export default (props) => {
    const toReactComponent = props.utils.toReactComponent;
    return ( 
         <Content {...props } /> 
    )
}

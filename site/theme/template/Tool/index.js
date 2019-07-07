import React from 'react';
import * as utils from '../utils'
import Promise from 'bluebird';
import PageContent from '../Page/index'

export function collect(nextProps, callback) {
    let nav = utils.firstUpperCase('tool')
    let docs = utils.collectDocs(nextProps.data.docs[nav])
    const promises = [Promise.all(docs)]

    Promise.all(promises).then((list) => callback(null, {
        ...nextProps,
        doc: list[0],
        nav: 'tool',
    }))
}

export default (props) => {
    return ( 
        <PageContent {...props }/> 
    )
}

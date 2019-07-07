import React from 'react'

export default class Footer extends React.Component{

    render(){
        return (
            <div className="footer">
            <span className="copyright">Copyright © 2019 yanglei FE</span>
            <i>|</i>
            <span className="build">Built with <a href="https://github.com/benjycui/bisheng">BiSheng</a></span>
            </div>
        )
    }
}

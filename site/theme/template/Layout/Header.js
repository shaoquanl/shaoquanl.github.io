import React from 'react'
import {Menu} from 'antd'
import {Button,Icon} from 'antd'
import {Link} from 'react-router'
import config from '../../index'
import Img from '../../img/logo.jpg'

const maxWidth = document.body.offsetWidth
export default class Header extends React.Component{

    componentWillMount() {
        let cur = location.pathname.split('/')
        let len = cur.length
        let curkey = cur[len-1].toLowerCase()
        if(curkey === ''){
            curkey = 'home'
        }
        if(cur[1] === 'lib'){
            curkey = 'component'
        }
        if(cur[1] === 'guide'){
            curkey = 'guide'
        }
        if(cur[1] === 'tool'){
            curkey = 'tool'
        }
        this.setState({
          selectedKey: [].concat(curkey),
          open: maxWidth < 980 ? false : true
        })
    }

    // 获得文档头部
    docHeaders(){
        let that = this
        config.docHeader = config.docHeader || []
        let show = that.state.open ? 'block' : 'none'

        return (
            <Menu
                mode="horizontal"
                className="header-menu"
                defaultSelectedKeys={that.state.selectedKey}
                style={{display:`${show}`}}
                onClick={that.handlerMenu.bind(that)}
            >
            {
                config.docHeader.map((m,i) =>{
                    let cur = m.url.split('/')
                    let curkey = cur[cur.length - 1].toLowerCase()
                    if(curkey === ''){
                        curkey = 'home'
                    }
                    return (
                        <Menu.Item key={curkey}>
                            <Link to={m.url}>{m.name}</Link>
                        </Menu.Item>
                    )
                })
            }
            </Menu>
        );
    }

    handlerSwitch(){
        let that = this
        if(maxWidth < 980){
            that.setState({
                open: !that.state.open
            })
        }
    }

    handlerMenu(){
        let that = this
        if(maxWidth < 980){
            that.setState({
                open: false
            })
        }
    }

    render(){
        let that = this
        return (
            <header className="clearfix" id="header">
            <a href="/" className="logo"><img className="logo-img" src={Img}/>
            </a>
            {this.docHeaders()}
            <a href="https://github.com/shaoquanl/shaoquanl.github.io" className="gitlab"></a>
            </header>
        )
    }
}

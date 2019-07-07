import React from 'react'
import {Link} from 'react-router'
import config from '../../'
import {Menu} from 'antd'
import MainDoc from './Main'
import NotFound from '../NotFound'

export default class Content extends React.Component{

  componentWillMount() {
    let cur = location.pathname.split('/')
    let len = cur.length
    this.setState({
      selectedKey: [].concat(cur[len-1].toLowerCase())
    })
  }

  handlerSelect() {
    setTimeout(function(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },0)
  }

  getMenuItem(list,category){
    let nav = this.props.nav
    let arr = []
    
    list.sort((a,b) => {
      return a.meta.order - b.meta.order
    })
    .map((item)=>{
      let url = '/'+nav+'/' + item.meta.filename.split('/')[2].replace(/\.md$/i, '')
      if(item.meta.english){
        arr.push(
          <Menu.Item key={item.meta.english.toLowerCase()}>
              <Link to={url}>{item.meta.chinese}</Link>
          </Menu.Item>)
      }
    })
    return arr
  }

  renderMenu(doc){
    let that = this
    let nav = that.props.nav
    const menuMap ={}

    doc.forEach((item) =>{
      let category = item.meta.category
      if(category){
        if(!menuMap[category]){
          menuMap[category] = []
        }
        menuMap[category].push(item)
      }
    })
    let menuList = Object.keys(menuMap)
        .sort((a,b) => {
          return config.typeOrder[nav][a] - config.typeOrder[nav][b]
        })
        .map((item)=>{
          const menu = menuMap[item]
          return (
            <Menu.ItemGroup key={item} title={item}>
            {this.getMenuItem(menu,item)}
            </Menu.ItemGroup>
          )
        })
    let toLink = '/'+nav
    return (
      <Menu 
        mode="inline" 
        onSelect={that.handlerSelect} 
        defaultSelectedKeys={this.state.selectedKey}
        className="sub-menu-item" >
        <Menu.Item key={nav}>
          <Link to={toLink}>概述</Link>
        </Menu.Item>
        {menuList}
      </Menu>
    )
  }

  render(){
    let nav = this.props.nav
    const pageData = this.props.doc.filter((page) =>{
      const url = nav+'/' + page.meta.filename.split('/')[2].replace(/\.md$/i, '')
      if(this.props.location.pathname == nav && url == nav+'/index'){
        return true
      }
      return url == this.props.location.pathname
    })[0]

    let content = <MainDoc {...this.props} pageData={pageData} />
    let tpl
    
    if(pageData){
      tpl = <div className="ant-row">
        <div className="main-left">
          {this.renderMenu(this.props.doc)}
        </div>
        <div className="main-container">
          {content}
        </div>
      </div>
    }else{
      tpl = <NotFound />
    }

    return <div>{tpl}</div>
  }
}

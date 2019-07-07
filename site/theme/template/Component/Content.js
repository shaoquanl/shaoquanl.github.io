import React from 'react'
import {Link} from 'react-router'
import config from '../../'
import {Menu} from 'antd'
import ContentDoc from './ContentDoc'
import MainDoc from './MainDoc'

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
    let arr = []
    
    list.sort((a,b) => {
      return a.meta.order - b.meta.order
    })
    .map((item,index)=>{
      const url = item.meta.filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '')
      if(item.meta.english){
        arr.push(
          <Menu.Item key={item.meta.english.toLowerCase()}>
              <Link to={url}>{item.meta.chinese}-{item.meta.english}</Link>
          </Menu.Item>)
      }
    })
    return arr
  }

  getMenus(lib){
    let that = this
    const menuMap ={}

    lib.forEach((item) =>{
      let category = item.meta.category
      if(!menuMap[category]){
        menuMap[category] = []
      }
      menuMap[category].push(item)
    })

    let menuList = Object.keys(menuMap)
          .sort((a,b) => {
            return config.typeOrder['component'][a] - config.typeOrder['component'][b]
          })
          .map((item)=>{
            const menu = menuMap[item]
            if(menu[0].meta.category == '自定义主题'){
              return <Menu.Item key="theme">
                  <Link to="/lib/theme">自定义主题</Link>
                </Menu.Item>
            }else{
              return (
                <Menu.ItemGroup key={item} title={item}>
                {this.getMenuItem(menu,item)}
                </Menu.ItemGroup>
              )
            }
          })

    return (
      <Menu 
        mode="inline" 
        onSelect={that.handlerSelect} 
        defaultSelectedKeys={this.state.selectedKey}
        className="sub-menu-item" >
        <Menu.Item key="component">
          <Link to="/component">概述</Link>
        </Menu.Item>
        {menuList}
      </Menu>
    )
  }

  render(){
    const pageData = this.props.lib.filter((page) =>{
      return page.meta.filename
            .startsWith(this.props.location.pathname)
    })[0]
    let content =  null

    if(pageData){
      content = <ContentDoc {...this.props} pageData={pageData} />
    }else{
      content = <MainDoc {...this.props} />
    }

    return (
      <div className="ant-row">
        <div className="main-left">
          {
            this.getMenus(this.props.lib)
          }
        </div>
        <div className="main-container">
        {
          content
        }
        </div>
      </div>
    )
  }
}

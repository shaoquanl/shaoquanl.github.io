const path = require("path")
const fs = require("fs")
const port = 8008;
console.log("start at http://localhost:" + port)
const express = require('express')

module.exports = {
  port: port,
  source:[
    './lib',
    './docs',
    'README.md'
  ],
  lazyLoad: true,
  theme: './site/theme/',
  htmlTemplate: './site/theme/static/template.html',
  themeConfig: {
    typeOrder: {
      "component": {
        '自定义主题': 0,
        '公共': 1,
        '基础': 2,
        '表单': 3,
        '反馈': 4,
        '定位': 5,
        '数据': 6,
        '业务': 7,
        '其它': 8
      },
      "tool": {},
      "guide": {
        '设计': 0,
        '交互': 1,
        '编码规范': 2
      }
    }
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2',
    'bisheng-plugin-react?lang=__react',
    'bisheng-plugin-ljdoc',
  ],
  doraConfig: {
    verbose: true,
    plugins: ['dora-plugin-upload'],
  },
  webpackConfig(config){
    config.devtool = 'eval-source-map'
    config.resolve.alias = {
      "lei": path.join(process.cwd(), 'lib'),
    }

    config.resolve.modules = [
      path.join(__dirname, '../'),
      'node_modules',
      path.join(__dirname, '..','docs')
    ]

    return config
  }
}

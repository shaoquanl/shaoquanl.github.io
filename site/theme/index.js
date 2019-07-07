module.exports = {
  docHeader: [{
    name: "首页",
    url: "/"
  },{
    name: "组件",
    url: "/component"
  },{
    name: "设计",
    url: "/guide"
  }],
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
    "guide": {
      '设计': 0,
      '交互': 1,
      '编码规范': 2
    }
  },
  routes: {
    path: '/',
    component: './template/Layout/index',
    indexRoute: { component: './template/Home/index' },
    childRoutes: [{
      path: './index',
      component: './template/Home/index',
    }, {
      path: '/guide',
      component: './template/Guide/index',
    }, {
      path: '/guide/',
      component: './template/Guide/index',
    }, {
      path: '/guide/*',
      component: './template/Guide/index',
    }, {
      path: '/component',
      component: './template/Component/index'
    }, {
      path: '/component/',
      component: './template/Component/index'
    }, {
      path: '/component/theme',
      component: './template/Component/index'
    }, {
      path:"/lib/:children",
      component:'./template/Component/index'
    }]
  }
};

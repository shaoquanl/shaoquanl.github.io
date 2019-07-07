---
order: 0
title: 基础用法
---


```js

import {Select} from 'lei'
const Option = Select.Option;

class Test extends React.Component{

    render(){

        return <Select>
        <Option key={0}>0</Option>
        <Option key={1}>1</Option>

        </Select>
    }
}

ReactDOM.render(<Test/>,mountNode)

```

import React, {PropTypes} from 'react'
import './index.less'

class Select extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    options : PropTypes.array
  }
  state = {
    isActive: false
  }
  static defaultProps = {
    options:[],
    value: ''
  }
  constructor(props){
    super(props)
    let flag = false

    if(typeof this.props.value == 'object'){
      this.state = {
        key: this.props.value.key,
        value: this.props.value.label || (this.props.children && (this.props.children.find(i => i.key == this.props.value.key)|| {props:{children:''}}).props.children) || this.props.value.key ||''
      }
    }
    else {
      this.state = {
        key: this.props.value,
        value: (this.props.children && (this.props.children.find(i => i.key == this.props.value) || {props:{children:''}}).props.children) || this.props.value || ''
      }
    }

    this.bodyListener = (e)=>{
      if (e.target && e.target.className == 'each-option') {
        this.clickoption=true
        flag = true
      } else {
        this.clickoption=false
        flag = false
      }
      if (!flag) {
        this.setState({
          isActive: false
        })
      }
    }
  }
  checkValue=() => {
    setTimeout(()=>{
    if(!this.clickoption) {
      if (this.props.value.label != this.state.value) {
        if (this.props.children.some(i => i.props.children == this.state.value)) {
          let key = this.props.children.find(i => i.props.children == this.state.value).key
          this.setState({
            key: this.props.children.find(i => i.props.children == this.state.value).key
          })
          this.props.onChange && this.props.onChange({
            key, label: this.state.value
          })
        }
        else {
          this.setState({
            value: (this.props.children.find(i => i.key == this.props.value.key) || {props: {children: ''}}).props.children
          })
        }
      }
    }
    else {
      this.clickoption = false
    }
    },200)

  }
  componentWillReceiveProps(np) {
    if(typeof np.value == 'object'){
      if(np.value.key != (this.props.value||{}).key) {
        this.state = {
          key: np.value.key,
          value: np.value.label || (np.children && (np.children.find(i => i.key == np.value.key)|| {props:{children:''}}).props.children) || np.value.key || ''
        }
      }
    }
    else {
      if(np.value != this.props.value) {
        this.state = {
          key: np.value,
          value: np.value? ( (np.children && (np.children.find(i => i.key == np.value) || {props: {children: ''}}).props.children) || np.value || ''):''
        }
      }
    }
  }
  componentDidMount() {
    document.body.addEventListener('click', this.bodyListener,false)
  }
  componentWillUnmount(){
    document.body.removeEventListener('click', this.bodyListener,false)
  }
  toggleSelector(e) {
    this.setState({
      isActive: !this.state.isActive
    })
  }
  inputValue = (e) => {
    // key
    this.setState({
      value: e.target.value,
      isActive: true
    })
  }

  render() {
    const {value} = this.state;
    let acitveClass = this.state.isActive ? 'select-active' : ''
    let disableClass = this.props.disabled ? 'select-disabled' : ''
    const {placeholder, onFocus} = this.props;
    // console.log(this.props.inputRef, 'inputRef')
    return (
      <div className={'select-area ' + acitveClass + disableClass} >
        <div onClick={this.toggleSelector.bind(this)} className='select-box'>
          <input placeholder={placeholder || '请选择'} onInput={this.inputValue}
                 onFocus={onFocus}
                 onBlur={this.checkValue} value = {value} className="ant-select-selection
            ant-select-selection--single select-input"/>
          {/*<div className='selected-value'>{value ? this.getOptionName(value) : '请选择'}</div>*/}
          {/*<span className='selected-icon'><Icon name='arrow-right' size={12}/></span>*/}
        </div>
        {
          this.state.isActive ? this.getOptions() : ''
        }
      </div>
    )
  }
  onChange=(key, value)=> {
    this.props.onChange && this.props.onChange({
      key,label:value
    })
    this.setState({
      isActive: false,
      key,
      value
    })
  }
  getOptions() {
    let props = this.props
    const {value} = this.state;
    let children = React.Children.map(props.children, (child, index) => {
      if(!child){return null}
      return {
        content: child.props.children ,
        display: this.state.current == index ? 'block' : 'none',
        value: child.key
      }
    })
    return <ul className='select-options'>
      {
        children.length
          ? children
          .filter(i => (i.content || '').toLowerCase().indexOf((value||'').toLowerCase())>-1 || (i.value || '').toLowerCase().indexOf((value||'').toLowerCase())>-1 || (i.key || '').toLowerCase().indexOf((value||'').toLowerCase())>-1)
          .map((child, index) => <li className='each-option' key={child.value +"|"+ index} onClick={()=> this.onChange(child.value, child.content)}>{child.content}</li>)
          : null
      }
    </ul>
  }

}

export default Select;

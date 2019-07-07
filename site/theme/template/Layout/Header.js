import React from 'react'
import {Menu} from 'antd'
import {Link} from 'react-router'
import config from '../../index'

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
            <a href="/" className="logo"><img className="logo-img" src='data:image/vnd.microsoft.icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAACwlYP/spaC/7GVf/+4nYf/v6eT/8evnf+4o5T/o4uB/6ONg/+chXr/moF4/5qDef+SeXD/jnJs/4luaP9+YFj/dVhP/3BSSf9xVEv/dVdR/3ZYUf9zVU7/cFNN/2tOSP9qTUf/dVlW/4NnYP+Ja2D/hGZY/35fU/90VEj/YkAz/6+Sff+zmIP/uZ6I/76kjv/ErJj/yrSh/76qmv+nkYb/o46D/56HfP+ok43/qpeS/56FgP+Yfnn/jnRs/31fVv97XlX/fl9X/31fVv95WVD/eFlR/3xeVv9/Ylz/f2Nd/4NmYP+VeG7/mX1v/5BxY/+DYVT/flxQ/3RSRf9mRDf/ro94/7qchf/Eqpb/x6+Z/8y0nv/Ru6b/1L6q/8y3p/+qk4n/rJWO/7GemP+smJP/pI6I/5l/ef+Lb2b/gWNY/4FkXP+IbGP/hWde/3xdUv98XVX/jHBp/5N5c/+TeHP/pYh6/6GFd/+gg3f/lXZo/4ppW/+BX1L/eVdJ/3NRQ/+rim3/u52E/8Wqk//PtqL/1L+r/9jDrv/Yw6//3sq4/8Ktov+3o5z/tKCb/7Galf+rk43/noR7/41wZf+JbGH/i21j/4pqYf+HaF3/gmRZ/45wZ/+ehH7/oYiC/5uAev+vlIb/qY2A/6WJe/+cgHL/lnlr/4ppXP9+XE//d1RH/6+OcP++oon/xKiO/8+1nf/Vvqj/3ciz/9/Ktv/hzrz/5tbI/+PVx/+2o5v/q5ON/6ePiP+bgHb/j3Jo/4hpX/+dgHT/pYh8/6yRg/+yl4r/rZOK/6qSiv+4oJf/o4iC/7mhk/+0mo7/rJGE/5x/cf+Tc2b/i2pc/4VjVv91UUX/vaCI/8aul//IrZP/0bee/9e/p//gy7b/4sy3/+LOvf/p2cz/5tfK/6SLg/+afnT/kHBm/4djWP+IZln/jGte/823qP/TvK7/0ryw/8mzp/+kiYH/o4mA/6OIgf+ymZD/v6eb/7qilv+xloj/m3xu/4xqW/+GZFb/f1xN/25HOf/DqZT/y7Od/9G4n//Wvqb/2cOq/+LPu//m0r7/6NTD/+fXyP/l18f/uKCU/4ppXP+CX1L/hmNV/9G9sv+ojH//sZWJ/9fFu//Yxr7/rpWN/6GGe/+egXf/m4B2/6GFe/+8o5f/uJ+R/7GXif+hgnT/knBh/4dlVv97U0T/aT8v/8qxnv/MtJ//0rul/9jCrP/hzLr/5tbG/+jYyv/o2Mn/6drM/+nZzf/n18z/3cu//+LTyv+Nalv/rpOG/8GpoP+zmY//383G/9C/uP+xmZD/ooZ7/5t9cP+QcWT/hmRX/4ZkV/+OcGT/knRr/5Jzaf+RcWX/jmtd/3pTQ/9lOin/ybKd/8uynv/Ru6b/3Me1/+LOvf/l1cf/6tzS/+nd0P/q3tT/6d3S/+nb0f/q3NT/693W/7OXjP+jg3b/ybSt/72mnf/j1M//yLaw/7mimf+pjYP/mHtu/4xrXf9/WUz/f1lM/6CCdf+pjoL/pId9/5J1af+ObWH/hGFR/25ENP/Eq5b/ya+a/9K8qP/axrT/4s6//+XXyP/p3NH/6dzP/+rd1f/s39X/7eHa//Dk3//y5uP/uqGW/45oWf+vk4f/up+X/867tf/EsKn/u6Sa/6yQhv+cfHD/h2JU/3xSQ/+oinz/uaCS/7GShf+rjoH/qIt9/6GEd/+Vdmj/fFdI/8Clkf/Grpr/zril/9bBr//hzb7/5NXI/+TWyf/n2c7/69/X//Dl3v/06eb/9+7s//Xu7f+Tb1//h15N/5ZzZP+pi3//u5+Y/7uhmP+3mY3/q4p8/5p2aP+EXE3/pYd7/8ixqP+8opX/sZSG/6uOgP+pjYH/pot9/56Ac/+KaFv/v6OO/8aumv/MtaL/1L2s/9zIuv/h0cT/5tjN/+vf2P/y6OP/9/Dt//z29f/9+fv/xrSs/4FUQf+GWkf/iF1M/5x0Zf+vin//tY5//7CCcf+icV3/mGxZ/7melP/dzMf/0b+2/8WvpP+3nZD/sZaJ/6qOgf+ojH//pol9/5x9cf+9n4z/xq2b/8qyn//Vvq7/3su+/+XVyv/q3dX/8Ofh//jx8P/8+vr//fr6//fz8v+de2v/fk45/4NUQv+ATDr/hFA8/5VeS/+mbFb/tHNa/8Kdjf/dzcf/8Ojm/+XY1f/Zx8H/ybSq/72jlv+0mYv/rZKE/6eMf/+jh3r/nH9y/7iciP/Eq5r/yrKg/9XAsv/fzsP/5trS/+/l3v/38O7//Pv7//z6+//59fT/9PDv/5FpWf+GVkP/jFpK/4RNPP9/QS7/iEUw/6BeSP/izcj/+vf5//79/f/59fT/7uPh/9/Qy//Rvbb/xa6k/7yjl/+wlIf/pol8/55/cv+XdWj/t5mG/8KpmP/Ntab/2cS4/+LSy//s4Nz/9e3s//z4+f/9/Pz//Pj3//fz8v/z8O//nXZl/5NjVP+SXk//iU5A/4A7LP+GQDD/59bZ//bs8f/48fP/+/j4//79/f/38fH/6N7b/9rKxv/MuLD/wKme/7SYi/+miHv/mXps/5JwY/+2mIb/wamZ/864qv/bx73/5tfS//Ho5f/69vf/+fb3//z6+v/59vb/9fHx//Tw8P+mgHL/lGBQ/5RaTf+NRzz/gjIo/9C2tP/47/j/9erz//fu8f/6+Pj//v7+//38/P/x6ej/4dPQ/9K+uP/Aq5//sZeK/6SGeP+YeWv/jWte/7aaiP/Cqpv/z7qt/93Kw//p3dj/9u7u//36+//8+Pn/+/n4//f19f/48vP/9/Hz/8u0rv+ZY1X/m19T/5JHP/+SSEX/+/H7//jr+v/16PX/9Orz//v3+P/+/v7//v7+//jz8v/m2tf/0r+7/7+pn/+vlYj/o4V3/5d4a/+Lal3/t52M/8Oqnf/Ou7D/3s/I/+3j3//68/X//f39//38/f/8+vn//Pr5//v29//58/X/9O7u/5plWP+TUkb/izsy/487Nv/HoaL/+e35//fr9v/16/P/+vX3//r39//8+vv//Pn5/+vg3v/WxMD/wauj/7KWi/+lh3r/mnpt/4xrXv+0mor/wqmc/9G+tP/i1M7/8efk//v2+P/+/v7//fv7//v49//8+vv/+/b3//n09f/49Pb/r4h8/5BPP/+JPC//iz4z/+DS0f/89fz/9/D2//fu8v/68vP/+fT0//v5+P/9/Pz/7+Xk/9nIxf/Er6f/tJuQ/6eIfP+Zemz/jGte/7GWhv+/p5n/0r+1/+LVzv/x5+T//Pf5//7+/v/8+vr//Pb2//r49//59PT/+fX2//v4+f/Mta7/i0w6/4dDL/+hb2L//fz+//36/P/59Pf/+fL0//319f/8+Pn//fz8//79/f/x6ej/3MzK/8izrf+2npX/qIt//5Z3av+JZ1r/rZGC/7ujlf/OurD/39DK/+3i3//79/f//fv7//v39//6+Pj/+vf5//j29f/59vf//Pv7/+ri4P+RWEX/i1E9/9vLx//69/v/+fP1//jw8v/48/P//fr5//38/f/9+vv//v39//Hp6P/bzMr/yLOs/7adkv+kiHz/knNl/4NdUf+ninv/t52P/8iyqf/aysP/6d7b//rz9f/59/f/+PT0//37+//8+/v/+vj4//r4+P/9+vv/3tLO/55zYf/Appr//fv8//r39//28fH/9/Hw//f08//8+fr/+vb2//r19v/9/fz/7+bl/9jIxv/Drqf/rpSK/5t9cP+IZ1r/fFdK/6ODdf+xl4r/wayh/9TCvP/k2Nb/9u/w//n39//48/T/+fb2//z6+//8+fr//fv8//z8/P/8+fj/7uXj//by8//8+fn/+vb2//jz8v/38/D/+PP0//n19f/28vH/+vf3//z6+v/r4d7/1cTB/7+qov+qjoT/lHZo/4RhVP93UkT/nHxt/6uQgv+8pJr/z7u1/9/Szf/w6Ob/+vf2//b08//18/L/+vf2//36+f/+/Pz//Pr6//z3+P/89vb/+fb1//j29v/49fT/9/Px//fz8//69vX/9vPy//fz8//9+/z/+PPz/+PY1f/Pvbr/uqSb/6WJf/+Sc2X/gF5R/3RMQP+TcmT/o4Z4/7Obkv/Hs6z/2MjD/+ne2//48/P/+ff3//Xz8v/48/T/+vb2//z2+P/59PX/+PLx//fw8P/27+7/9/Py//f08v/49PP/+PX1//z49//69vb/+/n5//38/P/v5+X/28zK/8ezr/+0nJH/oYR4/49vYf9+W07/b0k8/4loWf+be27/rZKH/76oof/Pvbj/3tHN/+/m5f/79/f/9/X0//fz8//48/L/+fLy//Tw7v/17uv/+PDt//bx7f/38vH/+fT0//z29f/79/b//fr5//38+//+/f7/+PLy/+Xa2P/Rwr3/vamj/6yTif+afXH/iWlc/3lWSf9rRDf/f15P/5NyZv+jiHz/tJ2T/8Wvqv/Tw77/4tfU//Lq6//69/n/+PT0//Xx8P/17+7/9u/t//bx8P/48vH/+PLy//jz8//69vb//fn4//35+f/9+/v//v7+//r29v/s4eD/2szJ/8e1sP+3npj/o4h+/5J0af+EY1f/dVJF/2VAM/93VUf/iWdb/5l7b/+pj4P/t6Ca/8WzrP/UxcH/49fW//Hr6//6+Pj/+fb1//nz8v/49PT/+vf3//v19v/79fX//Pb2//z5+P/9+/z//vz9//79/f/49fX/7OPi/93Pzf/NvLj/vKeh/62SjP+afnP/imtf/31cT/9uSz7/Xzot/21LPf9+XE//jm5h/5uAdf+qkIf/uKCZ/8SyrP/Sw7//4dbU/+7n5//38/P/+vf3//n2+P/8+/v//v38//76+//9+/v//vz9//79/f/7+vr/9e7v/+je3f/bzcv/zLu3/72opP+slo//oIN6/45xZv+BYFX/c1BE/2RAM/9XMCT/Yj8z/3BOQv+AXlH/jW1k/5l9cv+mjIP/tJuV/8Gtp//Qv7v/3M/L/+ba2v/u5eX/9O7v//j09f/69/j/+vj4//r39//38vP/8uvr/+zi4P/j19X/2MjG/8m2sv+7pJ//rJON/5+Dev+Rcmf/gmNW/3VTRv9pRDf/XDYq/1EpHf9XMiX/YT4y/21LPv97WUz/iGdd/5R2bf+ih3//r5iQ/72ppP/KuLP/08K//9nKyP/d0c//4tjW/+Xd2v/m3tz/5tzb/+LX1f/bz83/08bE/829uv/Cr6v/tZ6Z/6iOiP+bgHX/j3Fm/4JjV/91VUj/aUc6/185Lf9ULSH/SSEV/00nGv9VMiX/Xz0w/2tJPP94Vkr/hWRZ/5N2bf+fhn//rZSO/7ehm/++q6b/xbKv/8i4tf/Nvbr/0MC9/9DBvv/Rwb7/zby6/8a0sf+/q6b/tqGb/6yVj/+hiIH/l3ty/4pvZP9/Ylb/dlVI/2lHOv9dOi3/VC8j/0gkF/9BGQ7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='/>
            </a>
            {this.docHeaders()}
            <a href="https://github.com/shaoquanl/shaoquanl.github.io" className="gitlab"></a>
            </header>
        )
    }
}

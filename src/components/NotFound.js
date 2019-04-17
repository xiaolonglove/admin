import React from 'react';
import Link from 'umi/link';
import img from '@/assets/imgs/404.png';


class NotFound extends React.Component {
    state = {
        animated: ''
    };
    enter = () => {
        this.setState({animated: 'hinge'})
    };
    render() {
        return (
            <div className="center" style={{height: '100%', background: '#ececec',     flexDirection: 'column', overflow: 'hidden'}}>
                <div style={{padding: 16}}>页面不见了，去<Link to="/" >首页</Link></div>
                <img src={img} alt="404" className={`animated swing ${this.state.animated}`} onMouseEnter={this.enter} />
            </div>
        )
    }
}

export default NotFound;
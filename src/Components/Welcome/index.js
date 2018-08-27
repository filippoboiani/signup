import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './welcome.css'


class Welcome extends Component{
    render(){
        return(
            <div className="container">
                <div className="welcome">
                    <img src={require('../../assets/stagecast-logo-beta.png')} alt="stagecast logo" className="stagecast-logo"/>
                    <span className="user_message">An experience design platform for entertainment & sports</span>
                    <Link to='/signup' style={{ textDecoration: 'none' }}>
                        <button className="send_info_button mt10">
                            <span>Sign up</span>
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

}

export default Welcome;
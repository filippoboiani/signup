import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './final.css'

class Final extends Component{

    render(){
        //in fail show error screen
        if( this.props.data[0] === undefined){
            return(
                <div className="container">
                    <div className="fail">
                        <img src={require('../../assets/stagecast-logo-beta.png')} alt="stagecast logo" className="stagecast-logo"/>
                        <span className="user_message">There might be a problem with the system, please try again</span>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <button className="send_info_button home">
                            <span>Home</span>
                        </button>
                    </Link>
                    </div>
                </div>
            );

        }
        //in success show the token
        else{
            return(
                <div className="container">
                    <div className="success">
                        <img src={require('../../assets/stagecast-logo-beta.png')} alt="stagecast logo" className="stagecast-logo"/>
                        <span className="user_message">Login Successful</span>
                        <span className={this.props.token===undefined?'hide':'show'}> {this.props.token}</span>
                        <img alt="spinner" src={require('../../assets/loader.svg')} height="100" className={this.props.token === undefined?'show':'hide'}/>
                    </div>
                </div>
            );

        }

    }
}

export default Final;
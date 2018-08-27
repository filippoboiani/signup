import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './password.css'
import {debounce } from 'throttle-debounce'
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextInput from '../TextInput';

//tooltip customize
const styles = () => ({
    lightTooltip: {
      background: '#0d2331',
      color: '#EB1E56',
      fontSize: 12,
      letterSpacing:'1px'
    }})

class Password extends Component{

    constructor(props){
        super(props)
        this.state={
            First:'',
            Second:'',
            TooltipMessage:'The field is mandatory',
            Enable:false,
            openPwd:false,
            openRepeat:false,
            error:false
        }
    }

    //set the error to false
    componentDidMount(){
        this.setState({error:false})
    }

    //update the password inputs
    update = (input, field)=>{
        this.setState({Enable:false, openPwd:false, openRepeat:false})
        
        //set the variables to the state
        if(field === 'password')
            this.setState({First:input})
        if(field === 'repeatpassword')
            this.setState({Second:input})
        
        //enable the button
        if (this.state.First === this.state.Second)
            this.setState({Enable:true})
    }
    //confirmation button
    confirmation = (e) =>{
        //set the tooltip open with mandatory message
        if(this.state.First ==='')
            this.setState({openPwd:true})
        if(this.state.Second === '')
            this.setState({openRepeat:true})
        
        //users insert two identical passwords
        if( this.state.First !=='' && this.state.Second !== '' && this.state.First === this.state.Second && this.props.data.length >0 ){

            //create object to push 
            var item = {
                name:"Password",
                value:this.state.First
            }

            //send the pwd to the upper state
            this.props.addPwd(item);

            //activate the user
            this.activate();
        }
    }

    //activate the user
    activate = () =>{
        fetch('http://stagecast.se/api/users/activate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.props.data[0].value , password:this.state.First})
            })
            .then(()=> this.login())
            .catch(()=> this.setState({error:true}))
        
    }
    login = () =>{

        fetch('http://stagecast.se/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': 165
            },
            body: JSON.stringify({ email: this.props.data[0].value , password:this.state.First})
            })
            .then(res=> res.json())
            .then(res=> this.props.response(res)) 
            .catch(()=>this.setState({error:true}))
    }

    render(){
        const { classes } = this.props;
        //in success show this screen
        if(this.state.error === false){
            return(
                <div className="container">
                    <div className="box pwd">
                    <span className="title"> Create your password</span> 
                        <span className="description mt10"> Now you can choose a password for your Stagecast account.</span> 
                        <form className="mt50" action="">
                            <Tooltip 
                                classes={{ tooltip: classes.lightTooltip }} 
                                title={this.state.TooltipMessage} 
                                placement="bottom-end" 
                                disableHoverListener 
                                open={this.state.openPwd}
                            >
                                <TextInput
                                    name = "password"
                                    label = "PASSWORD"
                                    placeholder= ""
                                    update = {debounce(500, this.update)}
                                    class = "display-column user_input"
                                    type="password"     
                                    tooltip="password must contain at least 8 characters, 1 capital letter, 1 number"
                                />
                            </Tooltip>
                            <Tooltip 
                                classes={{ tooltip: classes.lightTooltip }} 
                                title={this.state.TooltipMessage} 
                                placement="bottom-end" 
                                disableHoverListener 
                                open={this.state.openRepeat}
                            >
                                <TextInput
                                    name = "repeatpassword"
                                    label = "REPEAT NEW PASSWORD"
                                    placeholder= ""
                                    class = "display-column mt30 user_input"
                                    type="password"
                                    First={this.state.First}
                                    update = {debounce(500, this.update)}
                                    tooltip="passwords must be identical"
                                />
                            </Tooltip>
                            <div className="display-column mt70">
                            <Link to={this.state.Enable?'/final' :'/password'} style={{ textDecoration: 'none' }}>
                                <button className="send_info_button" type="submit"  onClick={this.confirmation}>
                                    <span>Confirm</span>
                                </button>
                            </Link>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        //in fetching data from the API show error screen
        else{
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
    }
}


Password.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Password);
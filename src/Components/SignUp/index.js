import React, { Component } from 'react'
import { TextInput } from '../../Components'
import {Link} from 'react-router-dom'
import {debounce } from 'throttle-debounce'
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './signup.css'

const styles = () => ({
    lightTooltip: {
      background: '#0d2331',
      color: '#EB1E56',
      fontSize: 12,
      letterSpacing:'1px'
    }})


class SignUp extends Component{

    constructor(props){
        super(props)
        this.state={
            inputs:[
                {name:'Email', label:'Email' , value:'', open:false, placeholder :"hello@mail.se", class :" user_input", type:"email",tooltip:"", message:'The field is mandatory' } ,
                {name:'First' , label:'First Name' ,value:'', open:false, placeholder :"First Name", class : "display-inline half mt30 pr10 user_input", type:"text",tooltip:"" ,message:'The field is mandatory'},
                {name:'Last', label:'Last Name' ,value:'', open:false,placeholder :"Last Name", class : "display-inline half user_input  small_mt10", type:"text", tooltip:"",message:'The field is mandatory' },
                {name:'Company', label:'Company' , value:'', open:false,placeholder : "Company", class :"display-inline half mt30 pr10  small_mt10 user_input",type:"text", tooltip:"",message:'The field is mandatory' },
                {name:'Phone', label:'Phone', value:'', open:false, placeholder: "Phone Number", class : "display-inline half user_input small_mt10" ,type:"text", tooltip:"",message:'The field is numeric'},
                {name:'Purpose',  label:'Why do you want to use Stagecast?',value:'', open:false,placeholder:"Type in your purpose ..." ,class:" mt50 small_mt10 user_input" ,type:"textarea", tooltip:"",message:'The field is mandatory'}
            ],
            Enable:false,
            open: false,
            TooltipMessage:'The field is mandatory',
            error:false
        }
    }

    componentDidMount(){
        this.setState({error:false})
    }

    //update the values and set the state
    update = (input, field) =>{

        //insert the new input to the state
        let inputs = this.state.inputs.slice()  
        for (var i in inputs){
            inputs[i].open = false
            if(inputs[i].name === field)
                inputs[i].value = input
        }

        //set the update inputs
        this.setState({inputs})

        //send the data to the upper level
        this.props.savedata(inputs)

        this.buttonEnabled()
    }

    //check if the button should be enabled
    buttonEnabled = () =>{
        let inputs = this.state.inputs.slice();

        //the button will be disabled
        this.setState({Enable:false})

        //set the variable true, trying to enable the button
        let enable =  true
        
        //if all the required fields are complete the button will be enabled
        for (var i in inputs){
            if ( inputs[i].value ==='' && inputs[i].name !== 'Phone')
                enable=false
            //if phone is filled should be number
            if( inputs[i].name === 'Phone' && inputs[i].value !== ''){
                var isnum = /^\d+$/.test(inputs[i].value);
                enable=isnum
            }
                
        }
        
        //enable the button
        if (enable)
            this.setState({Enable:true})
    }
    //signup button
    signup = () =>{
        let inputs = this.state.inputs.slice()
        let count =0

        //open the tooltip for empty mandatory fields
        for (let i=0; i<inputs.length;i++){
            if ( inputs[i].value ==='' && inputs[i].name !== 'Phone'){
                inputs[i].open = true        
                count++;
            }
            //if phone is not number do not accept
            if( inputs[i].name==='Phone' && inputs[i].value !== ''){
                var isnum = /^\d+$/.test(inputs[i].value);
    
                if( !isnum){
                    inputs[i].open = true        
                    count++;
                }
            }
                     
        }
        this.setState({inputs:inputs})
        
        //fetch api only when all the mandatory fields are complete
        if(count === 0){
        fetch('http://stagecast.se/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.state.inputs[0].value})
            })
            .then(()=> console.log("registration established"))
            .catch(()=>this.setState({error:true}))
        }
    }
    render(){  

        const { classes } = this.props;
        if(this.state.error === false){
            return(
                <div className="container">
                    <div className="box sign_up">
                    <span className="title"> Sign up to Stagecast</span>
                    <form action="" className="mt30 small_mt10">
                    {
                        this.state.inputs.map( (input, index) =>{
                        
                            return <div key={index} className={input.class}>
                                     <Tooltip
                                        title={input.message}  
                                        placement="bottom-end" 
                                        disableHoverListener 
                                        open={input.open}
                                        classes={{ tooltip: classes.lightTooltip }} 
                                    >
                                        <TextInput
                                            name = {input.name}
                                            label = {input.label}
                                            placeholder ={input.placeholder}
                                            update = {debounce(500, this.update)}
                                            type={input.type}
                                            tooltip={input.tooltip}
                                        />
                                    </Tooltip>
                                    </div>  
                        })
                    }
        
                    <div className="display-column mt50">
                        <Link to={this.state.Enable?'/password' :'/signup'} style={{ textDecoration: 'none' }}>
                            <button className="send_info_button" type="submit" value="Register"  onClick={this.signup}>
                                <span>Register</span>
                            </button>
                        </Link>
                        </div>
                    </form>           
                    </div>
                </div> 
            );
        }
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

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(styles)(SignUp);
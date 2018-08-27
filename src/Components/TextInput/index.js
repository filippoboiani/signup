import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './input.css'

const styles = () => ({
    lightTooltip: {
      background: '#0d2331',
      color: '#EB1E56',
      fontSize: 12,
      letterSpacing:'1px'
    }})

class TextInput extends Component{
    constructor(props){
        super(props)
        this.state={
            fault:true,
            open:false
        }
    }

    //verify user input
    verifyInput = (event) =>{

        this.setState({fault:true})

        //fetch the value of the input
        let input = event.target.value

        if( this.props.type === "text" || this.props.type === 'textarea'){

            //check that the phone is always numbers
            if(this.props.name === 'Phone'){
                var isnum = /^\d+$/.test(input);
                
                if(isnum && input.length > 0)
                    this.setState({fault:false})
            } 
            else{
                //in case the input is text and no phone
                
                if(input.length > 0)
                this.setState({fault:false})
            }
    
            //pass the value to the upper state
            this.props.update( input , this.props.name)

    
        }
        else if (this.props.type === "email"){
            //in case the input is email

            var regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(regexp.test(input)){
                this.setState({fault:false})
                this.props.update( input, this.props.name )
            }
        } 
        else{
            //in case the input is password

            //first input
            if(this.props.name === "password"){

                var char =''
                let counter = 0
                this.setState({fault:true, open:true})
            
                //check for the uppercase letter
                for (let i=0;i<input.length;i++){
                    char = input.charAt(i)
                    if (char === char.toUpperCase() && char!==' ' && char !=='')
                        counter++
                }
            
                //check if the input has number
                let numeric = this.hasNumber(input)
                //input length
                let length = input.length
                
                if( counter>0 && numeric && length>=8){
                    this.setState({First:input, fault:false, open:false})
                    this.props.update(input, this.props.name)
                }           
            }
            
            //second input, repear password
            if(this.props.name === "repeatpassword"){
                this.setState({fault:true, open:true})
                
                if (this.props.First === input){
                  this.props.update(input , this.props.name)
                  this.setState({fault:false, open:false})
                }
                
            }


        }
    }
    //function to check if there is number in the input
    hasNumber(number){
        return  /\d/.test(number);
    }
    render(){
        const { classes } = this.props;

        if(this.props.type === 'textarea'){
            return(
                <div className="display-column mt50 small_mt10 user_input">
                    <label className="label" htmlFor="textareaInput">{this.props.label}</label>
                    <textarea placeholder={this.props.placeholder} className="mt10 pl20 pt20 textarea full"  onChange={this.verifyInput}></textarea>
                    <img src={require('../../assets/check.svg')} alt="check icon" className={this.state.fault ? 'input_icon hide' : ' input_icon show'}/>
                </div>
            );

        }
        else{
            return(
                <div className={this.props.class}>
                    <label className="label" htmlFor="lastNameInput">{this.props.label}</label>
                    <Tooltip 
                        classes={{ tooltip: classes.lightTooltip }} 
                        title={this.props.tooltip} 
                        placement="top-end" 
                        disableHoverListener 
                        open={this.state.open}
                        >
                        <input type={this.props.type} className="mt10 pl20 small-input full" placeholder={this.props.placeholder} onChange={this.verifyInput}/>
                    </Tooltip>
                    <img src={require('../../assets/check.svg')}  alt="check icon" className={this.state.fault ? 'input_icon hide' : ' input_icon show'}/>
                </div>     
            
            );
        }
    }
}

TextInput.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(TextInput);
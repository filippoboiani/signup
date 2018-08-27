import React, { Component } from 'react';
import {BrowserRouter , Route} from 'react-router-dom'
import { Password, SignUp, Final, Welcome} from './Components' 
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      data:{}
    }
  }

  componentDidMount(){
    
  }

  //add pwd to the info
  addPwd = (item)=>{
    if(this.state.data.length !== undefined){
      let inputs = this.state.data.slice();
      inputs.push(item)
      this.setState({data:inputs})
    }
   
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Welcome}/>
          <Route path="/signup" exact render={ (props) =>(
            <SignUp
              savedata={(data) => this.setState({data:data})}
            />
          )}/>

          <Route path="/password" render={ (props)=>(
            <Password
              data={this.state.data}
              addPwd={this.addPwd}
              response={(response) => this.setState({token:response.token})}
            />
          )}/>

          <Route path="/final" render={ (props)=>(
            <Final
              data={this.state.data}
              addPwd={this.addPwd}
              token={this.state.token}
            />
          )}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import * as React from 'react';
import Navigation from './components/Navigation/Navigation';
import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import {IMessage} from "./models/Message.js";

interface IChatState {
    selectedName?: string,
    selectedId?: string,
    selectedType?: string,
    message: IMessage,
    selectedMassages?: IMessage[],
    route: string,
    isSignedIn:boolean,
}




class App extends React.Component<{},IChatState> {

    constructor(props:{}){
        super(props);
        this.state = {
            message:{message:''},
            route: 'signin',
            isSignedIn:false,
        };
    }



    getSelected = (eventTarget:any) => {
            if (eventTarget.tagName !== 'UL' && eventTarget.tagName !== 'LI') {
                if(eventTarget.type === 'group'){
                    //if(stateStoreService.isUserExistInGroup(eventTarget.id, this.props.data.loggedInUser.id)){
                        this.setStateOnSelected(eventTarget);
                    //}
                }
                else{
                    this.setStateOnSelected(eventTarget);
                }
            }

    };

    private setStateOnSelected = (eventTarget:any) => {
        this.setState( {
            selectedName: eventTarget.innerHTML.substr(0),
            selectedId: eventTarget.id,
            selectedType: eventTarget.type,
        }/*,()=>{
            this.getSelectedMessageHistory()
        }*/);

    };

   /* getSelectedMessageHistory = () => {
        if(this.state.selectedId && this.props.data.loggedInUser){
            const messagesList:IMessage[] = stateStoreService.getSelectedMessagesHistory(this.state.selectedType, this.state.selectedId, this.props.data.loggedInUser.id);
            this.setState({selectedMassages:messagesList, message:{message:""}});
        }
    };*/

    onRouteChange = (route) => {
        if (route === 'signout'){
            this.setState({isSignedIn:false})
        } else if (route === 'home'){
            this.setState({isSignedIn:true})
        }
      this.setState({route:route});
    };

    render() {
        return (
          <div className="App">
              <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
              {this.state.route === 'home'
              ? <div className='switch'>

                      <LeftSide getSelected={this.getSelected}/>
                      <RightSide/>
                  </div>
              : (
                  this.state.route === 'signin'
                      ? <SignIn onRouteChange={this.onRouteChange}/>
                      : <Register onRouteChange={this.onRouteChange}/>

                  )
              }
          </div>
        );
  }
}

export default App;

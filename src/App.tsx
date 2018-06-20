import * as React from 'react';
import Navigation from './components/Navigation/Navigation';
import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import './App.css';
import {IMessage} from "./models/Message.js";

interface IChatState {
    selectedName?: string,
    selectedId?: string,
    selectedType?: string,
    message: IMessage,
    selectedMassages?: IMessage[],
}




class App extends React.Component<{},IChatState> {

    constructor(props:{}){
        super(props);
        this.state = {message:{message:''}};
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

    render() {
        return (
          <div className="App">
              <Navigation/>
              <div className='switch'>

                  <LeftSide getSelected={this.getSelected}/>
                  <RightSide/>
              </div>
          </div>
        );
  }
}

export default App;

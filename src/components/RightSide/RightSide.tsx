import * as React from 'react';
import './RightSide.css';

interface IRightState {
    inputMessage:string,
    textMessage:string[],
}

class RightSide extends React.Component<{},IRightState>{
    constructor(props:{}){
        super(props);
        this.state = {
            inputMessage:'',
            textMessage:[],
        };
    }

    onInputChange = (event) =>{
      this.setState({inputMessage:event.target.value});
    };

    onButtonSubmit = () =>{
        let temp:string[]=[];
        temp.push(this.state.inputMessage);
      this.setState({textMessage:temp});
      this.forceUpdate();
    };

    render() {
        return (
            <div className='right-side'>
                <textarea className='content'>{this.state.textMessage}</textarea>
                <div className='action'>
                    <input onChange={this.onInputChange} className='load-text'/>
                    <button onClick={this.onButtonSubmit} className='btn-send'>Send</button>
                </div>
            </div>
        );
    }
};

export default RightSide;
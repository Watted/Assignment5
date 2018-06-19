import * as React from 'react';
import './LeftSide.css';
import {appStore} from "../../helpers/appStore";
import {Contact} from "../../helpers/serverApi";

let result:any[] =[];
class LeftSide extends React.Component{
    constructor(props:any){
        super(props);
    }

    mark = () =>{
        console.log("hiii");
    };

    load = (item:Contact[])=>{
        this.loadItem(item,0 ,null);
    };

    loadItem = (item:Contact[],spaces:number,parent:any)=>{

         item.map((item,id)=>{
            const li = <li onClick={this.mark} key={id} style={{paddingLeft: spaces+'em',cursor:'pointer'}}>{item.name}</li>
             result.push(li);
            if (item.items){
                this.loadItem(item.items,spaces+1,li);
            }
        });
    };

    render() {
        this.load(appStore.contacts);
        return (
            <ul className='left-side'>{result}</ul>
        );
    }
};

export default LeftSide;
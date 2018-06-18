import * as React from 'react';
import './LeftSide.css';
import {appStore} from "../../helpers/appStore";
import {Contact} from "../../helpers/serverApi";


class LeftSide extends React.Component{
    constructor(props:any){
        super(props);
    }

    load = (item:Contact[])=>{
        return this.loadItem(item);
    };

    loadItem = (item:Contact[])=>{
        return item.map((item,id)=>{
            const li = <li key={id}>{item.name}</li>
            if (item.items){
                this.load(item.items);
            }
            return li;
        });
    };
    /*appStore.contacts.map((item,id)=>{
               return <li key={id}>{item.name}</li>
            });*/

    render() {
        const list =this.load(appStore.contacts);

        return (
            <ul className='left-side'>{list}</ul>
        );
    }
};

export default LeftSide;
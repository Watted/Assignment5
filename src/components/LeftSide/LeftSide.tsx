import * as React from 'react';
import './LeftSide.css';
import {appStore} from "../../helpers/appStore";
import {Contact} from "../../helpers/serverApi";

interface ILeftTreeProps {
    getSelected(eventTarget:any):void
}



class LeftSide extends React.Component<ILeftTreeProps,{}>{
    constructor(props:ILeftTreeProps){
        super(props);
    }

    toggleDisplay= (element:HTMLElement)=>{
        if(element){
            if (element.style.display !== "none") {
                element.style.display = "none";
            }
            else {
                element.style.display = "block";
            }
        }
    };

    keyUp = (e:React.KeyboardEvent<HTMLElement>)=>{
        const keyName = e.key;
        if(e.target){
            if((e.target as HTMLElement).className === "left tree"){
                ((e.target as HTMLElement).children[0].querySelector(":scope > a") as HTMLElement).focus();
            }
            else if(keyName === "ArrowRight"){
                this.arrowRight((e.target as HTMLElement));
            }
            else if((keyName === "ArrowLeft")){
                this.arrowLeft((e.target as HTMLElement));
            }
            else if(keyName === "ArrowDown" || keyName === "ArrowUp"){
                this.arrowUpOrDown((e.target as HTMLElement), keyName, e);
            }
            else if(keyName === "Enter"){
                this.enter((e.target as HTMLElement))
            }
        }
    };
    public enter = (element:HTMLElement) => {
        if(element.nextElementSibling){
            this.toggleDisplay((element.nextElementSibling as HTMLElement));
        }
    };

    public arrowRight = (element:HTMLElement)=>{
        if(element.nextElementSibling){
            (element.nextElementSibling as HTMLElement).style.display = "block";
            (element.nextElementSibling as HTMLElement).focus();
        }
    };

    arrowLeft = (element:HTMLElement)=>{
        if(element.parentElement && element.parentElement.parentElement && element.parentElement.parentElement.parentElement){
            if(element.nextElementSibling){
                if((element.nextElementSibling as HTMLElement).style.display === "block"){
                    (element.nextElementSibling as HTMLElement).style.display = "none";
                }
                else{
                    (element.parentElement.parentElement.parentElement.querySelector(":scope a") as HTMLElement).focus();
                }
            }
        }
    };

    arrowUpOrDown = (element:HTMLElement, keyName:string, e:any)=>{
        const selectedLi = element.parentElement;
        const allLi = document.querySelectorAll("li");

        function getDisplayedLi(){
            const result:HTMLLIElement[] = [];
            for(let i = 0; i < allLi.length; i++){
                if(allLi[i].offsetParent){
                    result.push(allLi[i]);
                }
            }
            return result;
        }
        const displayedLi = getDisplayedLi();
        function findIndex (){
            let result;
            for(let i = 0; i < displayedLi.length; i++){
                if(displayedLi[i] === selectedLi){
                    result = i;
                }
            }
            return result;
        }
        const index = findIndex();
        if(index !== undefined && index !== -1) {
            let next: HTMLElement;
            if (keyName === "ArrowDown") {
                const nextLi = index + 1;
                if (nextLi < displayedLi.length) {
                    next = (displayedLi[nextLi].querySelector(":scope>a") as HTMLElement);
                    this.goToNext(next);
                }
            }
            else if (keyName === "ArrowUp") {
                const nextLi = index - 1;
                if (nextLi >= 0) {
                    next = (displayedLi[nextLi].querySelector(":scope>a") as HTMLElement);
                    this.goToNext(next);
                }
            }
        }
    };

    public goToNext = (next:HTMLElement)=>{
        if (next) {
            next.focus();
            this.props.getSelected(next);
        }
    };

    dblClickListener= (e:React.MouseEvent<HTMLElement>)=>{
        if(e.target){
            this.toggleDisplay(((e.target as HTMLElement).nextElementSibling as HTMLElement));
            e.stopPropagation();
        }
    };

    clickListener = (e:React.MouseEvent<HTMLElement>) => {
        (e.target as HTMLElement).focus();
        e.stopPropagation();
        this.props.getSelected(e.target);
    };

    load = (item:Contact[])=>{
        return this.loadItem(item,0);
    };

    loadItem = (item:Contact[],spaces:number)=>{
        let result:any[] =[];
        item.map((item,id)=>{
            if (item.items){
                const li = this.addElementsToLi(item,spaces);
                result.push(li);
            }else{
                const li = this.addElementLi(item,spaces);
                result.push(li);
            }
        });
        return result;
    };

    public styleElement = (step:number) => {
        //const space:number = this.padding(step);
        return{
            cursor:"pointer",
            color : "#000000",
            paddingLeft:step+'px'
        }
    };

    addElementsToLi = (item:Contact,spaces:number) =>{
        const ul = React.createElement('ul',{style:{display: 'none'}},this.loadItem(item.items,spaces).map((childItem) => {
            return childItem;
        }));
        const a = React.createElement('a',{tabIndex:1, style:this.styleElement(spaces+2),className:"item-name",id:item.id ,type:item.type},item.name);
        return React.createElement('li',{key:item.id.toString()},a,ul);

    };

    addElementLi = (item: Contact,spaces:number) =>{
        const a = React.createElement('a',{tabIndex:1,style:this.styleElement(spaces+2),className:"item-name",id:item.id, type:item.type,},item.name);
        return React.createElement('li',{key:item.id.toString()},a);
    };

    render() {
        const list = this.load(appStore.contacts);
        return (
            <ul onClick={this.clickListener} onDoubleClick={this.dblClickListener} onKeyUp={this.keyUp} className='left tree'>{list}</ul>
        );
    }
};

export default LeftSide;
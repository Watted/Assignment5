import {CreateNewId} from '../models/CreateNewId';


export function getAllContacts(){
    const contacts =
        [
        {name:"Friends",items:[
            {name:"Best Friends",items:[
                {name:"Mohammed",type:"user",id:CreateNewId.createNewId()},
                    {name:"Ofer",type:"user",id:CreateNewId.createNewId()}
                                        ],type:"group",id:CreateNewId.createNewId()}
                                ],type:"group",id:CreateNewId.createNewId()},
        {name:"Good Friends",items:[
                {name:"Ori",type:"user",id:CreateNewId.createNewId()},
                {name:"Mohammed",type:"user",id:CreateNewId.createNewId()}
            ],type:"group",id:CreateNewId.createNewId()}
    ];

    return contacts;
}

export function getMessageForCurrentUser() {


}



export interface Contact {
    id:CreateNewId,
    name:string,
    items:any[],
    type:string,
}



export function getAllContacts(){
    const contacts =
        [
        {name:"Friends",items:[
            {name:"Best Friends",items:[
                {name:"Mohammed",type:"user"},
                    {name:"Ofer",type:"user"}
                                        ],type:"group"}
                                ],type:"group"},
        {name:"Good Friends",items:[
                {name:"Ori",type:"user"},
                {name:"Mohammed",type:"user"}
            ],type:"group"}
    ];

    return contacts;
}



export interface Contact {
    name:string,
    items:any[],
    type:string,
}
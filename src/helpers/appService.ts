import {appStore} from "./appStore";
import {getAllContacts} from "./serverApi";


export class AppService {

    init(){
        const contacts = getAllContacts();
        console.log("Data arrived from server",contacts);
        appStore.contacts = contacts;
    }

}

export const appService = new AppService();
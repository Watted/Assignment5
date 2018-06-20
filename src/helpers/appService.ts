import {appStore} from "./appStore";
import {getAllContacts} from "./serverApi";


export class AppService {

    init(){
        const contacts = getAllContacts();
        appStore.contacts = contacts;
    }

}

export const appService = new AppService();
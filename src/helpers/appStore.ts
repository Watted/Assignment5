import {Contact} from './serverApi';

export interface AppStore {
    contacts: Contact[],

}

export const appStore: AppStore = {
    contacts: [],
};
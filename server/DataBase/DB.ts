import * as fs from 'fs';
import * as path from 'path';
import {ClientError} from "../utils/ClientError";


const dir = path.join(__dirname.replace('dist'+path.sep,''));

class DB {

    writeFile(data,fileName):Promise<boolean>{
        return new Promise((res,rej)=>{
            fs.writeFile(path.join(dir,fileName),JSON.stringify(data), (err) =>{
                if (err){
                    rej(err);
                } else{
                    console.log('the file saved successfully');
                    res(true);
                }
            });
        });
    }

    readFile(fileName):Promise<{data:any[]}>{
        return new Promise((res,rej) => {
            fs.readFile(path.join(dir,fileName),((err, data) => {
                if (err){
                    rej(err);
                } else {
                    res(JSON.parse(data.toString()));
                }
            }));
        })
    }

    async updateFile(data,fileName):Promise<boolean>{
        try {
            return await this.writeFile(data,fileName);
        }catch (e) {
            throw new ClientError(500,"updateDetailsFailed");
        }
    }

    async deleteObjects(objects:{}[],fileName){
        try {
            const data = await this.readFile(fileName);
            objects.forEach( async(obj)=>{
                const i = this.getIndexByObj(data , obj);
                data.data.splice(i,1);
            });
            return await this.writeFile(data,fileName);
        }catch (e) {
            throw new ClientError(500,"deleteFailed");
        }
    }

    async deleteObjectsById(ids:string[],fileName):Promise<boolean>{
        try {
            const data = await this.readFile(fileName);
            ids.forEach( async(id)=>{
                const i = this.getIndexById(data,id);
                data.data.splice(i,1);
            });
            return await this.writeFile(data,fileName);
        }catch (e) {
            throw new ClientError(500,"deleteFailed");
        }
    }

    async deleteObj(id:string,fileName):Promise<boolean>{
        try {
            const data = await this.readFile(fileName);
            const i = this.getIndexById(data,id);
            data.data.splice(i,1);
            return await this.writeFile(data,fileName);
        }catch (e) {
            throw new ClientError(500,"deleteFailed");
        }
    }

    async getData(fileName):Promise<{data:any[]}>{
        try {
            return await this.readFile(fileName);
        }catch (e) {
            throw new ClientError(500,'getDataFailed');
        }
    }

    getIndexById(res,id){
        const i = res.data.findIndex((object)=>{
            return object.id === id;
        });
        if (i !== -1){
            return i;
        }
        throw new ClientError(404,"objDoesNotExist");
    }

    getIndexByObj(res,obj){
        const i = res.data.findIndex((object) => {
            return (JSON.stringify(object)===JSON.stringify(obj));
        });
        if (i !== -1){
            return i;
        }
        throw new ClientError(404,"objDoesNotExist");
    }

    checkIfObjExist(res,nameOfObj):boolean{
        const i = res.data.findIndex((object) => {
            return object.name === nameOfObj;
        });
        return i !== -1;
    }

    async createNewObj(obj,fileName):Promise<any>{
        try {
            const data = await this.readFile(fileName);
            data.data.push(obj);
            await this.writeFile(data,fileName);
            if (fileName === 'users,json'){
                return {user: {name:obj.name, age: obj.age, id: obj.id}};
            }
            return obj;
        }catch (e) {
            throw new ClientError(500,"CreateNewFailed");
        }
    }

    async createNewObjects(objects, fileName):Promise<void>{
        try {
            const data = await this.readFile(fileName);
            objects.forEach((obj) => {
                data.data.push(obj);
            });
            await this.writeFile(data, fileName);
        }catch (e) {
            throw new ClientError(500,"CreateNewFailed");
        }
    }
}

export const db = new DB();
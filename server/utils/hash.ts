import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export function createHash(text):Promise<string> {
    return new Promise((res,rej) => {
        bcrypt.hash(text,saltRounds,function (err,hash) {
            if (err){
                rej(err);
            }
            res(hash);
        });
    });
}

export function compareHash(text,hash):Promise<boolean> {
    return new Promise((res,rej)=>{
       bcrypt.compare(text,hash,function (err,resolve) {
           if (err){
               rej(err);
           }
           if (resolve === true){
               res(resolve);
           }else {
               rej(err);
           }
       });
    });
}
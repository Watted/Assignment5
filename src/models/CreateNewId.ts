export class CreateNewId{
    static id =1;
    static createNewId() {
        return CreateNewId.id++;
    }
}
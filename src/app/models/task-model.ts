import { TaskUpdate } from "./task-update";

export interface TaskModel{
    fName: string;
    lName: string;
    phoneNums: string;
    description: string;
    dateCreated: object | string;
    email: string;
    statusUpdates: [TaskUpdate];
    address: string;
    price: string;
    userID: string;
    docID: string;
    hideTask: boolean;
    amountDue?: string;

}

export interface TaskModel{
    fName: string;
    lName: string;
    phoneNums: [string];
    description: string;
    dateCreated: string;
    email: string;
    statusUpdates: [
        {
            date: string;
            notes: string;
            status: string;
            whoIs: string;
            deadline: string;
        }];
    address: string;
    price: string;
    payments: string[];
    userID: string;
    docID: string;

}

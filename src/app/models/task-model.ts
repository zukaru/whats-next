export interface TaskModel{
    fName: string;
    lName: string;
    phoneNums: string;
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
            payment: string;
        }];
    address: string;
    price: string;
    userID: string;
    docID: string;
    amountDue?: string;

}

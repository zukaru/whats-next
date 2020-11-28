export interface TaskModel{
    fName: string;
    lName: string;
    phoneNums: [string];
    description: string;
    dateCreated: string;
    email: string;
    statusUpdates: Array<
        {
            date: string;
            notes: string;
            status: string;
            whoIs: string
        }>;
    address: string;
    deadline: string;
    price: string;
    payments: string[];
    userID: string;
    docID: string;

}

export interface TaskModel{
    fName: string;
    lName: string;
    phoneNums: [string];
    description: string;
    dateCreated: string;
    statusUpdates: [
        {
            date: string;
            notes: string;
            status: string; 
        }
    ];
    address: string;
    deadline: string;
    price: string;
    payments: string[];
    userID: string;
    docID: string;
    whoIs: string

}

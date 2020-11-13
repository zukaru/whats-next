export interface TaskModel{
    fName: string;
    lname?: string;
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
    address?: string;
    dueBy: string;
    price?: string;
    payments: [
        {
            amount: string;
            date: string;
        }
    ];

}

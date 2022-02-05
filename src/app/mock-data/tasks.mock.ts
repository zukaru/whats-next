import { TaskModel } from "../models/task-model";


export const task1: TaskModel = {
    fName: 'firstname',
    lName: 'lastname',
    phoneNums: '555555555',
    description: 'Task description.',
    dateCreated: '1628293257215',
    email: 'task@email.com',
    statusUpdates: [{
        date: '1628293257215',
        notes: 'fake notes',
        status: 'fake status',
        whoIs: 'INL',
        deadline: '1628293257215',
        payment: '50'
    }],
    address: 'fake address',
    price: '100',
    userID: '1',
    docID: '1',
    hideTask: false
};

export const task2: TaskModel = {
    fName: 'firstname',
    lName: 'lastname',
    phoneNums: '555555555',
    description: 'Task description.',
    dateCreated: '1628293257215',
    email: 'task@email.com',
    statusUpdates: [{
        date: '1628293257215',
        notes: 'fake notes',
        status: 'fake status',
        whoIs: 'INL',
        deadline: '1628293257215',
        payment: '50'
    }],
    address: 'fake address',
    price: '100',
    userID: '2',
    docID: '2',
    hideTask: false
};

export const taskList = [task1, task2];
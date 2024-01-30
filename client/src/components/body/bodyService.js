import { Subject } from 'rxjs';

// Create an observable subject to handle communication
const updateSubject = new Subject();

// Function to send updates to the SecondChild component
export const emitUpdateToSecondChild = (data) => {
  updateSubject.next(data);
};

// Function to subscribe to updates in the SecondChild component
export const subscribeToUpdates = (callback) => {
  return updateSubject.subscribe(callback);
};
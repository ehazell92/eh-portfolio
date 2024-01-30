import { Subject } from 'rxjs';

export const snackBarSubject = new Subject();
export const triggerSnackBar = (snackBarData) => {
    snackBarSubject.next(snackBarData);
};
export const snackBarUpdated = (snackBarData) => {
    const sbData = snackBarSubject.subscribe(snackBarData);
    return sbData;
};

export interface CustomConfirmDialogData{
    title:string,
    text:string,
    confirmTrueText:string,
    confirmFalseText:string
}

export const PERFORM_MANUAL_LOGOUT:CustomConfirmDialogData = {
    title:'Logging Out ?',
    text:"Are you sure you wan't to Logout ? ",
    confirmTrueText:"Yes",
    confirmFalseText:"No"
}

export const PERFORM_SESSION_EXTENSION:CustomConfirmDialogData = {
    title:'Session Expired !!',
    text:"Session has expired , Do you want to extend current session ?",
    confirmTrueText:"Yes",
    confirmFalseText:"No"
}
export interface CustomConfirmDialogData{
    title:string,
    text:string,
    confirmTrueText:string,
    confirmFalseText:string
}

export const PERFORM_MANUAL_LOGOUT:CustomConfirmDialogData = {
    title:'',
    text:"Are you sure you wan't to LogOut ?",
    confirmTrueText:"Yes",
    confirmFalseText:"No"
}

export const PERFORM_SESSION_EXTENSION:CustomConfirmDialogData = {
    title:'!! Session Is Expiring !!',
    text:"Session is expiring soon , Do you want to extend current session ?",
    confirmTrueText:"Yes",
    confirmFalseText:"No"
}
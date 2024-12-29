const SB_TYPE_SUCCESS = 'success'
const SB_TYPE_ERROR = 'error'
const SB_TYPE_WARNING = 'warning'

export interface CustomSnackbarData {
  message: string;
  performSomeActionButtonText: string | null;
  closeSnackBarButtonText: string | null;
  snackbarType: typeof SB_TYPE_SUCCESS | typeof SB_TYPE_ERROR | typeof SB_TYPE_WARNING; 
}


const SB_BTN_TEXT_CLOSE = 'Close';

export const LOGIN_SUCCESS_SB_DATA: CustomSnackbarData = {
  message: '!! Successfully Logged In !!',
  performSomeActionButtonText: null,
  closeSnackBarButtonText: SB_BTN_TEXT_CLOSE,
  snackbarType: 'success',
};

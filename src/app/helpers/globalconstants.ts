export const APPLICATION_NAME = 'Kanban-Hub'
export const APPLICATION_NAME_SHORT = 'KBH'

export const JWT_TOKEN_KEY_FOR_LOCAL_STORAGE = 'token'
export const JWT_TOKEN_HEADER_KEY = 'Jwt-Token'
export const EMPLOYEE_DETAILS_KEY_FOR_LOCAL_STORAGE = 'employee'

//BACKEND API URL DETAILS
export const BACKEND_BASE_URL = 'http://localhost:8080'
export const LOGIN_URL = `${BACKEND_BASE_URL}/auth/login`
export const REGISTER_URL = `${BACKEND_BASE_URL}/auth/register`

export const GET_ALL_EMPLOYEE_URL = `${BACKEND_BASE_URL}/employee`
export const UPDATE_EMPLOYEE_BY_ID_URL = (employeeId:number) => { return `${BACKEND_BASE_URL}/employee/${employeeId}` }

export const GET_ALL_PROJECT_URL = `${BACKEND_BASE_URL}/project`
export const GET_PROJECT_BY_ID_URL = (projectId:number) => { return `${BACKEND_BASE_URL}/project/${projectId}` }
export const CREATE_PROJECT_URL = `${BACKEND_BASE_URL}/project`

export const ADD_EMPLOYEE_TO_PROJECT_URL = (employeeId:number,projectId:number) => { return `${BACKEND_BASE_URL}/businessoperation/addemployee/${employeeId}/project/${projectId}` }
export const ADD_TASK_TO_PROJECT_URL = (projectId:number) => { return `${BACKEND_BASE_URL}/businessoperation/addtask/project/${projectId}` }

export const NORMAL_ROLE_NAME = 'ROLE_NORMAL'
export const ADMIN_ROLE_NAME = 'ROLE_ADMIN'

export const ERR_EMOJI = '😡'
export const WARN_EMOJI = '😅'
export const SUCCESS_EMOJI = '😊'
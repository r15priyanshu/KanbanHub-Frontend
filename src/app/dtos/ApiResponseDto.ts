import { EmployeeDto } from "./EmployeeDto";

export class ApiResponseDto {
    public timestamp?:string;
    public statusCode?:number;
    public message?:string;
    public status?:string;
    public path?:string;
    public data?:Data;
}

class Data{
    public employee?:EmployeeDto;
}
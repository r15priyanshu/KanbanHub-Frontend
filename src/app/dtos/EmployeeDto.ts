import { AddressDto } from "./AddressDto"; 
import { RoleDto } from "./RoleDto";

export class EmployeeDto {
    public employeeId?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public address: AddressDto;
    public role?:RoleDto;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        address: AddressDto
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.address = address;
    }
}

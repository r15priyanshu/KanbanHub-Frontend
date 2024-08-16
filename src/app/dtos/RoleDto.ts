export class RoleDto{
    public roleId?:number;
    public roleName:string;

    constructor(roleName:string){
        this.roleName=roleName;
    }
}
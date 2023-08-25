import {Role} from "./role.enum";

export class Employee {
    id: number |undefined;
    mail: string = "";
    password: string = "";
    name: string = "";
    surname: string = "";
    role: Role = Role.USER;
    registrationTime: Date | undefined; 
}
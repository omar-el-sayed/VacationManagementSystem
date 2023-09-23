import { Department } from "./Department";

export class Employee {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  address: string | null = null;
  salary: number = 0;
  birthDate: string = '';
  hireDate: string = '';
  balance: number = 0;
  departmentId: number | null = null;
  department: Department | null = null;
}

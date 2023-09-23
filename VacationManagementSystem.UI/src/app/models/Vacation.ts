import { Employee } from "./Employee";

export class Vacation {
  id: number = 0;
  type: string = '';
  startDate: string = '';
  endDate: string = '';
  isApproved: boolean = false;
  reason: string | null = null;
  employee: Employee | null = null;
}

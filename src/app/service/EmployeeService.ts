import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/employeeRepository";

export class EmployeeService{
    constructor(private employeeRepo: EmployeeRespository) {
   
    
    }
    public async getAllEmployees(){
        return this.employeeRepo.getAllEmployees();
    }
    public async getEmployeebyID(id:string){
        return this.employeeRepo.getEmployeebyId(id);
    }
    public async softDeleteEmployeeById(id: string){
        return this.employeeRepo.softDeleteEmployeeById(id);
    }
    public async updateEmployeeDetails(employeeId: string, employeeDetails: any){
        const newEmployee = plainToClass(Employee, {
            name: employeeDetails.name,
            role: employeeDetails.role,
            experience: employeeDetails.experience,
            joining_date: employeeDetails.joining_date,
            departmentId: employeeDetails.departmentId,
        });
        return this.employeeRepo.updateEmployeeDetails(employeeId,newEmployee);
    }
    
    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                role: employeeDetails.role,
                experience: employeeDetails.experience,
                joining_date: employeeDetails.joining_date,
                departmentId: employeeDetails.departmentId,
                // isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee", "CREATE_FAIL_CODE");
        }
    }

}
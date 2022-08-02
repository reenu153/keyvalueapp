import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";


export class EmployeeRespository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }
    async getEmployeebyId(id:string){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne({id});
    }
    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    public async softDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete({ id });
    } 

    public async hardDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.delete({ id });
    }
    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.update({ id: employeeId, deletedAt: null }, {
            name: employeeDetails.name ? employeeDetails.name : undefined,
        });
        return updateEmployeeDetails;
    }
    
    }

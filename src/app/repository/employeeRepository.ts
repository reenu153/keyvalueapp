import { getConnection } from "typeorm";
import { UpdateEmployeeDto } from "../dto/UpdateEmployee";
import { Employee } from "../entities/Employee";


export class EmployeeRespository{
    async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

    async getEmployeeById(id:string, relations:string[]=['department','address']){
        const employeeRepo = getConnection().getRepository(Employee);   
        return employeeRepo.findOne(id,{ relations:relations});
    }
   

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async softRemoveEmployeeById(employee:Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softRemove(employee);
    } 

    public async hardDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.delete({ id });
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: UpdateEmployeeDto) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.save(employeeDetails);
        return updateEmployeeDetails;
    }

    public async getEmployeeByUsername(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { username },
        });
        return employeeDetail;
    }

    }

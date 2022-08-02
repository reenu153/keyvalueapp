import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/departmentRepository";


export class DepartmentService{
    constructor(private departmentRepo: DepartmentRespository) {
   
    
    }
    public async getAllDepartments(){
        return this.departmentRepo.getAllDepartments();
    }
    public async getDepartmentbyID(id:string){
        return this.departmentRepo.getDepartmentbyId(id);
    }
    public async softDeleteDepartmentById(id: string){
        return this.departmentRepo.softDeleteDepartmentById(id);
    }
    public async updateDepartmentDetails(departmentId: string, departmentDetails: any){
        const newDepartment = plainToClass(Department, {
            name: departmentDetails.name,
            // username: employeeDetails.username,
            // age: employeeDetails.age,
            departmentId: departmentDetails.departmentId,
            // isActive: true,
        });
        return this.departmentRepo.updateDepartmentDetails(departmentId,departmentDetails);
    }
    
    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                // username: employeeDetails.username,
                // age: employeeDetails.age,
                departmentId: departmentDetails.departmentId,
                // isActive: true,
            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create department", "CREATE_FAIL_CODE");
        }
    }
}
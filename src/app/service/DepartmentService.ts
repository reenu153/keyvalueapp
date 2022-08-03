import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/departmentRepository";
import { ErrorCodes } from "../util/errorCode";


export class DepartmentService{
    constructor(private departmentRepo: DepartmentRespository) {
    
    }

    public async getAllDepartments(){
        return this.departmentRepo.getAllDepartments();
    }

    public async getDepartmentById(id:string){
        const department=await this.departmentRepo.getDepartmentById(id);
        if(!department)
        {
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);
        }

        return department;
    }

    public async softDeleteDepartmentById(id: string){
        const response=await this.departmentRepo.softDeleteDepartmentById(id);
        if(response.affected==0)
        {
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);
        }

        return response;
    }

    public async updateDepartmentDetails(departmentId: string, departmentDetails: any){
        const newDepartment = plainToClass(Department, {
            name: departmentDetails.name,
            departmentId: departmentDetails.departmentId,
        });
        const new_department= this.departmentRepo.updateDepartmentDetails(departmentId,departmentDetails);
        return new_department;
    }

    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                departmentId: departmentDetails.departmentId,
            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create department", "CREATE_FAIL_CODE");
        }
    }
}
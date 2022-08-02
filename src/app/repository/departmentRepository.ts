import { getConnection } from "typeorm";
import { Department } from "../entities/Department";


export class DepartmentRespository{
    async getAllDepartments(){
         const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }
    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }
    async getDepartmentbyId(id:string){
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.findOne({id});
    }

    public async softDeleteDepartmentById(id: string) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.softDelete({ id });
    } 
    public async updateDepartmentDetails(departmentId: string, departmentDetails: any) {
        const departmentRepo = getConnection().getRepository(Department);
        const updateDepartmentDetails = await departmentRepo.update({ id: departmentId, deletedAt: null }, {
            name: departmentDetails.name ? departmentDetails.name : undefined,
        });
        return updateDepartmentDetails;
    }
}

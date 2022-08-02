import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/employeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";

export class EmployeeService{
    constructor(private employeeRepo: EmployeeRespository) {
   
    
    }
    public async getAllEmployees(){
        return this.employeeRepo.getAllEmployees();
    }
    public async getEmployeebyID(id:string){
        const employee= await this.employeeRepo.getEmployeebyId(id);
        if(!employee)
        {
            throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
        }
        return employee;
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
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password,10):'',
                // isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee", "CREATE_FAIL_CODE");
        }
    }
    public async getEmployeeByName(name: string) {
        return this.employeeRepo.getEmployeebyId(name);
    }

     public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
           throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
         }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD);
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  
}
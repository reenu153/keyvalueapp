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
import { Address } from "../entities/Address";

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

        const response=await this.employeeRepo.softDeleteEmployeeById(id);
        if(response.affected==0)
            {
                throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
            }
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: any){
        const newEmployee = plainToClass(Employee, {
            name: employeeDetails.name,
            role: employeeDetails.role,
            experience: employeeDetails.experience,
            joining_date: employeeDetails.joining_date,
            departmentId: employeeDetails.departmentId,
        });
        const data = await this.employeeRepo.updateEmployeeDetails(employeeId,newEmployee);
        if(data==null)
        {
            throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
        }
        return data;
    }
    
    public async createEmployee(employeeDetails: any) {
        try {
            const newAddress=plainToClass(Address,{
                address_line1:employeeDetails.address_line1,
                address_line2:employeeDetails.address_line2,
                city:employeeDetails.city,
                pincode:employeeDetails.pincode
            });

            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username:employeeDetails.username,
                role: employeeDetails.role,
                experience: employeeDetails.experience,
                joining_date: employeeDetails.joining_date,
                departmentId: employeeDetails.departmentId,
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password,10):'',
                address: newAddress
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee", "CREATE_FAIL_CODE");
        }
    }

    public async getEmployeeByUsername(username: string) {
        return this.employeeRepo.getEmployeebyId(username);
    }

     public employeeLogin = async (
        username: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByUsername(
          username
        );
        if (!employeeDetails) {
           throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
         }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "id": employeeDetails.id,
            "username": employeeDetails.username,
            "role":employeeDetails.role
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
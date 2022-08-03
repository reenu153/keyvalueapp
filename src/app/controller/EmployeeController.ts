import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import validationMiddleware from "../middleware/validationMiddleware";
import { UpdateEmployeeDto } from "../dto/UpdateEmployee";
import { UUIDDto } from "../dto/UUID";
import { nextTick } from "process";
import authorise from "../middleware/authorise";
import authorize from "../middleware/authorise";

class EmployeeController extends AbstractController {

  constructor(private employeeService: EmployeeService ) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  
  protected initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authorize(['admin','developer','QA','HR']),
      this.getAllEmployees
      );

    this.router.get(
      `${this.path}/:id`,
      authorize(['admin','developer','QA','HR']),
       this.getEmployeeById
       );

    this.router.get(
      `${this.path}/:username`,
      this.getEmployeebyUsername
      );

    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      this.createEmployee
    );
  
    this.router.post( 
      `${this.path}/login`, 
      this.login);
    this.router.delete(
      `${this.path}/:id`, 
      authorize(['admin']),
      validationMiddleware(UUIDDto, APP_CONSTANTS.params), 
      this.deleteEmployeeById
      );

    this.router.put(
      `${this.path}/:id`, 
      validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body), 
      this.updateEmployeeById
      );

  }

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } 
    catch (err) {
      next(err);
    }
  }

  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } 
    catch (error) {
      return next(error);
    }
  }

  private getEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getEmployeeById(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } 
    catch (error) {
      return next(error);
    }
  }
 
  private getEmployeebyUsername = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getEmployeeByUsername(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } 
    catch (error) {
      return next(error);
    }
  }
  private deleteEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.softRemoveEmployeeById(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } 
    catch (error) {
      return next(error);
    }
  }

  private updateEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    const data: any = await this.employeeService.updateEmployeeDetails(request.params.id,request.body);
    response.status(200);
    response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
  } 
  catch (error) {
    return next(error);
  }
}

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => { try{
    const loginData = request.body;
    console.log(loginData);
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.username.toLowerCase(),
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  }
  catch(error){
    next(error);
  }
};
}

export default EmployeeController;

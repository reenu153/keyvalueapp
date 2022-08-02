import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import validationMiddleware from "../middleware/validationMiddleware";
import { UpdateEmployeeDto } from "../dto/UpdateEmployee";
import { UUIDDto } from "../dto/UUID";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService ) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllEmployees);
    this.router.get(`${this.path}/:id`, this.getEmployeebyId);
    this.router.post(
      `${this.path}`,
        validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createEmployee)
      this.createEmployee
    );
    this.router.delete(`${this.path}/:id`,validationMiddleware(UUIDDto, APP_CONSTANTS.params), this.deleteEmployeeByID);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body), this.updateEmployeeByID);

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
    } catch (err) {
      next(err);
    }
  }
  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private getEmployeebyId = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getEmployeebyID(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private deleteEmployeeByID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.softDeleteEmployeeById(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private updateEmployeeByID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    const data: any = await this.employeeService.updateEmployeeDetails(request.params.id,request.body);
    response.status(200);
    response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
  } catch (error) {
    return next(error);
  }
}
}
export default EmployeeController;

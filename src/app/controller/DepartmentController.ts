import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import validationMiddleware from "../middleware/validationMiddleware";
import { UUIDDto } from "../dto/UUID";
import authorize from "../middleware/authorise";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService ) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  
  protected initializeRoutes() {
    this.router.get(`${this.path}`,authorize(['admin','HR','QA','Developer']) ,this.getAllDepartments);
    this.router.get(`${this.path}/:id`, this.getDepartmentbyId);
    this.router.post(
      `${this.path}`,
      authorize(['admin','HR']),
       validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
      this.createDepartment
    );
    this.router.delete(`${this.path}/:id`, authorize(['admin','HR']),validationMiddleware(UUIDDto, APP_CONSTANTS.params),this.deleteDepartmentByID);
    this.router.put(`${this.path}/:id`,validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),authorize(['admin','HR']), this.updateDepartmentByID);
  }

  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.departmentService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private getAllDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.departmentService.getAllDepartments();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private getDepartmentbyId = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.departmentService.getDepartmentbyID(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private deleteDepartmentByID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.departmentService.softDeleteDepartmentById(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private updateDepartmentByID = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    const data: any = await this.departmentService.updateDepartmentDetails(request.params.id,request.body);
    response.status(200);
    response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
  } catch (error) {
    return next(error);
  }
}
}

export default DepartmentController;
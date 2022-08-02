/**
 * Wraps Controllers for easy import from other modules
 */
import HealthController from "./HealthController";
import EmployeeController from "./EmployeeController";
import DepartmentController from "./DepartmentController";
import { DepartmentService } from "../service/DepartmentService";
import { EmployeeService } from "../service/EmployeeService";
import { DepartmentRespository } from "../repository/departmentRepository";
import { EmployeeRespository } from "../repository/employeeRepository";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository())),
  new DepartmentController(new DepartmentService(new DepartmentRespository()))
];


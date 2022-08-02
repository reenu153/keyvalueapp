
import { IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateEmployeeDto {

    @IsString()
    public name: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public role: string;

    @IsString()
    public joining_date: string;

    @IsUUID()
    public departmentId: string;
}
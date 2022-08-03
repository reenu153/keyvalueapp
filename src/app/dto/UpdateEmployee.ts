
import { Type } from "class-transformer";
import { IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./CreateAddress";

export class UpdateEmployeeDto {

    @IsString()
    public name: string;

    @IsString()
    public username: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public role: string;

    @IsString()
    public joiningDate: string;

    @IsUUID()
    public departmentId: string;

    @IsString()
    public password: string;

    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    public address: CreateAddressDto;
}
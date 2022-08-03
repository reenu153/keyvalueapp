
import { Type } from "class-transformer/decorators";
import { IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { Address } from "../entities/Address";
import { CreateAddressDto } from "./CreateAddress";

export class CreateEmployeeDto {

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
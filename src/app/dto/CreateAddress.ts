
import { IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";


export class CreateAddressDto {

    @IsString()
    public address_line1: string;

    @IsString()
    public address_line2: string;

    @IsString()
    public city: string;

    @IsNumber()
    public pincode: number;

}
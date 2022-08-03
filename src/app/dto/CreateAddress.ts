
import { IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";


export class CreateAddressDto {

    @IsString()
    public address_line1: string;

    @IsNumber()
    public address_line2: number;

    @IsString()
    public city: string;

    @IsUUID()
    public pincode: string;

}
import {  IsUUID } from "class-validator";

export class UUIDDto {

    @IsUUID()
    public id: string;
    
}
// import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
// import { AbstractEntity } from "./AbstractEntity";
// import { Employee } from "./Employee";


// @Entity("address")
// export class Address extends AbstractEntity {
//     @PrimaryGeneratedColumn("uuid")
//     public id: string;
//     @Column({ nullable: false })
//     public address_line1: string;
//     @Column({ nullable: false })
//     public address_line2: string;
//     @Column({ nullable: false })
//     public city: string;
//     @Column({ nullable: false })
//     public pincode: number;
//     @ManyToOne(() => Employee, (employee) => employee.address)
//         @JoinColumn()
//         public employee: Employee[];
// }
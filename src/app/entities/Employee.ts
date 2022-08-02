import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
// import { Address } from "./Address";
import { Department } from "./Department";

@Entity("employee")
export class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column({ nullable: false })
    public name: string;
    @Column({ nullable: false })
    public joining_date: string;
    @Column({ nullable: false })
    public role: string;
    @Column({ nullable: false })
    public experience: number;
    @Column({nullable:true})
    public password :string

    // @Column({ nullable: false })
    // public address_id:string;
    // @OneToOne(()=> Address,address => address)
    // @JoinColumn()
    // public address: Address; 

    @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department; 
    @Column({ nullable: false })
    public departmentId: string;
}

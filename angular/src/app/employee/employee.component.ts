import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
  
})
export class EmployeeComponent implements OnInit{

  
  firstInput: string = 'First Name';
  secondInput: string = 'Last Name';
  thirdInput: string = "Employee's Skill";
  fourthInput: string = 'Search Employees By Skill';
  

  firstName: string;
  lastName: string;
  skill: string;
  skillOptions: string[] = ['','Java', 'Python', 'Scala', 'Scripting'];
  selecedSkill: string;
  returnedList: IEmployee[];
  
  
  constructor(private serviceData: EmployeeService){}
  
  onSubmit() { 

    //If all entries are null return all employees.
    if(this.firstName === null || undefined 
        && this.lastName === null || undefined  
        && this.skill === null || undefined  
        && this.selecedSkill === null || undefined ){
           
            this.serviceData.getEmployees().subscribe( data => {
                this.returnedList = data;
            });
    } else 
    //If all entries are not null except selected skill, post employee.
    if (this.firstName != null || undefined 
        && this.lastName != null || undefined 
        && this.skill != null || undefined 
        && this.selecedSkill === null || undefined){
            
            let employee: IEmployee = {} as any;
            employee.firstName = this.firstInput;
            employee.lastName = this.lastName;
            employee.skill = this.skill;
            this.serviceData.postEmployee(employee);
    } else
    //If all entries are null except for selectedskill return all employees with the selected skill.
    if(this.firstName === null || undefined 
        && this.lastName === null || undefined 
        && this.skill === null || undefined 
        && this.selecedSkill != null || undefined){
           
            this.serviceData.getEmployeesBySkill(this.selecedSkill).subscribe( data => {
                this.returnedList = data;
            });
    } else
    //If all entries are not null post employee information, and return all employees with the selected skill.
    if(this.firstName != null || undefined 
        && this.lastName != null || undefined 
        && this.skill != null || undefined 
        && this.selecedSkill != null || undefined){
            let employee: IEmployee = {} as any;
            employee.firstName = this.firstInput;
            employee.lastName = this.lastName;
            employee.skill = this.skill;
            
            this.serviceData.postEmployee(employee);
            this.serviceData.getEmployeesBySkill(this.selecedSkill).subscribe( data => {
                this.returnedList = data;
            });
    } // have to handle half data
  
}

    ngOnInit(): void {
        //used to populate skilloptions dropdown
        this.serviceData.populateSkillOptions().subscribe( data => {
            this.skillOptions = data;
        });
        
    }
     
}
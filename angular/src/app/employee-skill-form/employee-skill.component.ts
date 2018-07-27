import { Component, OnInit } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { IEmployeeSkill } from './employee-skill';
import { EmployeeSkillService } from '../services/employee-skill.service';

@Component({
  selector: 'employee-skill',
  templateUrl: './employee-skill.component.html',
  styleUrls: ['./employee-skill.component.css']
  
})
export class EmployeeSkillComponent implements OnInit{

  
  firstInput: string = 'First Name';
  secondInput: string = 'Last Name';
  thirdInput: string = "Employee's Skill";
  fourthInput: string = 'Search Employees By Skill';
  

  firstName: string;
  lastName: string;
  skill: string;
  skillOptions: string[] = ['','Java', 'Python', 'Scala', 'Scripting'];
  selecedSkill: string;
  returnedList: IEmployeeSkill;
  
  
  constructor(public serviceData: EmployeeSkillService){}
  
  onSubmit() { 
    //If everything is null return all employees.
    if(this.firstName === null || undefined 
        && this.lastName === null || undefined  
        && this.skill === null || undefined  
        && this.selecedSkill === null || undefined ){
           
            //this.serviceData.getEmployees();
    } else 
    //If everything is null execpt selected skill post employee data.
    if (this.firstName != null || undefined 
        && this.lastName != null || undefined 
        && this.skill != null || undefined 
        && this.selecedSkill === null || undefined){
            
            let employeeSkills: IEmployeeSkill = {} as any;
            employeeSkills.firstName = this.firstInput;
            employeeSkills.lastName = this.lastName;
            employeeSkills.skill = this.skill;
            this.serviceData.postEmployee(employeeSkills);
    } else
    //If everything is null except for selectedskill return the users with that selected skill.
    if(this.firstName === null || undefined 
        && this.lastName === null || undefined 
        && this.skill === null || undefined 
        && this.selecedSkill != null || undefined){
           
            //this.serviceData.getEmployeesBySkill(this.selecedSkill);
    } else
    //If everything is not null post employee information and return employees with the selected skill.
    if(this.firstName != null || undefined 
        && this.lastName != null || undefined 
        && this.skill != null || undefined 
        && this.selecedSkill != null || undefined){
            let employeeSkills: IEmployeeSkill = {} as any;
            employeeSkills.firstName = this.firstInput;
            employeeSkills.lastName = this.lastName;
            employeeSkills.skill = this.skill;
            this.serviceData.postEmployee(employeeSkills);
            //this.serviceData.getEmployeesBySkill(this.selecedSkill);
    } // have to handle half data
  
}

    ngOnInit(): void {
        //This will be used to grab employee skills from db, and populate in dropdown Selection (hard coded as of now)
        //this.serviceData.populateSkillsList().subscribe(data => {
          //this.skillOptions = data;
        //});
     }
}
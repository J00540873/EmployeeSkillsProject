import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployeeSkill } from '../employee-skill-form/employee-skill';

 
@Injectable({
  providedIn: 'root',
})
export class EmployeeSkillService {
  
    listOfSkills: string = '/employee/skills/api/listofskills';
    bySkills: string = '/employee/byskills/api/:skill';
    skills: string = '/employee/skills/api';
    
    constructor(private http: HttpClient){}
    
    postEmployee(employeeSkills: IEmployeeSkill){
        return this.http.post(this.skills, employeeSkills);
    }

    //getEmployees(): Observable<IEmployeeSkill>{
        //return this.http.get<IEmployeeSkill>(this.skills).map(data => data.json);
    //}

    getEmployeesBySkill(skill: string){
        return this.http.get(this.bySkills+skill);
    }

    populateSkillsList() {
        return this.http.get(this.listOfSkills);
    }
    
}
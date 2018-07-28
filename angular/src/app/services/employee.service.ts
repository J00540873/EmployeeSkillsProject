import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../employee/employee';
import { Observable } from 'rxjs/Observable';



 
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
    private listOfSkills: string = '/api/employee/listof/skills/';
    private bySkills: string = '/api/employee/employeesby/';
    private employee: string = '/api/employee/';
    
    constructor(private http: HttpClient){}
    
    postEmployee(employee: IEmployee): Observable<IEmployee[]>{
        return this.http.post(this.employee, employee);
    }
    //Obersable and map functions would not import correctly
    getEmployees(): Observable<IEmployee[]>{
        return this.http.get<IEmployee[]>(this.employee).map(data => data.json());
    }

    getEmployeesBySkill(skill: string): Observable<IEmployee[]>{
        return this.http.get(this.bySkills+skill).map(data => data.json());
    }

    populateSkillOptions(): string[] {
        return this.http.get(this.listOfSkills).map(data => data.json());
    }
    
}
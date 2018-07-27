import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeSkillComponent} from './employee-skill-form/employee-skill.component'
import { EmployeeSkillService } from './services/employee-skill.service'

@NgModule({
  declarations: [
    EmployeeSkillComponent,
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

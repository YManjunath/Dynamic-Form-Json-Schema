import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsonFormData } from './components/json-form/json-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public formData:any;

  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
    this.http.get('/assets/my-form.json').subscribe((res)=>{
      this.formData = res;
    })
  }




  title = 'dynamic-form-app';
}

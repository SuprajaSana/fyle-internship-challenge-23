import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fyle-frontend-challenge';
  p: number = 1;
  limit = 10;
  obj = {};
  isLoading = true;
  loadContent = false;
  keysArr: any = [];
  valuesArr: any = [];
  reposArr: any = [];
  displayObj: boolean = false;
  myform!: FormGroup;
  name!: FormControl;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.createForm();
  }

  createForm() {
    this.myform = new FormGroup({
      name: this.name,
    });
  }

  onSubmit() {
    if (this.myform) {
      this.getMethod();
      this.loadContent = true;
    }
  }

  getMethod() {
    this.displayObj = false;
    this.apiService.getUser(this.myform.value.name).subscribe((response) => {
      if (response) {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
        this.displayObj = true;
        this.obj = response;
        this.keysArr = Object.keys(this.obj);
        this.valuesArr = Object.values(this.obj);
        this.apiService.getRepos(this.valuesArr[0]).subscribe((res) => {
          if (res) {
            this.reposArr = res;
          }
        });
      }
    });
    this.myform.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css'],
})
export class MainTaskComponent implements OnInit {
  user: any = null;
  tasks: Array<any> = [];
  miFormulario: FormGroup = this.fb.group({
    newTask: [''],
  });

  constructor(
    private crudService: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.user = this.crudService.user;
    this.crudService.read().subscribe((res) => {
      this.tasks = res.tareas;
    });

  }


  create() {
    this.crudService.create(this.miFormulario.value.newTask).subscribe((response) => {
      this.miFormulario.reset();
      this.crudService.read().subscribe((res) => {
        this.tasks = res.tareas;
      });
    });
  }

  delete(id: string) {
    this.crudService.delete(id).subscribe((response) => {
      this.crudService.read().subscribe((res) => {
        this.tasks = res.tareas;
      });
    });
  }

  update(task: any){
   const {_id, nombre} = task;
   this.router.navigateByUrl(`/task/${_id}/${nombre}`);

  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth');
  }
}

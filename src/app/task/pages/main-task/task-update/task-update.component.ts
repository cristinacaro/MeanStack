import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../../services/crud.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css'],
})
export class TaskUpdateComponent implements OnInit {
  user: any = null;
  id: string = '';
  miFormulario: FormGroup = this.fb.group({
    newTask: [''],
  });

  constructor(
    private crudService: CrudService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.crudService.user;
    this.activateRoute.params.subscribe((params) => {
      this.miFormulario.setValue({ newTask: params['nombre'] }),
        (this.id = params['id']);
    });
  }

  update() {
    this.crudService
      .update(this.id, this.miFormulario.value.newTask)
      .subscribe((res) => {
        this.router.navigateByUrl("/task");
      });
  }
}

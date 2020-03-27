import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';

@Component({
  selector: 'createexercise',
  templateUrl: 'createexercise.component.html'
})
export class CreateExerciseComponent implements OnInit {
  exerciseForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.exerciseForm = this.formBuilder.group({
      exerciseName: ['', Validators.required],
      exerciseCount: ['', Validators.required],
      exerciseDate: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.exerciseForm.controls; }

  // submit exercise
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.exerciseForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.createExercise(this.exerciseForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Created exercise successful', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

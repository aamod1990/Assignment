import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Exercise } from '../_models';
import { AlertService, UserService } from '../_services';

@Component({
  selector: 'edit',
  templateUrl: 'edit.component.html'
})
export class EditExerciseComponent implements OnInit {
  updateExercise: Exercise;
  editExercise: any = {};
  editExerciseForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    // subscribe update data
    this.userService.currentMessage.subscribe(message => this.editExercise = message)
    this.editExerciseForm = this.formBuilder.group({
      exerciseName: ['', Validators.required],
      exerciseCount: ['', Validators.required],
      exerciseDate: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editExerciseForm.controls; }
  // submit update form
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editExerciseForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.updateExercise(this.editExerciseForm.value, this.editExercise)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Exercise updated successful', true);
          localStorage.removeItem('updateExercise');
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

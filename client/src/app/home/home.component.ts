import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../_models';
import { Exercise } from '../_models';
import { AlertService, UserService } from '../_services';
@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  show: Boolean;
  updateData: any[] = [];
  exercises: any[] = [];

  constructor(private userService: UserService, private router: Router, private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }
  // delete exercise
  deleteExercise(id: string) {
    const r = confirm(`Are you sure you want to delete ? Id =${id}`);
    if (r == true) {
      this.userService.delete(id).pipe(first()).subscribe(() => {
        this.alertService.success('Exercise deleted successful', true);
        this.loadAllUsers()
      });
    } else {
      console.log("cancel");
    }
  }
  // edit exercise
  editExercise(ex) {
    this.updateData = ex;
    this.userService.changeMessage(this.updateData)
    this.router.navigate(['/edit']);
  }
  // load data
  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe((data: any) => {
      this.exercises = data.data;
      if (this.exercises.length === 0) {
        this.show = true
      }
    });
  }
}

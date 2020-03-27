import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { Exercise } from '../_models';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Exercise[]>(`${environment.apiUrl}/exercise`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/signup`,{ email: user.username, password: user.password });
    }
    createExercise(exercise: Exercise) {
      return this.http.post(`${environment.apiUrl}/exercise`,{ exerciseName: exercise.exerciseName, exerciseCount: exercise.exerciseCount,exerciseDate:exercise.exerciseDate });
  }

  updateExercise(exercise: Exercise,ex: Exercise) {
        return this.http.put(`${environment.apiUrl}/exercise/` + ex._id, {exerciseName: exercise.exerciseName, exerciseCount: exercise.exerciseCount,exerciseDate:exercise.exerciseDate });
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/exercise/` + id);
    }
    private messageSource = new BehaviorSubject([]);
    currentMessage = this.messageSource.asObservable();

    changeMessage(message: any) {
      this.messageSource.next(message)
    }

}

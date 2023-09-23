import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vacation } from '../models/Vacation';
import { VacationService } from '../services/vacation.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-new-vacation',
  templateUrl: './request-new-vacation.component.html',
  styleUrls: ['./request-new-vacation.component.css']
})
export class RequestNewVacationComponent {

  requestVacationForm: FormGroup = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    type: new FormControl('annual', [Validators.required, Validators.pattern(/^(sick|annual)$/)]),
    reason: new FormControl('')
  });

  constructor(private _authService: AuthService, private _vacationService: VacationService, private router: Router) { }

  submitForm() {
    if (this.requestVacationForm.valid) {
      let vacation: Vacation = new Vacation();
      vacation = this.requestVacationForm.value;
      const token = this._authService.getToken();
      if (token) {
        this._vacationService.requestVacation(vacation, token).subscribe(
          (vacation: Vacation) => {
            alert('Vacation request submitted successfully, waiting for approval.');
            this.router.navigate(['/vacations']);
          },
          err => {
            alert('Error: ' + err.error);
          });
      }
    }
    else {
      this.requestVacationForm.markAllAsTouched();
    }
  }

}

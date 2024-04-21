import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, finalize, take, takeUntil, tap, timer } from 'rxjs';
import { PasswordGeneratorService } from './password-generator.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-generator-form',
  templateUrl: './password-generator-form.component.html',
  styleUrl: './password-generator-form.component.scss'
})
export class PasswordGeneratorFormComponent implements OnDestroy{
 generatedPassword: string | null = null;
  passwordForm: FormGroup;
  passwordSubscription: Subscription | null = null;
  countdownValue: number = 60; // Countdown time in seconds
  countdown: number = this.countdownValue;
  countdownMapping: any = {
    '=1': '# second',
    other: '# seconds',
  };
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private passwordGeneratorService: PasswordGeneratorService,
    private toastr: ToastrService,
  ) {
    this.passwordForm = this.formBuilder.group({
      length: [Number, [Validators.required, Validators.min(8), Validators.max(15)]], // Default length of password is 8 characters
    });
  }

 generatePassword() {
    if (this.passwordForm.valid && !this.passwordSubscription) {
      const length = this.passwordForm.get('length')?.value;
      this.passwordSubscription = this.passwordGeneratorService
        .getPassword(length).subscribe({
          next: (response : any) =>{
            this.generatedPassword = response.password;
            if (this.generatedPassword) {
              this.startCountdown(this.generatedPassword);
                this.passwordForm.reset();
            }
           
          },
          error: (error) =>{
              console.error('Error generating password:', error);
            this.toastr.error('Password supposed to have only numbers','Error generating password: ');
          }
        })
      this.countdown = this.countdownValue; 
    } else {
      this.toastr.error('Please enter a valid password length.', 'Error');
    }
  }
  
  
  startCountdown(generatedPassword: string) {
    this.toastr.info(generatedPassword,'This is your generated password. Your password is valid for just 60 seconds.', {
      positionClass: 'toast-top-center',
      timeOut:60000
    });
    timer(1000, 1000)
      .pipe(
        finalize(() => {
          this.clearGeneratedPassword();
          this.toastr.error(
            'Your generated password already expired. Click on the generate button to generate a new one.',
            'Password Expired',
            {
              closeButton: true,
              positionClass: 'toast-top-center',
            }
          );
        }),
        take(this.countdownValue),
        takeUntil(this._unsubscribeAll),
        tap(() => this.countdown--)
      )
      .subscribe();
  }

  clearGeneratedPassword() {
    this.generatedPassword = null;
    this.passwordSubscription?.unsubscribe();
    this.passwordSubscription = null;
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PasswordGeneratorFormComponent } from './password-generator-form/password-generator-form.component';
@NgModule({
  declarations: [AppComponent, PasswordGeneratorFormComponent],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule, // Import CommonModule before other modules
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterOutlet,
    MatProgressSpinnerModule,
      ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      timeOut: 5000,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

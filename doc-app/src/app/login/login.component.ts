import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary modules
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { // Implement OnInit
  loginForm: FormGroup = new FormGroup({}); // Define loginForm

  username: string = '';
  password: string = '';
  errorMessage: string = ''; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) {}

  ngOnInit() {
    // Initialize loginForm with form controls and validators
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      // Do not proceed if the form is invalid
      return;
    }

    // Extract form values
    const { username, password } = this.loginForm.value;

    // Call the login method from the AuthService
    this.authService.login(username, password).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/home');
        
      },
      (error) => {
        // Handle login error here
        console.error('Login error:', error);
        this.errorMessage = 'Invalid username or password';
        // You can also display an error message to the user if needed
      }
    );
  }
}
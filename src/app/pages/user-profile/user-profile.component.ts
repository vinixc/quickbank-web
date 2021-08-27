import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserImpl } from 'src/app/core/user/user.impl';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user$ : Observable<UserImpl>;
  userProfileForm : FormGroup; 

  constructor(
    private userService : UserService,
    private formBuilder : FormBuilder,
    ) 
  {
    this.user$ = userService.getUser();
  }

  ngOnInit() {
    this.userProfileForm = this.formBuilder.group({
      username:['', Validators.required],
      email: ['', Validators.required],
      nome : ['', Validators.required],
      agencia: ['', Validators.required],
      conta : ['', Validators.required]
    });

    this.userProfileForm.controls['username'].disable();
    this.userProfileForm.controls['email'].disable();
    this.userProfileForm.controls['nome'].disable();
    this.userProfileForm.controls['agencia'].disable();
    this.userProfileForm.controls['conta'].disable();

    this.user$.subscribe(user =>{
        this.userProfileForm.get('username').setValue(user.filterName);
        this.userProfileForm.get('email').setValue(user.email);
        this.userProfileForm.get('nome').setValue(user.name);
        this.userProfileForm.get('agencia').setValue(user.agencia);
        this.userProfileForm.get('conta').setValue(user.conta);
    });
  }
}

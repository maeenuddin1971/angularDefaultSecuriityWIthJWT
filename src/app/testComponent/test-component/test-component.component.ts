import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { LoginService } from 'src/app/login/service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {
  baseUrl = environment.baseUrl;

  constructor(
    public loginService: LoginService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.authenticateUser();
  }

  authenticateUser() {
    let apiURL = this.baseUrl + "/generateToken"
    let queryParams: any = {};
    queryParams['username'] = "maeen";
    queryParams['password'] = "1234";

    this.loginService.generateToken(queryParams).pipe(delay(1300)).subscribe((data: any) => {

      console.log("this is token");
      console.log(data);

      this.loginService.loginUser(data.token);
      this.welcomeComponent();
    })

  }

  welcomeComponent() {
    this.loginService.welocmeAuthentication().subscribe((response: any) =>{
       console.log("this is welcomed");
       console.log(response)
    })
  }

}

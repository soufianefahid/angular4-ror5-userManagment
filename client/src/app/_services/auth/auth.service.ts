import { Injectable } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Response} from "@angular/http";
import {Subject, Observable} from "rxjs";

@Injectable()
export class AuthService {
  userSignedIn$:Subject<boolean> = new Subject();
  constructor(public authService:Angular2TokenService) {
    this.authService.validateToken().subscribe(
      res => res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
    )
   }
   logOutUser():Observable<Response>{
        return this.authService.signOut().map(
            res => {
              this.userSignedIn$.next(false);
              return res;
            }
        );
    }
    logInUser(signInData: {email:string, password:string}):Observable<Response>{
          return this.authService.signIn(signInData).map(
              res => {
                this.userSignedIn$.next(true);
                return res
              }
          );
    }
  
}

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, of, map, tap, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  private baseUrl = environment.baseUrl;

  private  _user : any = null ;

  get user() {
    return this._user;
  }

  constructor(private httpClient : HttpClient) { }




  login(data: any){

    const {email, password} = data;

   return this.httpClient.post<any>(`${this.baseUrl}/auth/login`,data)
    .pipe(
      tap((res) =>{

        if(res.ok === true){
          this._user = {
            id : res.id,
            username : res.username,
            token : res.token,
          }
        } else{
          this._user = null;
        }

      }),
      map((res) => res.ok),
      catchError((err) => of(err.error.msg))
    );
    }

    register(data : any){

      const {username , email, password} = data;

   return this.httpClient.post<any>(`${this.baseUrl}/auth/register`,data )
    .pipe(
      tap((res) =>{

        if(res.ok === true){
          this._user = {
            id : res.id,
            username : res.username,
            token : res.token,
          }
        } else{
          this._user = null;
        }

      }),
      map((res) => res.ok),
      catchError((err) => of(err.error.msg))
    );

    }


    validarToken() : Observable<boolean>
    {
      const token = JSON.parse(localStorage.getItem("user")!);

      if(token){
        return new Observable((suscriber) =>{
          suscriber.next(true);

        })

      }else{
        return new Observable((suscriber) =>{
          suscriber.next(false);

        })
      }
    }
}



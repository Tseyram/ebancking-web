import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient){}


  public getAccount(accountId:string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>("http://localhost:8082/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size)
}
 public debit(accountId:string, amount:number, description:string){
  let data={accountId:accountId, amount:amount, description:description}
   return this.http.post("http://localhost:8082/accounts/debit",data);
 }

   public credit(accountId:string, amount:number, description:string){
    let data={accountId:accountId, amount:amount, description:description}
     return this.http.post("http://localhost:8082/accounts/credit",data);
   }
     public transfert(accountSource:string, accountDestination:string, amount:number, description:string){
      let data={accountSource, accountDestination, amount, description}
       return this.http.post("http://localhost:8082/accounts/transer",data);
     }
// }
// public saveCustomer(customer:Customer): Observable<Customer>{
//   return this.http.post<Customer>("http://localhost:8082/customers", customer);
// }
// public deleteCustomer(id:number){
//   return this.http.delete("http://localhost:8082/customers/"+id);
// }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient){}


  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>("http://localhost:8082/customers")
}
public searchCustomers(keyword:string): Observable<Array<Customer>> {
  return this.http.get<Array<Customer>>("http://localhost:8082/customers/search?keyword="+keyword)
}
public saveCustomer(customer:Customer): Observable<Customer>{
  return this.http.post<Customer>("http://localhost:8082/customers", customer);
}
public deleteCustomer(id:number){
  return this.http.delete("http://localhost:8082/customers/"+id);
}
}

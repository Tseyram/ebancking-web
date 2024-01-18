import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {


customers! : Observable<Array<Customer>>;
errorMessage!:string ;
searchFormGroup! : FormGroup
  constructor(private customerService:CustomerService, private fb:FormBuilder){}


  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword: this.fb.control("")
  });
  this.customers=this.customerService.getCustomers().pipe(
    catchError(err=>{this.errorMessage=err.message;
    return throwError(err);})
  );
    //     this.customers.getCustomers().subscribe({
    //   next:(data: any)=>{
    //     this.customers=data;
    //   },
    //   error:(err: any)=>{this.errorMessage=err.message;
    // }
  // });

  }
  handleSearchCustomers(){
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err=>{this.errorMessage=err.message;
      return throwError(err);})
    );
  }
  handleDeleteCustomer( c:Customer) {
    let conf =confirm("Are you sure?")
    if (!conf) return;
  this.customerService.deleteCustomer(c.id).subscribe({
    next: resp=>{this.customers=this.customers.pipe(map(
      data=> {let index=data.indexOf(c);
        data.slice(index,1)
        return data;

      })

    );},
    error:err=>{console.log(err);}
  })
  }
}

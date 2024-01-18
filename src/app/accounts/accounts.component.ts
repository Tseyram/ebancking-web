import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

accountFormGroup!:FormGroup;
operationFormGroup!:FormGroup;
currentPage:number=0;
  pageSize:number=5;
  account!:Observable<AccountDetails>
constructor(private fb:FormBuilder, private accountService:AccountService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.accountFormGroup=this.fb.group({
    accountId:this.fb.control("")
});
this.operationFormGroup=this.fb.group({

  operationType:this.fb.control(null),
  amount:this.fb.control(0),
  description:this.fb.control(null),
  accountDestination : this.fb.control(null)
});
}
handleAccountOperation() {
  let accountId:string=this.accountFormGroup.value.accountId;
  let operationType=this.operationFormGroup.value.operationType;
  let amount:number=this.operationFormGroup.value.amount;
  let description:string=this.operationFormGroup.value.description;
  let accountDestination:string=this.operationFormGroup.value.accountDestination;
  if(operationType=='DEBIT'){
    this.accountService.debit(accountId,amount,description).subscribe(
      {
        next: data=>{
          alert('Succes debit');
          this.handleSearchAccount();
        },
        error:err=>{
          console.log(err);
        }
      }
    );
  }
  else if (operationType=='CREDIT'){
    this.accountService.credit(accountId,amount,description).subscribe(
      {
        next: data=>{
          alert('Succes credit');
          this.handleSearchAccount();},
        error:err=>{
          console.log(err);
        }
      });
  }
  else if (operationType=='TRANSFERT'){
    this.accountService.transfert(accountId,accountDestination,amount,description).subscribe(
    {
      next: data=>{
        alert('Succes transfer');
        this.handleSearchAccount();
      },
      error:err=>{
        console.log(err);
      }
    }
  );}
  this.operationFormGroup.reset();
}

  gotToPage(page: number) {
  this.currentPage=page;
  this.handleSearchAccount();
  }

  handleSearchAccount() {
  let accountId:string=this.accountFormGroup.value.accountId;
  this.account=this.accountService.getAccount(accountId, this.currentPage,this.pageSize);
  }
}

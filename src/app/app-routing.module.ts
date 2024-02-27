import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { CustomersComponent } from './customers/customers.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {authorizationGuard} from "./guards/authorization.guard";

const routes: Routes = [

  {path:"",redirectTo:"/login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminTemplateComponent, children:[{path:"customers", component: CustomersComponent},
      {path: "accounts", component: AccountsComponent},
      {path:"new-customer", component:NewCustomerComponent, canActivate :[authorizationGuard], data:{role:"ADMIN"}},]},
  {path:"notAuthorized", component:NotAuthorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

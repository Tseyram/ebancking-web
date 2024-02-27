import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountsComponent } from './accounts/accounts.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {AppHttpInterceptor} from "./inteceptors/app-http.interceptor";
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import {authorizationGuard} from "./guards/authorization.guard";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    AccountsComponent,
    NewCustomerComponent,
    LoginComponent,
    AdminTemplateComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    authorizationGuard,
    {provide :HTTP_INTERCEPTORS, useClass : AppHttpInterceptor, multi:true},
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

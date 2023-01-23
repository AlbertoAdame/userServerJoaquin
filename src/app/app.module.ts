import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { ServersModule } from './servers/servers.module';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth-guard.service';

import { ServersService } from './servers/services/servers.service';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    UsersModule,
    ServersModule,
    FormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
    },
  ServersService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

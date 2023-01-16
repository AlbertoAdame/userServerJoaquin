import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from 'src/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { RolGuardGuard } from './rol-guard.guard';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers/servers.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users/users.component';

//Este es el mio, el otro es la forma correcta que hizo el maestro(mejor hacer como el otro), 
// pero sin embargo en el programa funciona este

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { 
        path: ':id', 
        component: UserComponent }
    ]
  },
  
  {
    path: 'servers',
    canActivate: [AuthGuard],
    component: ServersComponent,
    children: [
      { path: ':id/edit', component: EditServerComponent, canActivate: [RolGuardGuard] },
      { path: ':id', component: ServerComponent}
    ]
  },
  
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

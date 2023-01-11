import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users/users.component';
import { ServersComponent } from './servers/servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
    { 
        path: 'users', 
        component: UsersComponent, 
        children: [
            {
                path: ':id/:name', 
                component: UserComponent 
            },
        ] 
    },
    { 
        path: '',
        component: HomeComponent 
    },
    { path: 'servers', 
    component: ServersComponent, 
    children: 
        [
            { 
                path: ':id/edit', 
                component: EditServerComponent 
            },
            { 
                path: ':id', 
                component: ServerComponent 
            }
        ] 
    },
    { 
        path: 'servers', 
        // canActivate:[AuthGuardService], 
        canActivateChild: [AuthGuardService],
        component: ServersComponent, 
        children: 
            [
                { 
                    path: ':id/edit', 
                    canActivate:[AuthGuardService], 
                    component: EditServerComponent 
                },
                {
                    path: ':id', 
                    canActivate:[AuthGuardService], 
                    component: ServerComponent 
                }
            ]
    },

    { 
        path: 'not-found', 
        component: NotFoundComponent
    },
    { 
        path: '**', 
        redirectTo: '/not-found'
    }
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
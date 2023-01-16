import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Server } from '../interfaces/server.interfaces';
import { ServersService } from '../services/servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html'
})
export class ServersComponent implements OnInit {
  servers: Server[]= [];
  constructor(private serversService: ServersService, private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated())
      this.servers = this.serversService.servers;
  }


}

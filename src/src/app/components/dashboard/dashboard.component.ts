import { Component, OnInit } from '@angular/core';
import {ArtService} from "../../services/art.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public artService: ArtService, private router: Router,) { }

  ngOnInit(): void {
    this.loadArt();
  }

  async signOut() {
    await this.artService.nearService.handleSignOut();
    localStorage.removeItem(`near-api-js:keystore:${this.artService.nearService.accountId}:testnet`);
    await this.router.navigate(['/']);
  }

  async loadArt() {
    await this.artService.loadArt();
  }
}

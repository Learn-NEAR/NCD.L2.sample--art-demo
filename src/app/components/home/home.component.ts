import { Component, OnInit } from '@angular/core';
import {ArtService} from "../../services/art.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public artService: ArtService, private router: Router) { }

  ngOnInit(): void {
    if (this.artService.nearService.accountId !== '') {
      this.router.navigate(['dashboard'])
    }
  }

  async signIn() {
    await this.artService.nearService.handleSignIn();
  }
}

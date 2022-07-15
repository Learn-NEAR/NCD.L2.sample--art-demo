import { Injectable } from '@angular/core';
import { NearService } from "./near.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ArtService {
  public generatedDesign: any = false;
  public myDesign: any = false;
  public isLoading = false;
  public err = null;

  constructor(public nearService: NearService, private toastr: ToastrService) { }

  async handleGenerateDesign(accountId: any) {
    this.isLoading = true
    await this.nearService.generateDesign(accountId)
    this.generatedDesign = await this.nearService.getTempDesign(accountId)
    this.isLoading = false
  }

  async handleClaimDesign(seed: any) {
    this.isLoading = true

    if (this.myDesign) {
      this.toastr.error('You can only own one design.')
      this.isLoading = false;
      return;
    }

    await this.nearService.claimDesign(seed);
    this.myDesign = await this.nearService.getViewMyDesign(this.nearService.accountId)
    this.isLoading = false
  }

  async handleBurnDesign() {
    this.isLoading = true
    await this.nearService.burnDesign()
    this.myDesign = false
    this.isLoading = false
  }

  async loadArt() {
    try {
      this.isLoading = true
      this.generatedDesign = await this.nearService.getTempDesign(this.nearService.accountId)
      if (this.generatedDesign === null) {
        await this.handleGenerateDesign(this.nearService.accountId)
      }
      this.myDesign = await this.nearService.getViewMyDesign(this.nearService.accountId)
      this.isLoading = false
    } catch (e: any) {
      this.err = e
    }
  }
}

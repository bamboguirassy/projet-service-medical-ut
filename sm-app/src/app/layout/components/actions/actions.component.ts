import { User } from 'src/app/pages/parametrage/user/user';
import { BamboAuthService } from 'src/app/shared/services/bambo-auth.service';
import { Component, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../../services/http/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, OnDestroy {
  notifications: any[];
  messages: any[];
  files: any[];
  closeDropdown: EventEmitter<boolean>;
  @Input() layout: string;
  currentUser: User;
  subscription: Subscription;
  orientation='horizontal';

  constructor(
    private httpSv: HttpService,
    private router: Router,
    public authSrv: BamboAuthService
  ) {
    this.notifications = [];
    this.messages = [];
    this.files = [];
    this.closeDropdown = new EventEmitter<boolean>();
    this.layout = 'vertical';

    this.subscription = authSrv.currentUserProvider.subscribe((data) => {
      this.currentUser = data;
    });
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
  

  ngOnInit() {
    // this.getData('assets/data/navbar-notifications.json', 'notifications');
    // this.getData('assets/data/navbar-messages.json', 'messages');
    // this.getData('assets/data/navbar-files.json', 'files');
  }

  getData(url: string, dataName: string) {
    this.httpSv.getData(url).subscribe(
      data => {
        this[dataName] = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onCloseDropdown() {
    this.closeDropdown.emit(true);
  }


  logout(event:Event) {
    event.preventDefault();
    this.onCloseDropdown();
    setTimeout(() => {
      this.authSrv.logout();
    });
  }
}

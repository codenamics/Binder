import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() username: string;
  messages: Message[];
  messageContent: string;
  user: User;

  constructor(
    public messageService: MessageService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages() {
    this.messageService.createHubConnection(this.user, this.username);
  }
  sendMessage() {
    this.messageService
      .sendMessage(this.username, this.messageContent)
      .then(() => {
        this.messageForm.reset();
      });
  }
}

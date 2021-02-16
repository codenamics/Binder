import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from 'src/app/_models/message';
import { Pagination } from 'src/app/_models/pagination';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements AfterViewInit {
  displayedColumns: string[] = ['content', 'user', 'sent', 'button'];
  messages: Message[];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 100;
  constructor(private messageService: MessageService) {}

  ngAfterViewInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
      });
  }
  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;

    this.pageSize = event.pageSize;

    this.loadMessages();
  }
}

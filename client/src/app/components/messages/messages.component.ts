import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class MessagesComponent implements OnInit {
  displayedColumns: string[] = ['content', 'user', 'sent', 'button'];
  messages: Message[];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 20;
  loading = false;
  dataSource = new MatTableDataSource<Message>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private messageService: MessageService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMessages();
    
  }

  loadMessages() {
    this.loading = true;
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result
        this.dataSource = new MatTableDataSource(this.messages);
        this.pagination = response.pagination;
        this.loading = false;
      });
  }
  toggleInbox(container) {
    this.container = container;
    this.loadMessages();
  }
  deleteMessage(id: number) {
    this.messageService
      .deleteMessage(id)
      .subscribe(() => {

        this.messages = this.messages.filter(message => message.id != id)
        this.dataSource = new MatTableDataSource(this.messages);
        this.pagination.totalItems--
        
      })
      
  }
  
  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;

    this.pageSize = event.pageSize;

    this.loadMessages();
  }
}

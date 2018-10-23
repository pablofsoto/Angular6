import { Component } from '@angular/core';
import { ChatExampleData } from './data/chat-example-data';

import { UsersService } from './user/user.service';
import { ThreadsService } from './thread/thread.service';
import { MessagesService } from './message/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public messagesService: MessagesService,
            public threadsService: ThreadsService,
            public usersService: UsersService) {
  ChatExampleData.init(messagesService, threadsService, usersService);
}
}

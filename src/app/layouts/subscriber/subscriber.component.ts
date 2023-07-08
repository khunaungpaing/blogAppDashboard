import {Component, OnInit} from '@angular/core';
import {SubscribersService} from "../../services/subscribers.service";

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  subArrays!: Array<any>;

  constructor(private subService: SubscribersService) {

  }

  ngOnInit(): void {
    this.subService.loadData().subscribe(val => {
      this.subArrays = val;
    })
  }

  onDelete(id: any) {
    this.subService.deleteData(id);
  }
}

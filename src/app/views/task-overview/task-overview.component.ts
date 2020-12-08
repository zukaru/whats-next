import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss']
})
export class TaskOverviewComponent implements OnInit {
  fetchEntrySub: Subscription;
  

  constructor(
    public db: DatabaseService
  ) { }

  ngOnInit(): void {}

  calcAmtDue(price: string, payments: string[]) {
    
    let totalPayments = Number(this.db.getTotalPayments(payments));  

      if (( !price || price === '0')) {

      return 'Not Listed';

    } else if(  (Number(price) - Number(totalPayments) === 0)) {

      return 'Paid In Full';

    } else {

      return `${Number(price) - totalPayments}`;
      
    }
    
  }

}

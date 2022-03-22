import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "@app/services/api.service";
import { Attachment } from "@app/models/attachment";
import { UserService } from '@modules/auth/services';

import { first, map } from "rxjs/operators";
import { Profile } from "@app/models/profile.model";
import { NgbProgressbar } from "@ng-bootstrap/ng-bootstrap";
import { Pilot } from "@app/models/pilot";
import { AlertService } from "@app/services/alert.service";
import { ActivityLog } from "@modules/dashboard/models/activity-log";

@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin.component.html',
    styleUrls: ['admin.component.scss'],
})
export class AdminComponent implements OnInit {
    
  constructor(private apiService: ApiService,
    private alertService: AlertService) {}

  ngOnInit() {

  }

  // buildHtmlTable() {

  //   var activityLog: ActivityLog[];
  //   var activityList;

  //   this.apiService.get('activity-log/all').subscribe(res => {
  //     activityList = res.data.activityLogs;
  //   })
  //   var columns = addAllColumnHeaders(activityList);
  
  //   for (var i = 0; i < myList.length; i++) {
  //     var row$ = $('<tr/>');
  //     for (var colIndex = 0; colIndex < columns.length; colIndex++) {
  //       var cellValue = myList[i][columns[colIndex]];
  //       if (cellValue == null) cellValue = "";
  //       row$.append($('<td/>').html(cellValue));
  //     }
  //     $(selector).append(row$);
  //   }
  // }

  // addAllColumnHeaders(myList, selector) {
  //   var columnSet = [];
  //   var headerTr$ = $('<tr/>');
  
  //   for (var i = 0; i < myList.length; i++) {
  //     var rowHash = myList[i];
  //     for (var key in rowHash) {
  //       if ($.inArray(key, columnSet) == -1) {
  //         columnSet.push(key);
  //         headerTr$.append($('<th/>').html(key));
  //       }
  //     }
  //   }
  //   $(selector).append(headerTr$);
  
  //   return columnSet;
  // }
}

import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../core/services/people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  people!: any[];

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.peopleService.getAllPeople().subscribe((res) => {
      this.people = [...res.allPeople];
    });
  }
}

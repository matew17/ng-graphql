import { PeopleService } from './../core/services/people.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent implements OnInit {
  person: any;

  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.params['name'];

    this.peopleService.getPersonByName(name).subscribe((res) => {
      this.person = res.findPerson;
    });
  }

  deletePerson(id: string) {
    this.peopleService.deletePerson(id).subscribe(() => {
      console.log('Person deleted');

      this.router.navigate(['']);
    });
  }
}

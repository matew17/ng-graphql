import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from '../core/services/people.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent {
  form: FormGroup;
  error: any;

  constructor(private fb: FormBuilder, private peopleService: PeopleService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      phone: [''],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
    });
  }

  createPerson({ value }: FormGroup): void {
    this.error = null;

    this.peopleService
      .createPerson({
        name: value.name,
        phone: value.phone,
        street: value.street,
        city: value.city,
      })
      .subscribe({
        next: (res) => {
          console.log('person Created', res);
          this.form.reset();
        },
        error: (e) => {
          console.log(e);
          this.error = e.message;
        },
      });
  }
}

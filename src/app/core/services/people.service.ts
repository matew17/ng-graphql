import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { Apollo, QueryRef } from 'apollo-angular';

import { GET_ALL_PEOPLE, GET_PERSON_BY_NAME } from '../queries/people.queries';
import { CREATE_PERSON, DELETE_PERSON } from '../mutations/people';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private getPeopleQuery!: QueryRef<any>;

  constructor(private apolloClient: Apollo) {}

  getAllPeople(): Observable<any> {
    this.getPeopleQuery = this.apolloClient.watchQuery({
      query: GET_ALL_PEOPLE,
    });

    return this.getPeopleQuery.valueChanges.pipe(map((res) => res.data));
  }

  getPersonByName(name: string): Observable<any> {
    return this.apolloClient
      .query({
        query: GET_PERSON_BY_NAME,
        variables: { name },
      })
      .pipe(map((res) => res.data));
  }

  deletePerson(id: string): Observable<any> {
    return this.apolloClient
      .mutate({
        mutation: DELETE_PERSON,
        variables: { id },
      })
      .pipe(
        map((res) => {
          this.getPeopleQuery.refetch();

          return res.data;
        })
      );
  }

  createPerson({
    name,
    phone,
    street,
    city,
  }: {
    name: string;
    phone: string;
    street: string;
    city: string;
  }): Observable<any> {
    return this.apolloClient
      .mutate({
        mutation: CREATE_PERSON,
        variables: { name, phone, street, city },
      })
      .pipe(
        map((res) => {
          this.getPeopleQuery.refetch();

          return res.data;
        })
      );
  }
}

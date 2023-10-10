import { gql } from 'apollo-angular';

export const GET_ALL_PEOPLE = gql`
  query getAllPeople {
    allPeople {
      name
      address {
        city
        street
      }
      phone
      id
    }
  }
`;

export const GET_PERSON_BY_NAME = gql`
  query ($name: String!) {
    findPerson(name: $name) {
      id
      name
      address {
        city
        street
      }
      phone
    }
  }
`;

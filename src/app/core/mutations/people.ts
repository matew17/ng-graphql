import { gql } from 'apollo-angular';

export const DELETE_PERSON = gql`
  mutation ($id: String!) {
    deletePerson(id: $id) {
      id
    }
  }
`;

export const CREATE_PERSON = gql`
  mutation ($name: String!, $city: String!, $street: String!, $phone: String) {
    addPerson(name: $name, city: $city, street: $street, phone: $phone) {
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

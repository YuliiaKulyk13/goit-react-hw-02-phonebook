import React, { Component } from 'react';
import PhoneContacts from './Phonebook/phonebook';
import Filter from './Filter/Filter';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      name,
      number,
      id: nanoid(),
    };

    // const { contacts } = this.state;
    // const normalizedFilter = name.toLowerCase();
    // const checkName = contacts.filter(contact =>
    //   contact.name.toLowerCase().includes(normalizedFilter)
    // );

    this.state.contacts.find(item => name === item.name)
      ? alert(`${name}is already in contacts.`)
      : this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, contact],
          };
        });
    console.log(contact);
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <ContactsForm onSubmit={this.addContact} />
        <Filter value={filter} onChange={this.changeFilter} />

        <PhoneContacts
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}

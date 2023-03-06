import { Contact } from "../../typescript";

export class ContactRepository {
  static listContacts: () => Promise<Contact[]> = async () => {
    const res = await fetch("http://localhost:4678/api/contacts");
    return (await res.json()) as Contact[];
  };

  static deleteContact: (id: string | undefined) => Promise<void> = async (id: string | undefined) => {
    await fetch(`http://localhost:4678/api/contacts/${id}`, {
      method: "DELETE",
    });
  };

  static addContact: (data: Contact) => Promise<void> = async (data: Contact) => {
    await fetch("http://localhost:4678/api/contacts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  static updateContact: (id: string, data: Contact) => Promise<void> = async (id: string, data: Contact) => {
    await fetch(`http://localhost:4678/api/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
}
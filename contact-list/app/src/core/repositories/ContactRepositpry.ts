import { Contact } from "../../typescript";

export class ContactRepository {
  static listProducts: () => Promise<Contact[]> = async () => {
    const res = await fetch("http://localhost:4568/");
    return (await res.json()) as Contact[];
  };

  static deleteProducts: (id: string | undefined) => Promise<void> = async (id: string | undefined) => {
    await fetch(`http://localhost:4568/${id}`, {
      method: "DELETE",
    });
  };

  static addProducts: (data: Contact) => Promise<void> = async (data: Contact) => {
    await fetch("http://localhost:4568/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
}
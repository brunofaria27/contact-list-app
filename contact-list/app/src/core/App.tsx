import React from "react";

import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Contacts } from "./components/Contacts";

function ContactsPage() {
  return (
    <>
      <Header />
      <Contacts />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </>
  );
}

export default App;

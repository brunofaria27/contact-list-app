package com.jcg.hibernate.crud.operations;

import com.google.gson.Gson;
import com.jcg.hibernate.crud.operations.models.Contact;

import static spark.Spark.*;

import java.util.HashMap;
import java.util.UUID;

public class App {

  public static void main(String[] args) {

    final var gson = new Gson();

    port(4678);

    before((req, res) -> {
      res.type("application/json");
      res.header("Access-Control-Allow-Origin", "*");
    });

    path("/api", () -> {
      get(Utils.CONTACT_PATH, (req, res) -> {
        return DbOperations.list();
      }, gson::toJson);

      post(Utils.CONTACT_PATH, (req, res) -> {
        final var id = UUID.randomUUID().toString();

        final var name = req.queryParams("nome");
        final var address = req.queryParams("endereco");
        final var phoneNumber = req.queryParams("telefone");

        DbOperations.create(Contact.builder()
            .id(id)
            .name(name)
            .address(address)
            .phoneNumber(phoneNumber)
            .build());

        return new HashMap<>();
      }, gson::toJson);

      patch(String.format("%s/:id", Utils.CONTACT_PATH), (req, res) -> {
        final var id = req.params("id");

        final var name = req.queryParams("nome");
        final var address = req.queryParams("endereco");
        final var phoneNumber = req.queryParams("telefone");

        DbOperations.update(Contact.builder()
            .id(id)
            .name(name)
            .address(address)
            .phoneNumber(phoneNumber)
            .build());

        return new HashMap<>();
      }, gson::toJson);

      delete(String.format("%s/:id", Utils.CONTACT_PATH), (req, res) -> {
        final var id = req.params("id");

        DbOperations.delete(Contact.builder()
            .id(id)
            .build());

        return new HashMap<>();
      }, gson::toJson);
    });
  }
}
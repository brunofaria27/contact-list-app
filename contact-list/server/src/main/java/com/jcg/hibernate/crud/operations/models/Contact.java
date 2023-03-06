package com.jcg.hibernate.crud.operations.models;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CONTATO_692225_742238")
public class Contact {

  @Id
  @Column(name = "id")
  private String id;

  @Column(name = "nome")
  private String name;

  @Column(name = "endereco")
  private String address;

  @Column(name = "telefone")
  private String phoneNumber;
}
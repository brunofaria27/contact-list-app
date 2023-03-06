import * as React from "react";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

import { Contact } from "../../typescript";
import { ContactRepository } from "../repositories/ContactRepositpry";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FFFFFF",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Contacts = () => {
  // Modal cadastro
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Modal editar
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [contacts, setContacts] = React.useState<Contact[]>([]);

  async function adicionarItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);

    const data: Contact = {
      nome: formData.get("nome") as string,
      endereco: formData.get("endereco") as string,
      telefone: formData.get("telefone") as string,
    };

    console.log(data)

    try {
      await ContactRepository.addProducts(data)

      handleClose();

    } catch (error) {
      console.log(error);
    }
  }

  async function carregarProdutos() {
    try {
      setContacts(await ContactRepository.listContacts());
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    carregarProdutos();
  }, []);


  function excluirProduto() {}

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          marginTop: 45,
          marginLeft: 4,
          marginRight: 4,
        }}
      >
        <Typography variant="overline">Adicionar novo contato</Typography>
        <IconButton onClick={handleOpen} aria-label="Adicionar produto">
          <AddCircleIcon />
        </IconButton>
      </div>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 1)",
          borderRadius: 3,
        }}
      >
        <Table aria-label="simple table" style={{ backgroundColor: "#FFFFFF" }}>
          <TableHead>
            <TableRow>
              <TableCell>NOME</TableCell>
              <TableCell align="right">ENDEREÇO</TableCell>
              <TableCell align="right">TELEFONE</TableCell>
              <TableCell align="right">AÇÕES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <strong>Nenhum contato foi encontrado!</strong>
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((value) => (
                <TableRow
                  key={value.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {value.nome}
                  </TableCell>
                  <TableCell align="right">{value.endereco}</TableCell>
                  <TableCell align="right">{value.telefone}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="Ações do produto"
                      style={{ color: "#000000" }}
                      onClick={handleOpen2}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Ações do produto"
                      style={{ color: "#FF0000" }}
                      onClick={() => excluirProduto()}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            📋 <strong>Cadastrar novo contato</strong>
          </Typography>
          <form onSubmit={adicionarItem}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="nome-contato">Nome do contato</InputLabel>
              <Input id="nome-contato" name="nome" required />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="endereco">Endereço</InputLabel>
              <Input id="endereco" name="endereco" required />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="telefone">Telefone</InputLabel>
              <Input
                id="telefone"
                name="telefone"
                inputProps={{ maxLength: 11 }}
                required
              />
            </FormControl>
            <div
              style={{
                marginTop: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
              }}
            >
              <div>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  sx={{ marginRight: 3 }}
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
              </div>
              <Button type="submit" variant="contained" color="primary">
                Cadastrar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            📋 <strong>Editar contato</strong>
          </Typography>
          <form onSubmit={excluirProduto}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="nome-contato">Nome do contato</InputLabel>
              <Input id="nome-contato" name="nome" required />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="endereco">Endereço</InputLabel>
              <Input id="endereco" name="endereco" required />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="telefone">Telefone</InputLabel>
              <Input
                id="telefone"
                name="telefone"
                inputProps={{ maxLength: 11 }}
                required
              />
            </FormControl>
            <div
              style={{
                marginTop: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
              }}
            >
              <div>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  sx={{ marginRight: 3 }}
                  onClick={handleClose2}
                >
                  Cancelar
                </Button>
              </div>
              <Button type="submit" variant="contained" color="primary">
                Cadastrar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

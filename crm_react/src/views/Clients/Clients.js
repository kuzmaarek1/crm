import React,{ useEffect, useState }  from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ClientsWrapper,ClientTitle, ClientHeader, ClientLink, ClientWrapper, ClientModal, ClientButton, ModalWrapper, ModalClientWrapper, ClientForm, ClientInput, ClientLinkDiv} from './Clients.styles.js';
import { useClients } from "../../hooks/useClients.js";
import { Button } from "../../components/atoms/Button/Button.js";


const Clients = () => {
 const auth = useAuth();
 const [clients, setClients] = useState([]);
 const [client, setClient] = useState([]);
 const { getClients,getClientById, deleteClient, searchClient} = useClients();
 const [modalIsOpen, setIsOpen] = React.useState(false);
 const {
  register,
  setValue,
  handleSubmit,
  formState: { errors },
} = useForm();
  const openModal=(id_lead, id_team)=> {
    setIsOpen(true);
   (async () => {
      const clientClient = await getClientById(id_lead, id_team);
      setClient(clientClient[0]);
    })();
  }

  const closeModal=()=>{
    setIsOpen(false);
  }

 useEffect(() => {
    (async () => {
      const clientsClient = await getClients(auth.teamid);
      setClients(clientsClient);
    })();
  }, [getClients, auth.teamid]);


  const handleDelete=(name)=>{
    (async () => {
      const clientsDelete = await deleteClient(name, auth.teamid);
      const clientsClient = await getClients(auth.teamid);
      setClients(clientsClient);
      setIsOpen(false);
    })();
  }

  const handleSearch=(name)=>{
    (async () => {
      const leadsClient = await searchClient(name, auth.teamid);
      setClients(leadsClient);
    })();
  }
  return (
    <ClientsWrapper>
      <ClientTitle>
        <ClientHeader>Client</ClientHeader>
        <ClientForm onSubmit={handleSubmit((register)=>{handleSearch(register.name)})}>
        <ClientInput type="serach" placeholder="Search by first name and last name" {...register("name", { required: true , onChange:(e)=>{handleSearch(e.target.value)}})} />
        </ClientForm>
        <ClientLinkDiv>
          <ClientLink to="/add-client">Add Client</ClientLink>
        </ClientLinkDiv>
      </ClientTitle>
      <ClientWrapper title>
            <div>First name</div>
            <div>Last name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Assigned to</div>
      </ClientWrapper>
      { clients &&(clients.map((client)=>(
          <ClientWrapper onClick={()=>openModal(client.id, auth.teamid)}>
            <div>{client.first_name}</div>
            <div>{client.last_name}</div>
            <div>{client.email}</div>
            <div>{client.phone}</div>
            {client.assigned_to ? <div>{client.assigned_to.username}</div>:<div></div>}
        </ClientWrapper>
      )))}
          <ClientModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      > 
        <ClientButton>
          <Button to={`/edit-client/${client.id}`} as={NavLink} lead>Edit</Button>
          <Button red onClick={()=>handleDelete(client.id)}>Delete</Button>
        </ClientButton>
        <ModalWrapper>
          <ModalClientWrapper title>First name</ModalClientWrapper><ModalClientWrapper>{client.first_name}</ModalClientWrapper>
          <ModalClientWrapper title>Last name</ModalClientWrapper><ModalClientWrapper>{client.last_name}</ModalClientWrapper>
          <ModalClientWrapper title>Email</ModalClientWrapper><ModalClientWrapper>{client.email}</ModalClientWrapper>
          <ModalClientWrapper title>Phone</ModalClientWrapper><ModalClientWrapper>{client.phone}</ModalClientWrapper>
          {client.assigned_to && (<><ModalClientWrapper title>Assigned</ModalClientWrapper><ModalClientWrapper>{client.assigned_to.username}</ModalClientWrapper></>)}
          <ModalClientWrapper title description>Description</ModalClientWrapper><ModalClientWrapper description>{client.description}</ModalClientWrapper>
        </ModalWrapper>
      </ClientModal>
    </ClientsWrapper>
  );
};

export default Clients;

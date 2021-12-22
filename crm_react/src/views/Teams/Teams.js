import React,{ useEffect, useState }  from "react";
import { NavLink } from "react-router-dom";
import { TeamsWrapper,TeamTitle, TeamHeader, TeamLink, TeamWrapper, TeamModal, ModalButton, ModalWrapper, ModalTeamWrapper} from './Teams.styles.js';
import { useTeams } from "../../hooks/useTeams.js";
import { Button } from "../../components/atoms/Button/Button.js";


const Teams = () => {
 const [teams, setTeams] = useState([]);
 const [team, setTeam] = useState([]);
 const { getTeams,getTeamsById, deleteTeam } = useTeams();
 const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal=(id)=> {
    setIsOpen(true);
   (async () => {
      const teamsClient = await getTeamsById(id);
      setTeam(teamsClient);
    })();
  }

  const closeModal=()=>{
    setIsOpen(false);
  }

 useEffect(() => {
    (async () => {
      const teamsClient = await getTeams();
      setTeams(teamsClient);
    })();
  }, [getTeams]);

  const handleDelete=(id)=>{
    (async () => {
      const teamsDelete = await deleteTeam(id);
      const teamsClient = await getTeams();
      setTeams(teamsClient);
      setIsOpen(false);
    })();
  }
  
  return (
    <TeamsWrapper>
      <TeamTitle>
        <TeamHeader>Team</TeamHeader>
        <TeamLink to="/add-team">Add Teams</TeamLink>
      </TeamTitle>
      <TeamWrapper title>
            <div>Name</div>
      </TeamWrapper>
      { teams &&( teams.map((team)=>(
          <TeamWrapper onClick={()=>openModal(team.id)}>
            <div>{team.name}</div>
            <div>{team.last_name}</div>
            <div>{team.email}</div>
            <div>{team.phone}</div>
        </TeamWrapper>
      )))}
          <TeamModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      > 
        <ModalButton>
          <Button to={`/edit-teams/${team.id}`} as={NavLink} lead>Edit</Button>
          <Button red onClick={()=>handleDelete(team.id)}>Delete</Button>
        </ModalButton>
        <ModalWrapper>
          <ModalTeamWrapper title>Name</ModalTeamWrapper><ModalTeamWrapper>{team.name}</ModalTeamWrapper>
          <ModalTeamWrapper title description>Description</ModalTeamWrapper><ModalTeamWrapper description>{team.description}</ModalTeamWrapper>
        </ModalWrapper>
      </TeamModal>
    </TeamsWrapper>
  );
};

export default Teams;

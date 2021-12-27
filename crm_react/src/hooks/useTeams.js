import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useTeams= () => {
 const navigate = useNavigate();

 const addTeam = async ({name,description}) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/teams/", {
        name,
        description,
      });
    console.log('Utworzono zespół');
    navigate('/teams');
    }
    catch (e) {
      console.log(e);
    }
  }
  const getTeams = useCallback(async () => {
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/teams/`);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const getTeamsById = useCallback(async (id) => {
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/teams/${id}/`);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const deleteTeam = async (id) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/teams/delete_team/${id}/`);
      navigate('/teams');
    }
    catch (e) {
      console.log(e);
    }  
  }
  const searchTeam = async (name) => {
    if(!name) try{ return await getTeams(); }
    catch (e){
        console.log(e);
    }
    else
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/teams/search_team/${name}/`);
            return response.data;
        }
        catch(e){
            console.log(e);
        }
    }
  return {
    addTeam,
    getTeams,
    getTeamsById,
    deleteTeam,
    searchTeam 
  };
}
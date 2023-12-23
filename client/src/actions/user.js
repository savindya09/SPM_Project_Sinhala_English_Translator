
import * as api from '../api/index.js';
import * as actionType from '../../../client/src/constants/actionTypes';

export const fetchUser = (id) => async (dispatch) => {
    try {
      const { data } = await api.fetchUser(id);
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateUser = (id, updatedUser) => async (dispatch) => {
    try {
      const { data } = await api.updateUser(id, updatedUser);

      return data;
    } catch (error) {
      console.log(error);
    }
};
  
  export const deleteUser = (id) => async (dispatch) => {
    try {
      await api.deleteUser(id);
  
      dispatch({ type: actionType.LOGOUT });
    } catch (error) {
      console.log(error);
    }
  };
  
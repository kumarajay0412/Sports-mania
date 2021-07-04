import * as ActionTypes from '../ActionTypes';
import { Auth } from 'aws-amplify';
import { postNewUser } from '../../utils/Signup/SignupRequests';

export const loginAction = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST });
    return await Auth.signIn(email, password)
      .then((res) => {
        
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: res,
          profile:res.attributes?res.attributes.profile:res.challengeParam.userAttributes.profile
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ActionTypes.LOGIN_FAILED,
          error: err.message
        });
      });
  };
};
export const newUserLoginAction = (user,newPassword)=>{
    return async (dispatch) => {
        dispatch({type: ActionTypes.NEW_USER_LOGIN_REQUEST});
        try {
            await Auth.completeNewPassword(user,newPassword);
            dispatch({type:ActionTypes.NEW_USER_LOGIN_SUCCESS,payload:(await Auth.currentUserInfo()).attributes[`profile`]})
        }
        catch(error){
            dispatch({
                type: ActionTypes.NEW_USER_LOGIN_FAILED,
                error:error.code
            })
        }
        
    }
}
export const logoutAction = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGOUT_REQUEST });
    return await Auth.signOut()
      .then((res) => {
        dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: ActionTypes.LOGOUT_FAILED, error: err.message });
        console.log(err);
      });
  };
};

export const registerAction = (
  email,
  password,
  firstName,
  lastName,
  identifier,
  profile
) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.REGISTER_REQUEST });
    return await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        given_name: firstName,
        family_name: lastName,
        'custom:identifier':identifier,
        profile: profile.name
      }
    })
      .then((res) => {
        console.log(res);
        let status="unverified";
        if(profile.name==="Student"){
          status="not applicable"
        }
        postNewUser(res.userSub,firstName,lastName,profile.name,identifier,status).then(()=>{
          dispatch({ type: ActionTypes.REGISTER_SUCCESS });
        });
      })
      .catch((err) => {
        dispatch({ type: ActionTypes.REGISTER_FAILED, error: err.message });
        console.log(err);
      });
  };
};

export const confirmSignup = (username,code)=>{
  return async(dispatch)=>{
    dispatch({type:ActionTypes.CONFIRM_SIGNUP_REQUEST});
    return await Auth.confirmSignUp(username,code)
    .then(()=>{
      dispatch({type:ActionTypes.CONFIRM_SIGNUP_SUCCESS});
    })
    .catch((err)=>{
      dispatch({type:ActionTypes.CONFIRM_SIGNUP_FAILED, error:err.message});
    })
  }
}

export const getUser = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_USER_REQUEST });
    return await Auth.currentAuthenticatedUser()
      .then(async(res) => {
        dispatch({ type: ActionTypes.UPDATE_USER_SUCCESS, payload: res, profile:(await Auth.currentUserInfo()).attributes[`profile`]});
      })
      .catch((err) => {
        dispatch({ type: ActionTypes.UPDATE_USER_FAILED, error: err });
        // console.log(err);
      });
  };
};

export const resetPassword = (username) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.RESET_PASSWORD_REQUEST });
    return await Auth.forgotPassword(username)
      .then((res) => {
        console.log(res);
        dispatch({
          type: ActionTypes.RESET_PASSWORD_SUCCESS,
          payload: res.CodeDeliveryDetails.Destination
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ActionTypes.RESET_PASSWORD_FAILED,
          error: err.message
        });
      });
  };
};

export const resetPasswordConfirm = (username, code, new_password) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.RESET_PASSWORD_CONFIRM_REQUEST });
    return await Auth.forgotPasswordSubmit(username, code, new_password)
      .then((res) => {
        dispatch({ type: ActionTypes.RESET_PASSWORD_CONFIRM_SUCCESS });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ActionTypes.RESET_PASSWORD_CONFIRM_FAILED,
          error: err.message
        });
      });
  };
};

export const resetAuthDetails = ()=>{
  return {
    type: ActionTypes.RESET_AUTH_DETAILS
  }
}
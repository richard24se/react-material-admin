import { userConstants } from '../constants';
import { alertConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    getAll
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    console.log(process.env.REACT_APP_API_USUARIOS)
                    //history.push('/');
                    //history.push("/#/app/dashboard");
                    dispatch(alertActions.success('Autentificación satisfactoria!'));
                    
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                    dispatch(alertActions.error('Algo está mal con tu contraseña :('));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    //history.push('/login')
    return dispatch =>{
        userService.logout(); 
        dispatch(reduce_logout());
        dispatch(reduce_clear_alert());
    }
     

    //return { type: userConstants.LOGOUT };
    //return { type: alertConstants.CLEAR };
    //dispatch(alertActions.error('Algo está mal con tu contraseña :('));
    function reduce_logout(){ return { type: userConstants.LOGOUT }};
    function reduce_clear_alert(){ return { type: alertConstants.CLEAR }};
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
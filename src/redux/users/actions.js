import * as c from './constants';

export const loginSubmit = () => ({
  type: c.SUBMIT_LOGIN_FORM,
});

export const refreshToken = token => ({
  types: [c.REFRESH_TOKEN, c.REFRESH_TOKEN_SUCCESS, c.REFRESH_TOKEN_FAIL],
  api: ({ post }) => post('token/refresh/', {
    data: { token },
    useToken: false,
  })
});

export const login = ({ username, password }) => ({
  types: [c.LOGIN, c.LOGIN_SUCCESS, c.LOGIN_FAIL],
  api: ({ post }) => post('token/', {
    data: { username, password },
    useToken: false,
  }),
});

export const loadUsers = () => ({
  types: [c.LOAD_USERS, c.LOAD_USERS_SUCCESS, c.LOAD_USERS_FAIL],
  api: ({ get }) => get('users/', {
    params: {
      per_page: 100,
    },
  }),
});

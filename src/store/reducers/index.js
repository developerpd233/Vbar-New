const initialState = {
  qrId: '',
  signUpToken: '',
  LocationId: '',
  user: {},
  users: [],
  userImg:{},
  socketUser: {},
  selectedUser: {},

};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_ID': {
      return { ...state, qrId: action.qrId };
    }
    case 'Token': {
      return { ...state, signUpToken: action.signUpToken };
    }
    case 'LocationId': {
      return { ...state, LocationId: action.LocationId };
    }

    case 'userDetail': {
      return { ...state, user: action.user };
    }
    case 'socketDetail': {
      return { ...state, socketUser: action.user };
    }
    case 'socketUsers': {
      return { ...state, users: action.users };
    }
    case 'selectedUser': {
      return { ...state, selectedUser: action.user };
    }
    case 'myProfile': {
      return { ...state, userImg: action.img };
    }

    default: {
      return state;
    }
  }
};
export default reducer;

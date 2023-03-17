function storeId(qrId) {
  return {
    type: 'STORE_ID',
    qrId: qrId,
  };
}
function getToken(signUpToken) {
  return {
    type: 'Token',
    signUpToken: signUpToken,
  };
}
function LocationId(LocationId) {
  return {
    type: 'LocationId',
    LocationId: LocationId,
  };
}

function addUserDetail(user) {
  return {
    type: 'userDetail',
    user: user,
  };
}
function addSocketUser(user) {
  return {
    type: 'socketDetail',
    user: user,
  };
}
function socketUser(users) {
  return {
    type: 'socketUsers',
    users: users,
  };
}
function addSelectedUser(user) {
  return {
    type: 'selectedUser',
    user: user,
  };
}
function myProfile(img) {
  return {
    type: 'myProfile',
    img: img,
  };
}

export {storeId,getToken,LocationId, addUserDetail,addSocketUser,socketUser, addSelectedUser, myProfile};

export const createNewUser = (username, email, password) => {
  return dispatch => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: 'CREATE_NEW_USER',
          username,
          email,
          password
        });
      }, 500);
    });
  }
}

export const loginUser = (email, password) => {
  return dispatch => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
    type: 'LOGIN_USER',
    email,
    password,
        });
      }, 500);
    });
  }
}

export const signOut = () => {
  return {
    type: 'LOGOUT_USER',
  }
}



export const getBook = () => {
  return dispatch => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
    type: 'GET_BOOK',
        });
      }, 500);
    });
  }
}

export const writeNewChapter = (title) => {
  return dispatch => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
    type: 'NEW_CHAPTER',
    title,
        });
      }, 500);
    });
  }
}

export const writeInChapter = (text) => {
  return dispatch => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
    type: 'UPDATE_CHAPTER_TEXT',
    text,
        });
      }, 500);
    });
  }
}

export const storeAnalysis = (analysisData) => {
  return dispatch => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
    type: 'STORE_ANALYSIS',
    analysisData,
        });
      }, 100);
    });
  }
}

export const test = () => {
  return dispatch => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: 'TEST_REDUCER'
        });
      }, 500);
    });
  }
}
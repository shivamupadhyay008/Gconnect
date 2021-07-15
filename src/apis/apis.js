import axios from "axios";
export const userFollow = async (data) => {
  try {
    const response = await axios.post(
      "https://gConnect-backend.shivam008.repl.co/user/follow",
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const userUnfollow = async (data) => {
  try {
    const response = await axios.post(
      "https://gConnect-backend.shivam008.repl.co/user/unfollow",
      data
    );
    return response;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const getUserApi = async (payload) => {
  try {
    const response = await axios.post(
      `https://gConnect-backend.shivam008.repl.co/user/searchuser/${payload.username}`,
      { userid: payload.userid }
    );
    return response;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

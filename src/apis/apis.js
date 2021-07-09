import axios from "axios";

export async function getFeedPosts() {
  try {
    const response = await axios.get(
      "https://gConnect-backend.shivam008.repl.co/post/getallposts"
    );
    return response;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

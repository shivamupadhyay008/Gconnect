import axios from "axios";
import "./createpost.css";
import { useSelector, useDispatch } from "react-redux";
import { addNewPost, createPostApi } from "../post/posts.slice";
import { Avatar, Box, Flex, Button } from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineGif } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
export function CreatePost({ userImg }) {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.user.userData);
  const [postText, setPostText] = useState("");
  const [selectupload, setSelect] = useState(null);
  async function uploadImg() {
    try {
      let imageresponse = null;
      if (selectupload) {
        const imageData = new FormData();
        imageData.append("file", selectupload);
        imageData.append("upload_preset", "gconnect");
        imageData.append("cloud_name", "shivam08");
        imageresponse = await axios.post(
          "https://api.cloudinary.com/v1_1/shivam08/image/upload",
          imageData
        );
      }
      const postResponse = await createPostApi({
        userid: userdata._id,
        body: postText,
        image: imageresponse?.data?.url,
      });
      dispatch(addNewPost(postResponse.data));
      setPostText("");
      setSelect(null);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <Box border="1px solid #e9e9e9">
      <Flex>
        <Box margin="0.5rem">
          <Avatar
            w="3rem"
            borderRadius="50%"
            name={userdata.name}
            src={userImg}
          />
        </Box>
        <Box w="100%" mt="0.5rem" mr="0.5rem">
          <Box w="100%" borderBottom="1px solid #e9e9e9">
            <TextareaAutosize
              value={postText}
              className="text-area"
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's in your mind ?"
            />
            {selectupload ? (
              <Box pos="relative" mb="0.3rem" w="100%" alignContent="center">
                <Box
                  pos="absolute"
                  top="0rem"
                  p="0.2rem"
                  cursor="pointer"
                  onClick={() => setSelect(null)}
                  right="0px"
                >
                  <FaTimes />
                </Box>
                <Box textAlign="center" p="0.2rem" bg="#d7d7d7">
                  {selectupload.name}
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Box>
          <Box p="0.5rem">
            <Flex width="100%" justifyContent="space-between">
              <Box mt="0.5rem" mb="0.5rem" width="30%">
                <Box d="flex" justifyContent="space-between">
                  <span className="ps-icon">
                    <label
                      htmlFor="icon-button-file"
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        data-max-size="2048"
                        onChange={(e) => setSelect(e.target.files[0])}
                      />
                      <IoImageOutline size="1.2rem" />
                    </label>
                  </span>
                  <span className="ps-icon">
                    <label
                      htmlFor="icon-button-file"
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        id="icon-button-file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelect(e.target.files[0])}
                      />
                      <AiOutlineGif size="1.2rem" />
                    </label>
                  </span>
                  <span className="ps-icon">
                    <label
                      htmlFor="icon-button-file"
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        id="icon-button-file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelect(e.target.files[0])}
                      />
                      <BsCameraVideo size="1.2rem" />
                    </label>
                  </span>
                </Box>
              </Box>
              <Box>
                <Button
                  isDisabled={
                    postText.length === 0 && !selectupload ? true : false
                  }
                  borderRadius="2rem"
                  colorScheme="#1da1f2"
                  bg="var(--BRAND_BLUE)"
                  className="pst-btn"
                  variant="solid"
                  onClick={() => uploadImg()}
                >
                  Post
                </Button>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

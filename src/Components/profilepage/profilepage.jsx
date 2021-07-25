import "./profile.css";
import { Post } from "../index";
import { updateUsers,userLogout } from "../login/user.slice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaPowerOff } from "react-icons/fa";
import { addFollowing } from "../login/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import {
  Box,
  Flex,
  Avatar,
  Spinner,
  Button,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import { getUserApi, userFollow, userUnfollow } from "../../apis/apis";
import axios from "axios";

function EditProfile({ setOpenEdit, setUserData }) {
  const [status, setStatus] = useState({ state: "idle" });
  const [about, setAbout] = useState(null);
  const [selectupload, setSelect] = useState(null);
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.user.userData);
  async function updateUser() {
    try {
      setStatus({ state: "loading" });
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
      const res = await axios.post(
        "https://gConnect-backend.shivam008.repl.co/user/update",
        { userid: userdata._id, image: imageresponse?.data?.url, about }
      );
      setStatus({ state: "fulfilled" });
      dispatch(updateUsers(res.data.data));
      setUserData((state)=>({...state,image:res.data.data.image,about:res.data.data.about}));
    } catch (error) {
      setStatus({ state: "error" });
      console.log(error.message);
    }
  }
  return (
    <Box
      pos="absolute"
      borderRadius="0.5rem"
      left="25%"
      w="70%"
      h="50vh"
      bg="white"
      border="1px solid black"
      zIndex="2"
      opacity="100%"
    >
      <Flex justifyContent="space-between">
        <Box
          w="90%"
          padding="0.5rem"
          fontSize="1.2rem"
          fontWeight="bold"
          textAlign="center"
        >
          Edit
        </Box>
        <Button
          borderRadius="50%"
          colorScheme="blue"
          p="0"
          variant="outline"
          onClick={() => setOpenEdit(false)}
        >
          <FaTimes />
        </Button>
      </Flex>
      <Box>
        <Flex
          direction="column"
          justifyItems="center"
          justifyContent="space-around"
        >
          <Box ml="1rem" mb="1rem" mt="1rem">
            <label htmlFor="icon-button-file" style={{ cursor: "pointer" }}>
              <input
                id="icon-button-file"
                type="file"
                accept="image/*"
                onChange={(e) => setSelect(e.target.files[0])}
              />
            </label>
          </Box>
          <Textarea
            mb="1rem"
            mt="1rem"
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Here is a sample placeholder"
            resize="none"
          />
          <Button
            mt="2rem"
            isDisabled={about && selectupload ? false : true}
            borderRadius="2rem"
            colorScheme="#1da1f2"
            bg="var(--BRAND_BLUE)"
            isLoading={status.state === "loading"?true:false}
            className="pst-btn"
            variant="solid"
            onClick={() => updateUser()}
          >
            Update
          </Button>
          {status.state === "fulfilled" ? (
            <Box textAlign="center" fontWeight="bold" color="green">
              updated Successfully
            </Box>
          ) : (
            ""
          )}
          {status.state === "error" ? (
            <Box textAlign="center" fontWeight="bold" color="red">
              Something went wrong please try again
            </Box>
          ) : (
            ""
          )}
        </Flex>
      </Box>
    </Box>
  );
}
export function ProfilePage() {
  let { username } = useParams();
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const userprofileData = useSelector((state) => state.user);
  const [mobileWidth] = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    (async () => {
      if (username !== userprofileData.userData.username) {
        const res = await getUserApi({
          userid: userprofileData.userData._id,
          username,
        });
        if (res.status === 200) {
          setUserData(res.data.userdata);
        }
      } else {
        setUserData(userprofileData.userData);
      }
    })();
  }, [ username ]);
  useEffect(() => {
    if (
      userprofileData.userData.following.some(
        (item) => item._id === userData?._id
      )
    ) {
      setIsFollowing(true);
    }
  }, [userData]);

  const follow = async (data) => {
    const res = await userFollow(data);
    if (res.status === 200) {
      dispatch(addFollowing(res.data.followeruser.following));
      setUserData((state) => {
        return { ...state, followers: res.data.followinguser.followers };
      });
    }
    setIsFollowing((follow) => true);
  };

  const unFollow = async (data) => {
    const res = await userUnfollow(data);
    if (res.status === 200) {
      dispatch(addFollowing(res.data.followeruser.following));
      setUserData((state) => {
        return { ...state, followers: res.data.followinguser.followers };
      });
    }
    setIsFollowing((follow) => false);
  };

  return (
    <section>
      {userData ? (
        <div className="pf-cls">
          <Box
            position="relative"
            padding="0.5rem"
            border=" 1px solid #e9e9e9"
            display="flex"
            width="100%"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="10%"
              mr="0.8rem"
            >
              <Box
                cursor="pointer"
                color="var(--BRAND_BLUE)"
                _hover={{ background: "var(--LIGHT_BLUE)", color: "white" }}
                p="0.2rem"
                borderRadius="50%"
              >
                <HiArrowNarrowLeft fontSize="1.4rem" />
              </Box>
            </Box>
            <span className="con-title"> {userData.name.toUpperCase()}</span>
          </Box>
          <Box className="br-cr">
            <Box
              mt="1rem"
              width="100%"
              display="flex"
              alignSelf="center"
              justifyContent="center"
            >
              <Avatar size="2xl" name={userData.name} src={userData.image} />
            </Box>
            <Box p="0 0.5rem">
              <Flex justifyContent="space-between" ml="1rem" mb="1rem">
                <Box
                  fontWeight="bold"
                  display="flex"
                  flexDir="column"
                  fontSize="1.1rem"
                >
                  {userData.name}
                  <span className="pf-usr">{userData.username}</span>
                </Box>
                <Box mr="1rem">
                  {openEdit ? (
                    <EditProfile
                      setUserData={setUserData}
                      setOpenEdit={setOpenEdit}
                    />
                  ) : (
                    ""
                  )}
                  {username === userprofileData.userData.username ? (
                    <Box display="flex" alignItems="center">
                      <Button
                        borderRadius="2rem"
                        variant="outline"
                        colorScheme="blue"
                        onClick={() => setOpenEdit(true)}
                      >
                        Edit Profile
                      </Button>
                      <Box
                        ml="0.5rem"
                        color="red"
                        borderRadius="1.3rem"
                        display={mobileWidth ? "block" : "none"}
                        cursor="pointer"
                        p="0.4rem"
                        onClick={() => dispatch(userLogout())}
                        _hover={{ bg: "#fd4383", color: "black" }}
                      >
                        <FaPowerOff fontSize="1.4rem" />
                      </Box>
                    </Box>
                  ) : (
                    <Button
                      borderRadius="2rem"
                      bg={isFollowing ? "" : "var(--BRAND_BLUE)"}
                      className="pst-btn"
                      colorScheme="blue"
                      variant={isFollowing ? "outline" : "solid"}
                      onClick={() => {
                        isFollowing
                          ? unFollow({
                              followerId: userprofileData.userData._id,
                              followingId: userData._id,
                            })
                          : follow({
                              followerId: userprofileData.userData._id,
                              followingId: userData._id,
                            });
                      }}
                    >
                      {isFollowing ? "following" : "follow"}
                    </Button>
                  )}
                </Box>
              </Flex>
              <Box ml="1rem">{userData.about}</Box>
              <Flex justifyContent="space-between" p=" 1rem">
                <Box className="flw-bx">
                  <span className="bld">{userData?.posts?.length ?? 0}</span>{" "}
                  Posts
                </Box>
                <Box className="flw-bx">
                  {" "}
                  <span className="bld">
                    {userData?.following?.length ?? 0}
                  </span>{" "}
                  Following
                </Box>
                <Box className="flw-bx">
                  <span className="bld">
                    {userData?.followers?.length ?? 0}
                  </span>{" "}
                  Followers
                </Box>
              </Flex>
            </Box>
          </Box>
          <div>
            {userData && userData.posts && userData.posts.length !== 0 ? (
              userData.posts.map((item) => (
                <Post
                  key={item.postedBy.image}
                  postbody={item.body}
                  id={item._id}
                  likes={item.likes}
                  postimg={item.image}
                  userName={item.postedBy.name}
                  comments={item.comments}
                  userimage={userData.image}
                />
              ))
            ) : (
              <Box p="1rem" fontSize="1.2rem" textAlign="center">
                no posts yet
              </Box>
            )}
          </div>
        </div>
      ) : (
        <Box p="1rem" textAlign="center">
          <Spinner color="blue.400" size="lg" />
        </Box>
      )}
    </section>
  );
}

import "./profile.css";
import { Post } from "../index";
import { Box, Flex, Avatar, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserThunk } from "./userprofile.slice";
import { useParams } from "react-router-dom";
export function ProfilePage() {
  let { username } = useParams();
  let dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [showbtn, setbtn] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  console.log(username);
  if (true) {
  }
  const userprofileData = useSelector((state) => state.user);
  const profileData = useSelector((state) => state.profile);
  useEffect(() => {
    if (username !== userprofileData.userData.username) {
      console.log("yes its right");
        dispatch(
          getUserThunk({ userid: userprofileData.userData._id, username })
        );
      console.log(profileData.profileData);
      setUserData(profileData.profileData);
    }
    else{
      setUserData(userprofileData.userData);
      // console.log(userprofileData);
      // debugger;
    }
  }, []);

  // console.log(userData.username);
  return (
    <section>
      {userData ? (
        <div>
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
                  {username === "shivam" ? (
                    <Button
                      borderRadius="2rem"
                      variant="outline"
                      colorScheme="blue"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      borderRadius="2rem"
                      bg={isFollowing ? "" : "var(--BRAND_BLUE)"}
                      className="pst-btn"
                      colorScheme="blue"
                      variant={isFollowing ? "outline" : "solid"}
                      onClick={() => setIsFollowing((follow) => !follow)}
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
            {userData && userData.posts
              ? userData.posts.map((item) => (
                  <Post
                    postbody={item.body}
                    id={item._id}
                    likes={item.likes}
                    postimg={item.image}
                    userName={item.postedBy.name}
                    comments={item.comments}
                    userimage={item.postedBy.image}
                  />
                ))
              : ""}
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}

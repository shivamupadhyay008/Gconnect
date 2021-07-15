import "./profile.css";
import { Post } from "../index";
import { Box, Flex, Avatar, Spinner, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFollowing } from "../login/user.slice";
import { getUserApi, userFollow, userUnfollow } from "../../apis/apis";
import { useParams } from "react-router-dom";
export function ProfilePage() {
  let { username } = useParams();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const userprofileData = useSelector((state) => state.user);
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
  }, [username]);
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
                  {username === userprofileData.userData.username ? (
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
                  userimage={item.postedBy.image}
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

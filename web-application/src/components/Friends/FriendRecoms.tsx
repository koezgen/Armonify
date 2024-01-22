import React, { useEffect, useState } from 'react';
import {Table, Tbody, Tr, TableContainer, Th, Td, Button, Skeleton, SkeletonCircle, Thead} from '@chakra-ui/react';
import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";

interface RecomsArray {
    username: string;
    follower_count: string;
    followed_count: string;
    profile_picture?: string;
}

interface UserOccurence {
    username: string;
    occurence: number;
}

interface UserFollowData {
    followers: string[];
    following: string[];
}

const FriendRecoms: React.FC = () => {
    const [RecomUsers, setRecomUsers] = useState<RecomsArray[]>([]);
    const auth = useAuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("RecomUsers:", RecomUsers);
    }, [RecomUsers]);

    const navigateUser = (user: string) => {
        let og_user = auth()?.username?.toLowerCase();
        let input_user = user.toLowerCase();

        if (og_user === input_user) {
            navigate(`/${og_user}`);
        } else {
            navigate(`/user/${user}`);
        }
    };

    const RecomDisplayUser: React.FC<{ user?: RecomsArray }> = ({ user }) => (
        <Tr>
            <Td>
                {user ? (
                    <Avatar img={user.profile_picture} size="lg" />
                ) : (
                    <SkeletonCircle size="10" />
                )}
            </Td>
            <Td>
                {user ? (
                    <Button onClick={() => navigateUser(user.username)}>
                        {user.username}
                    </Button>
                ) : (
                    <Skeleton height="20px" width="75%" />
                )}
            </Td>
            <Td>
                {user ? user.follower_count : <Skeleton height="20px" width="50%" />}
            </Td>
            <Td>
                {user ? user.followed_count : <Skeleton height="20px" width="50%" />}
            </Td>
        </Tr>
    );

    useEffect(() => {
        const fetchAndProcessData = async () => {
            const apiUrl = `http://51.20.128.164/api/recommendations/${auth()?.username}`;
            const selected = ["genre"];
            const selection = "all";

            if (sessionStorage.getItem("recomUsers")) {
                setRecomUsers(JSON.parse(sessionStorage.getItem("recomUsers") || "[]"));
                return;
            }

            try {
                const response = await axios.post(apiUrl, { criteria_list: selected, target_audience: selection });
                const authUsername = auth()?.username?.toLowerCase();
                const filteredSongs = response.data.filter(song => song.username.toLowerCase() !== authUsername);

                // Count occurrences
                const occurrenceMap: { [key: string]: UserOccurence } = {};
                filteredSongs.forEach(song => {
                    const lowerCaseUsername = song.username.toLowerCase();
                    if (!occurrenceMap[lowerCaseUsername]) {
                        occurrenceMap[lowerCaseUsername] = { username: song.username, occurence: 0 };
                    }
                    occurrenceMap[lowerCaseUsername].occurence += 1;
                });

                // Sort and take top 4
                const sortedUsers: UserOccurence[] = Object.values(occurrenceMap).sort((a, b) => b.occurence - a.occurence).slice(0, 4);

                // Fetch additional details
                const userDetails: RecomsArray[] = await Promise.all(sortedUsers.map(async user => {
                    const profilePicture = await fetchProfilePicture(user.username);
                    const userFollowData = await fetchUserFollowData(user.username);

                    return {
                        username: user.username,
                        follower_count: userFollowData.followers.length.toString(),
                        followed_count: userFollowData.following.length.toString(),
                        profile_picture: profilePicture
                    };
                }));

                setRecomUsers(userDetails);
                sessionStorage.setItem("recomUsers", JSON.stringify(userDetails));
            } catch (error) {
                console.error("Error in fetchAndProcessData:", error);
            }
        };

        fetchAndProcessData();
    }, [auth]);

    const fetchProfilePicture = async (username: string): Promise<string | undefined> => {
        const apiUrl = "http://51.20.128.164/api/profile_picture";
        try {
            const response = await axios.post(apiUrl, { username: username }, { responseType: 'blob' });
            return URL.createObjectURL(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return undefined;
            }
            console.error('Error fetching profile picture:', error);
            return undefined;
        }
    };

    const fetchUserFollowData = async (username: string): Promise<UserFollowData> => {
        const apiUrl = "http://51.20.128.164/api/user_followings";
        try {
            const response = await axios.post(apiUrl, { username: username });
            return {
                followers: response.data[`Followers of ${username}`] || [],
                following: response.data[`${username} follows`] || []
            };
        } catch (error) {
            console.error('Error fetching user follow data:', error);
            return { followers: [], following: [] };
        }
    };

    return (
        <div className="relative w-full flex flex-col items-center top-20 pb-8">
            <h1 className="text-4xl font-lalezar text-white">Friend Recommendations</h1>
            <div className="rounded-xl bg-white">
                <TableContainer>
                    <Table variant="simple" colorScheme='purple' size="lg">
                        <Thead>
                            <Tr>
                                <Th>Profile Picture</Th>
                                <Th>User Name</Th>
                                <Th>Follower Count</Th>
                                <Th>Following Count</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {RecomUsers.length > 0 ? (
                                RecomUsers.map((user, index) => (
                                    <RecomDisplayUser user={user} key={index} />
                                ))
                            ) : (
                                RecomUsers.map((_, index) => (
                                    <RecomDisplayUser key={index} />
                                ))
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default FriendRecoms;

import React, { useEffect, useState } from "react";
import {Flex, Heading, Select, Tab, TabList, TabPanel, TabPanels, Tabs, VStack} from "@chakra-ui/react";
import Header from "../components/Header";
import MainChart from "../components/Analysis/MainChart";
import MainTable from "../components/Analysis/MainTable";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import TweetButton from "../APIClasses/TweetButton.tsx";
import ExportCSV from "../components/Share/ExportCSV.tsx";
import {FaChartLine, FaFileExport, FaShareAlt, FaTable} from "react-icons/fa";

interface GroupProps {
    groupName: string;
    groupMembers: string[];
    groupID: number;
}

interface RatedArray {
    artist: string;
    album: string;
    song: string;
    song_rating: number;
    rating_timestamp: string;
}

const Analysis = () => {
    const [selected, setSelected] = useState<string>("all-db");
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
    const [groups, setGroups] = useState<GroupProps[]>([]);
    const auth = useAuthUser();
    const baseURL = "http://51.20.128.164/api"; // Replace with your actual base URL
    const [data, setData] = useState<RatedArray[]>([]);
    const [userSongs, setUserSongs] = useState<RatedArray[]>([]);
    const [friendsSongs, setFriendsSongs] = useState<RatedArray[]>([]);
    const [allSongs, setAllSongs] = useState<RatedArray[]>([]);
    const [friendGroupsSongs, setFriendGroupsSongs] = useState<RatedArray[]>([]);

    const [selectedChart, setSelectedChart] = useState('');
    const [selectedSubOption, setSelectedSubOption] = useState('');
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('');

    const handleChartChange = (e) => {
        setSelectedChart(e.target.value);
        setSelectedSubOption('');
        setSelectedTimeFrame('');
    };

    const handleSubOptionChange = (e) => {
        setSelectedSubOption(e.target.value);
        setSelectedTimeFrame('');
    };

    const handleTimeFrameChange = (e) => {
        setSelectedTimeFrame(e.target.value);
    };

    const handleGroupChange = (e) => {
        setSelectedGroup(Number(e.target.value));
    };

    useEffect(() => {
        if (selected === "friend_groups") {
            const apiUrl = `${baseURL}/display_user_group/${auth()?.username}`;
            axios.get(apiUrl).then(response => {
                const fetchedGroups = response.data.map((group: any) => ({
                    groupName: group.group_name,
                    groupMembers: group.group_members,
                    groupID: group.group_id
                }));
                setGroups(fetchedGroups);
            }).catch(error => console.log(error));
        }
    }, [selected, auth]);

    useEffect(() => {
        const fetchSongs = async (url: string, setter: React.Dispatch<React.SetStateAction<RatedArray[]>>) => {
            try {
                const response = await axios.get(url);
                setter(response.data.ratings_data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        if (selected === "all-db") {
            fetchSongs(`${baseURL}/all_song_ratings`, setAllSongs);
        } else if (selected === "friends") {
            fetchSongs(`${baseURL}/follower_song_ratings/${auth()?.username}`, setFriendsSongs);
        } else if (selected === "user") {
            fetchSongs(`${baseURL}/user_song_ratings/${auth()?.username}`, setUserSongs);
        } else if (selected === "friend_groups" && selectedGroup) {
            fetchSongs(`${baseURL}/group_song_ratings/${auth()?.username}/${selectedGroup}`, setFriendGroupsSongs);
        }

    }, [selected, selectedGroup, auth]);

    useEffect(() => {
        switch (selected) {
            case "all-db":
                setData(allSongs);
                break;
            case "friends":
                setData(friendsSongs);
                break;
            case "user":
                setData(userSongs);
                break;
            case "friend_groups":
                setData(friendGroupsSongs);
                break;
            default:
                break;
        }
    }, [allSongs, friendsSongs, userSongs, friendGroupsSongs, selected]);

    return (
        <body className="bg-[#081730] overflow-y-auto text-white">
        <Header/>
        <div className="py-5"></div>
        <div className="relative flex flex-col items-center bg-[#F3F0F7] rounded-xl mx-20 p-8 overflow-x-auto">
            <Flex justifyContent="space-between" className="relative flex flex-col items-center" w="full">
            <Tabs variant='soft-rounded' colorScheme='blue' isFitted>
                <TabList mb="1em">
                    <Tab><FaTable size={20}/> <div className="px-1"></div>Data Table</Tab>
                    <Tab><FaChartLine size={20}/> <div className="px-1"></div>
                        Chart</Tab>
                    <Tab><FaShareAlt size={20}/> <div className="px-1"></div>
                        Share Analysis</Tab>
                    <Tab><FaFileExport size={20}/> <div className="px-1"></div>
                        Export Data</Tab>
                </TabList>
                <TabPanels>
                <TabPanel>
                        <MainTable ratedArray={data}/>
                    </TabPanel>
                    <TabPanel>
                        <MainChart/>
                    </TabPanel>
                    <TabPanel>
                        <VStack>
                            <h1 className="text-5xl font-lalezar text-[#35517e]">Share Your Analysis</h1>
                            <div className="flex justify-center items-center">
                                {/* Left Column */}
                                <div className="flex flex-col items-center justify-center pl-5">
                                    <h2 className="text-2xl text-white font-lalezar text-[#35517e]">Share your Top 5 Albums</h2>
                                    <TweetButton shareType="albums"/>
                                </div>
                                {/* Middle Column */}
                                <div className="flex flex-col items-center justify-center h-full pl-5">
                                    <h2 className="text-2xl text-white font-lalezar text-[#35517e]">Share your Top 5 Performers</h2>
                                    <TweetButton shareType="performers"/>
                                </div>
                                {/* Right Column */}
                                <div className="flex flex-col items-center justify-center h-full pl-5">
                                    <h2 className="text-2xl text-white font-lalezar text-[#35517e]">Share your Top 5 Songs</h2>
                                    <TweetButton shareType="songs"/>
                                </div>
                            </div>
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <VStack>
                            <h1 className="text-2xl font-lalezar text-[#35517e]">Export your Rating Data</h1>
                            <ExportCSV/>
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            </Flex>
        </div>
        <div className="py-5"></div>
        </body>
    );

};

export default Analysis;

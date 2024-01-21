import {Flex, Tab, TabList, TabPanel, TabPanels, Tabs, VStack} from "@chakra-ui/react";
import Header from "../components/Header";
import MainChart from "../components/Analysis/MainChart";
import MainTable from "../components/Analysis/MainTable";
import ExportCSV from "../components/Share/ExportCSV.tsx";
import {FaChartLine, FaFileExport, FaShareAlt, FaTable} from "react-icons/fa";
import TweetButton from "../APIClasses/TweetButton.tsx";

const Analysis = () => {
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
                        <MainTable />
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
                                    <h2 className="text-2xl font-lalezar text-[#35517e]">Share your Top 5 Albums</h2>
                                    <TweetButton shareType="albums"/>
                                </div>
                                {/* Middle Column */}
                                <div className="flex flex-col items-center justify-center h-full pl-5">
                                    <h2 className="text-2xl font-lalezar text-[#35517e]">Share your Top 5 Performers</h2>
                                    <TweetButton shareType="performers"/>
                                </div>
                                {/* Right Column */}
                                <div className="flex flex-col items-center justify-center h-full pl-5">
                                    <h2 className="text-2xl font-lalezar text-[#35517e]">Share your Top 5 Songs</h2>
                                    <TweetButton shareType="songs"/>
                                </div>
                            </div>
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <VStack>
                            <h1 className="text-2xl font-lalezar text-[#35517e]">Export your Rating Data</h1>
                            <ExportCSV />
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

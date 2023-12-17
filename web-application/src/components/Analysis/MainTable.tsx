import React, { useState } from 'react';
import {
    Table,
    TableContainer,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Box,
    Flex,
    Select,
    VStack
} from '@chakra-ui/react';

interface RatedArray {
    artist: string;
    album: string;
    song: string;
    song_rating: number;
    rating_timestamp: string;
}

interface RatedTableProps {
    ratedArray: RatedArray[];
}

const MainTable: React.FC<RatedTableProps> = ({ ratedArray = [] }) => {
    const [mainSelection, setMainSelection] = useState('');
    const [decade, setDecade] = useState('');
    const [rateType, setRateType] = useState('');
    const [time, setTime] = useState('');

    const getTableCaption = () => {
        if (mainSelection === 'era') {
            return `Best Songs of the ${decade}`;
        } else if (mainSelection === 'rating') {
            let type = '';
            switch (rateType) {
                case 'artist': type = 'Artist'; break;
                case 'track': type = 'Song'; break;
                case 'album': type = 'Album'; break;
                default: type = ''; break;
            }
            let timeSpan = '';
            switch (time) {
                case '1m': timeSpan = 'Last 1 Month'; break;
                case '6m': timeSpan = 'Last 6 Months'; break;
                case '1y': timeSpan = 'Last 1 Year'; break;
                default: timeSpan = ''; break;
            }
            return `Best Avg. ${type} Ratings - ${timeSpan}`;
        }
        return 'Song Ratings and Details';
    };

    const getRatingColumnHeader = () => {
        switch (rateType) {
            case 'artist': return 'Performer Rating Average';
            case 'album': return 'Album Rating Average';
            case 'track': return 'Song Rating Average';
            default: return 'Song Rating Average';
        }
    };

    const handleMainSelectionChange = (e) => {
        setMainSelection(e.target.value);
        setDecade(''); // Reset decade when main selection changes
    };

    const handleDecadeChange = (e) => {
        setDecade(e.target.value);
    };

    const handleTypeChange = (e) => {
        setRateType(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    return (
        <div className="relative flex flex-col items-center">
            <VStack>
                <div className="py-5"></div>
                <h1 className="text-5xl font-lalezar">Your Data In Tables</h1>
                <h1 className="text-2xl font-lalezar">Please select the data that you want to analyze.</h1>
                <Flex direction="row" align="center" justify="center">
                    <Select onChange={handleMainSelectionChange} placeholder="Select Option" mr={2}>
                        <option value="era">Best Songs By Era</option>
                        <option value="rating">Best Avg. Ratings</option>
                        {/* Add other main options here */}
                    </Select>

                    {mainSelection === 'era' && (
                        <Select onChange={handleDecadeChange} placeholder="Select Decade">
                            <option value="60s">60s</option>
                            <option value="70s">70s</option>
                            <option value="80s">80s</option>
                            <option value="90s">90s</option>
                            <option value="2000s">2000s</option>
                            <option value="2010s">2010s</option>
                        </Select>
                    )}

                    {mainSelection === 'rating' && (
                        <Select onChange={handleTypeChange} placeholder="Select Option">
                            <option value="artist">Artist Ratings</option>
                            <option value="track">Song Ratings</option>
                            <option value="album">Album Ratings</option>
                        </Select>
                    )}

                    {mainSelection === 'rating' &&  (
                        <Select onChange={handleTimeChange} placeholder="Select Span">
                            <option value="1m">1 Month</option>
                            <option value="6m">6 Months</option>
                            <option value="1y">1 Year</option>
                        </Select>
                    )}
                </Flex>
                <div className="py-5"></div>
            </VStack>
            <Box bg='white' w='60%' p={4} color='black' rounded="xl">
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>{getTableCaption()}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Artist</Th>
                                <Th>Album</Th>
                                <Th>Song</Th>
                                <Th isNumeric>{getRatingColumnHeader()}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {ratedArray.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.artist}</Td>
                                    <Td>{item.album}</Td>
                                    <Td>{item.song}</Td>
                                    <Td isNumeric>{item.song_rating}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <div className="py-5"></div>
        </div>
    );
};

export default MainTable;

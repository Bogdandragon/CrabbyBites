import {IconButton,Box,Flex} from '@chakra-ui/react'
import { SimpleGrid } from "@chakra-ui/react"
import { Text } from '@chakra-ui/react'
import {Stack} from '@chakra-ui/react';
import UserCard from "./UserCard";

import Page from "../Page/Page";
import AdminPage from '../AdminPage/AdminPage';
import SortButton from "../Buttons/SortButton"
import "./UserAdminPage.css"

function UserAdminPage({noResults}) {

    return (
        <AdminPage>
            <Box width="95%" ml="2vh">
        <SimpleGrid columns={2} spacing={1}>
          <Text pt="1vh" textAlign="left">RESULTS: {noResults}</Text>
          <Text textAlign="right" mr="3vw">SORT BY: <SortButton /></Text>
        </SimpleGrid>
        
        <Box overflowY="auto" overflowX="auto" maxHeight="80vh" className="scrollable-box">
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
           
            <UserCard imageUrl="crab.png" username="crab123" reports={7} />
            <UserCard imageUrl="crab.png" username="crab123" reports={7} />
            <UserCard imageUrl="crab.png" username="crab123" reports={7} />
            <UserCard imageUrl="crab.png" username="crab123" reports={7} />
            <UserCard imageUrl="crab.png" username="crab123" reports={7} />
            <UserCard imageUrl="crab.png" username="crab123" reports={7} />
            <UserCard imageUrl="crab.png" username="crab123" reports={7} />
            <UserCard imageUrl="crab.png" username="crab123" reports={7} />

          </SimpleGrid>
        </Box>
      </Box>
        </AdminPage>

    );

}

export default UserAdminPage;
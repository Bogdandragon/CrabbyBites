import {IconButton,Box,Flex} from '@chakra-ui/react'
import { SimpleGrid } from "@chakra-ui/react"
import { Text } from '@chakra-ui/react'
import UserCard from "./UserCard";

import Page from "../Page/Page";
import AdminPage from '../AdminPage/AdminPage';
import SortButton from "../Buttons/SortButton"
import "./UserAdminPage.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';

function UserAdminPage() {
    const [users, setUsers] = useState([]);
	const [reports, setReports] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        axios.get('http://localhost:5000/api/auth/reports', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response) => {
            setUsers(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    function viewReports(id) {
        axios.get(`http://localhost:5000/api/auth/reports/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response) => {
            setReports(response.data);
			console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
		onOpen();
    }

    return (
            <Box width="95%" ml="2vh">
        <SimpleGrid columns={2} spacing={1}>
          <Text pt="1vh" textAlign="left">RESULTS: {users.length}</Text>
          <Text textAlign="right" mr="3vw">SORT BY: <SortButton /></Text>
        </SimpleGrid>
        
        <Box overflowY="auto" overflowX="auto" maxHeight="80vh" className="scrollable-box">
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
            {users.map((user) => (
              <UserCard imageUrl="crab.png" username={user.username} reports={user.reportNo} key={user.username} viewReports={() => viewReports(user._id)} deleteUser={() => {}}/>
            ))}
          </SimpleGrid>
        </Box>
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Reports</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<SimpleGrid columns={1} spacing={1}>
						{reports.map((report, index) => (
							<Text key={report._id}>{index}: {report.reason}</Text>
						))}
					</SimpleGrid>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
      </Box>
    );

}

export default UserAdminPage;
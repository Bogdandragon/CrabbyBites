import "./UserAdminPage.css";
import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, FormControl, FormLabel, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import UserCard from "./UserCard";
import SortButton from "../Buttons/SortButton";


function UserAdminPage() {
    const [users, setUsers] = useState([]);
	const [reports, setReports] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
    
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [deleteReason, setDeleteReason] = useState('');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const toast = useToast();

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
        }).catch((error) => {
            console.log(error);
        });
		onOpen();
    }

    const deleteUser = (userId) => {
        setDeleteUserId(userId);
        setDeleteModalOpen(true);
    }

    const confirmDeleteUser = () => {
        // call your API to delete the user with deleteUserId
        // then close the modal and clear deleteUserId
        if (deleteReason.length < 20) {
            toast({
                title: "Error",
                description: "The delete reason must be at least 20 characters long.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        // refresh the page
        axios.delete(`http://localhost:5000/api/auth/remove/${deleteUserId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response) => {
            console.log(response);
            window.location.reload();

            toast({
                title: "User deleted",
                description: "The user has been successfully deleted.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        }).catch((error) => {
            console.log(error);
        });

        setDeleteUserId(null);
        setDeleteReason('');
        setDeleteModalOpen(false);
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
                        <UserCard imageUrl="crab.png" username={user.username} reports={user.reportNo} key={user.username} viewReports={() => viewReports(user._id)} deleteUser={() => deleteUser(user._id)}/>
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
                            {reports.map((report, index) => (<Text key={report._id}>{index + 1}: {report.reason}</Text>))}
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter><Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button></ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl id="delete-reason">
                        <FormLabel>Reason for deleting this user</FormLabel>
                        <Textarea value={deleteReason} onChange={(e) => setDeleteReason(e.target.value)} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={confirmDeleteUser}>
                        Delete
                    </Button>
                    <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        </Box>
    );
}

export default UserAdminPage;
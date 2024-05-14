import Page from "../Page/Page";
import Sidebar from '../Sidebar/Sidebar';
import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import RecipeAdminPage from "../RecipeAdminPage/RecipeAdminPage";
import UserAdminPage from "../UserAdminPage/UserAdminPage";
import CommentAdminPage from "../CommentAdminPage/CommentAdminPage";
import { useNavigate, useParams } from 'react-router-dom';

function AdminPage() {
    const { type } = useParams();
    const navigate = useNavigate();
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        if (userType !== "ADMIN") 
            navigate('/');
        if (!type || !["recipes", "users", "comments"].includes(type)) 
            navigate('/');
    }, []);

    function selector(val) {
        navigate('/admin/' + val);
    }

    return (
        <Page>
            <Flex p={{ base: 0, md: 0 }} direction={{ base: 'column', md: 'row' }}>
                <Sidebar selector={selector}/> 
                { type === "recipes" && <RecipeAdminPage /> }
                { type === "users" && <UserAdminPage /> }
                { type === "comments" && <CommentAdminPage /> }
           </Flex>
        </Page>
    );
}

export default AdminPage;
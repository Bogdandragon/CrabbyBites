import "./AdminPage.css"
import Page from "../Page/Page";
import Sidebar from '../Sidebar/Sidebar';
import { Grid } from "@chakra-ui/react"
import React, { ReactNode } from 'react'
import {IconButton,Box,Flex} from '@chakra-ui/react'
import { SimpleGrid } from "@chakra-ui/react"
import { Text } from '@chakra-ui/react'
import RecipeAdminPage from "../RecipeAdminPage/RecipeAdminPage";
import UserAdminPage from "../UserAdminPage/UserAdminPage";
import CommentAdminPage from "../CommentAdminPage/CommentAdminPage";

function AdminPage() {
    const [pageType, setPageType] = React.useState(0);

    return (
        <Page>
            <Flex p={{ base: 0, md: 0 }} direction={{ base: 'column', md: 'row' }}>
                <Sidebar selector={setPageType}/> 
                { pageType === 0 &&
                    <RecipeAdminPage />
                }
                { pageType === 1 &&
                    <UserAdminPage />
                }
                { pageType === 2 &&
                    <CommentAdminPage />
                }
           </Flex>
        </Page>);
}

export default AdminPage;
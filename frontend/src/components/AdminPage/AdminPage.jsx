import "./AdminPage.css"
import Page from "../Page/Page";
import Sidebar from '../Sidebar/Sidebar';
import { Grid } from "@chakra-ui/react"
import React, { ReactNode } from 'react'
import {IconButton,Box,Flex} from '@chakra-ui/react'
import { SimpleGrid } from "@chakra-ui/react"
import { Text } from '@chakra-ui/react'

function AdminPage({ children }) {

    return (
        
        <Page>
            <Flex p={{ base: 0, md: 0 }} direction={{ base: 'column', md: 'row' }}>
                <Sidebar /> 
                {children}
           </Flex> 
        </Page>);
}

export default AdminPage;
import { Container } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";

function Page({ children }) {
    return (
        <Container minH="100vh" minW="100vw" p={0} m={0}>
            <Navbar/>
            {children}
        </Container>
    );
}

export default Page;
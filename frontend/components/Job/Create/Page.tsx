import React from 'react'
import {Container} from 'semantic-ui-react'
import NavBar from "../../layout/header/NavBar";
import Editor from "./Editor/Editor";

const Page = () => (
    <Container>
        <NavBar/>
        <Editor/>
    </Container>
);


export default Page;

import React from 'react'
import {Container} from 'semantic-ui-react'
import PreviewTemplate from "./PreviewTemplate";
import NavBar from "../../layout/header/NavBar";
import CreateEditor from "./CreateEditor";

const panes = [
    {
        menuItem: { key: 'editor', icon: 'edit'},
        render: () => <Editor/>,
    },
    {
        menuItem: { key: 'preview', icon: 'eye' },
        render: () => <PreviewTemplate/>,
    },
]

const Page = ( ) => (
    <div>
        <NavBar />
        <Container>
            <CreateEditor/>
        </Container>
    </div>
);


export default Page;

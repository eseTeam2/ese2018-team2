import React from 'react'
import {Container, Tab} from 'semantic-ui-react'
import Editor from "./Editor";
import PreviewTemplate from "./PreviewTemplate";

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

const Page = () => (
    <Container>
        <Tab panes={panes}/>
    </Container>
);

export default Page
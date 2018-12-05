import { Value } from "slate";
import { Container, Segment } from "semantic-ui-react";
import { Editor } from "slate-react";
import { initialValue } from "./initialValue";
import * as React from "react";
import { Simulate } from "react-dom/test-utils";

interface SlateEditorProps {}

interface SlateEditorState {
  value: Value;
}

class SlateEditor extends React.Component<SlateEditorProps, SlateEditorState> {
  constructor(props) {
    super(props);
    this.state = {
      value: initialValue
    };
  }

  onChange = ({ value }) => {
    this.setState({ value: value });
  };

  onKeyDown = (e, change) => {
    if (!e.ctrlKey) {
      return;
    }

    e.preventDefault();

    switch (e.key) {
      case "b": {
        change.toggleMark("bold");
        return true;
      }
      case "i": {
        change.toggleMark("italic");
        return true;
      }
      case "u": {
        change.toggleMark("underlined");
        return true;
      }
      default: {
        return;
      }
    }
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment />
          <Segment>
            <Editor
              value={this.state.value}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              renderMark={this.renderMark}
            />
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

export default SlateEditor;

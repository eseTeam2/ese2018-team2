import { Value } from "slate";
import { Container, Segment, Button, Icon } from "semantic-ui-react";
import { Editor } from "slate-react";
import { initialValue } from "./initialValue";
import * as React from "react";
import { type } from "os";

interface SlateEditorProps {}

interface SlateEditorState {
  value: Value;
  editor?: Editor;
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
      case "<": {
        change.toggleMark("code");
        return true;
      }
      default: {
        return;
      }
    }
  };

  ref = editor => {
    this.setState({ editor: editor });
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

  onClickMark = (e, type) => {
    e.preventDefault();
    this.state.editor.toggleMark(type);
  };

  hasMark = type => {
    const value = this.state.value;
    return value.activeMarks.some(mark => mark.type == type);
  };

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    return (
      <Button
        icon
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon name={icon} />
      </Button>
    );
  };

  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment>
            <Button.Group>
              {this.renderMarkButton("bold", "bold")}
              {this.renderMarkButton("italic", "italic")}
              {this.renderMarkButton("underlined", "underline")}
              {this.renderMarkButton("code", "code")}
            </Button.Group>
          </Segment>
          <Segment>
            <Editor
              ref={this.ref}
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

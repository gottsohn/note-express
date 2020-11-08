import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';
import { RichTextEditor, RichTextToolbar } from 'react-native-zss-rich-text-editor';
import KeyboardSpacer from 'react-native-keyboard-spacer';

interface Props {
  initialHTML?: string
}

export default class RichTextField extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private richtext!: RichTextEditor;
  private initialHTML?: string = '';
  render() {
    return (
      <View style={styles.container}>
        <RichTextEditor
          ref={(r: RichTextEditor) => this.richtext = r}
          // style={styles.richText}
          initialContentHTML={this.props.initialHTML}
          editorInitializedCallback={() => this.onEditorInitialized()}
        />
        <RichTextToolbar
          getEditor={() => this.richtext}
        />
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    );
  }

  private onEditorInitialized() {
    this.setFocusHandlers();
    this.getHTML();
  }

  private getHTML = async () => {
    const titleHtml = await this.richtext.getTitleHtml();
    const contentHtml = await this.richtext.getContentHtml();
  };

  private setFocusHandlers = () => {
    this.richtext.setTitleFocusHandler(() => {
      //alert('title focus');
    });

    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingTop: 40
  },
  richText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

/**
 * Rich Editor Example
 * @author tangzehua
 * @since 2019-06-24 14:52
 */
import React, { Component, createRef } from 'react';
import {
  Appearance,
  Button,
  ColorSchemeName,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { InsertLinkModal } from './InsertLink';
import { EmojiView } from './EmojiView';


const phizIcon = require('../assets/phiz.png');
const htmlIcon = require('../assets/h5.png');
const videoIcon = require('../assets/video.png');
// const strikethrough = require('../assets/strikethrough.png');

interface Props {
  initialHTML?: string;
}

interface ContentStyle {
  backgroundColor: string;
  color: string;
  placeholderColor: string;
  contentCSSText: string;
}

interface State {
  theme: ColorSchemeName;
  contentStyle: ContentStyle;
  emojiVisible: boolean;
  disabled: boolean;
}

export default class RichTextField2 extends Component<Props, State> {
  private richText = createRef<RichEditor>();
  private linkModal = createRef<InsertLinkModal>();

  constructor(props: Props) {
    super(props);
    const theme = Appearance.getColorScheme();
    const contentStyle = this.createContentStyle(theme);
    this.state = { theme, contentStyle, emojiVisible: false, disabled: false };
  }

  public componentDidMount() {
    Appearance.addChangeListener(this.themeChange);
    Keyboard.addListener('keyboardDidShow', this.onKeyBoard);
  }

  public componentWillUnmount() {
    Appearance.removeChangeListener(this.themeChange);
    Keyboard.removeListener('keyboardDidShow', this.onKeyBoard);
  }

  private onKeyBoard = () => {
    TextInput.State.currentlyFocusedInput() && this.setState({ emojiVisible: false });
  };

  private editorInitializedCallback = () => {
    this.richText.current?.registerToolbar(function (items) {
      console.log('Toolbar click, selected items (insert end callback):', items);
    });
  };

  /**
   * theme change to editor color
   * @param colorScheme
   */
  private themeChange = ({ colorScheme }: Appearance.AppearancePreferences) => {
    const theme = colorScheme;
    const contentStyle = this.createContentStyle(theme);
    this.setState({ theme, contentStyle });
  };

  private save = async () => {
    // Get the data here and call the interface to save the data
    let html = await this.richText.current?.getContentHtml();
    // console.log(html);
    alert(html);
  };

  /**
   * editor change data
   * @param {string} html
   */
  private handleChange = () => {
    console.log('editor data:');
  };

  /**
   * editor height change
   * @param {number} height
   */
  private handleHeightChange = () => {
    console.log('editor height change:');
  }

  private insertEmoji = (emoji: string) => {
    this.richText.current?.insertText(emoji);
    this.richText.current?.blurContentEditor();
  }

  private handleEmoji = () => {
    const { emojiVisible } = this.state;
    Keyboard.dismiss();
    this.richText.current?.blurContentEditor();
    this.setState({ emojiVisible: !emojiVisible });
  }

  private insertVideo = () => {
    this.richText.current?.insertVideo(
      'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4',
    );
  }

  private insertHTML = () => {
    this.richText.current?.insertHTML(`<span style="color: blue; padding:0 10px;">HTML</span>`);
  }

  private onPressAddImage = () => {
    // insert URL
    this.richText.current?.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
    );
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
    // this.richText.current?.blurContentEditor();
  }

  private onInsertLink = () => {
    // this.richText.current?.insertLink('Google', 'http://google.com');
    this.linkModal.current?.setModalVisible(true);
  }

  private onLinkDone = ({ title, url }: { title: string, url: string }) => {
    this.richText.current?.insertLink(title, url);
  }

  private onHome = () => {
    //this.props.navigation.push('index');
  }

  private createContentStyle = (theme: ColorSchemeName) => {
    // Can be selected for more situations (cssText or contentCSSText).
    const contentStyle = {
      backgroundColor: '#000033',
      color: '#fff',
      placeholderColor: 'gray',
      // cssText: '#editor {background-color: #f3f3f3}', // initial valid
      contentCSSText: 'font-size: 16px; min-height: 200px; height: 100%;', // initial valid
    };
    if (theme === 'light') {
      contentStyle.backgroundColor = '#fff';
      contentStyle.color = '#000033';
      contentStyle.placeholderColor = '#a9a9a9';
    }
    return contentStyle;
  }

  onTheme() {
    let { theme } = this.state;
    theme = theme === 'light' ? 'dark' : 'light';
    let contentStyle = this.createContentStyle(theme);
    this.setState({ theme, contentStyle });
  }

  onDisabled() {
    this.setState({ disabled: !this.state.disabled });
  }

  render() {
    const { contentStyle, theme, emojiVisible, disabled } = this.state;
    const { initialHTML } = this.props;
    const { backgroundColor, color, placeholderColor } = contentStyle;
    const themeBg = { backgroundColor };
    return (
      <SafeAreaView style={[styles.container, themeBg]}>
        <StatusBar barStyle={theme !== 'dark' ? 'dark-content' : 'light-content'} />
        <InsertLinkModal
          placeholderColor={placeholderColor}
          color={color}
          backgroundColor={backgroundColor}
          onDone={this.onLinkDone}
          ref={this.linkModal}
        />
        <View style={styles.nav}>
          <Button title={'HOME'} onPress={this.onHome} />
          <Button title="Save" onPress={this.save} />
        </View>
        <ScrollView style={[styles.scroll, themeBg]} keyboardDismissMode={'none'}>
          <View>
            <View style={styles.item}>
              <Text style={{ color }}>To: </Text>
              <TextInput
                style={[styles.input, { color }]}
                placeholderTextColor={placeholderColor}
                placeholder={'stulip@126.com'}
              />
            </View>
            <View style={styles.item}>
              <Text style={{ color }}>Subject: </Text>
              <TextInput
                style={[styles.input, { color }]}
                placeholderTextColor={placeholderColor}
                placeholder="Rich Editor Bug 😀"
              />
            </View>
            <View style={styles.item}>
              <Button title={theme!} onPress={this.onTheme} />
              <Button title={disabled ? 'enable' : 'disable'} onPress={this.onDisabled} />
            </View>
          </View>
          <RichEditor
            initialFocus={true}
            disabled={disabled}
            editorStyle={contentStyle} // default light style
            // containerStyle={themeBg}
            ref={this.richText}
            style={[styles.rich, themeBg]}
            placeholder={'please input content'}
            initialContentHTML={initialHTML}
            editorInitializedCallback={this.editorInitializedCallback}
            onChange={this.handleChange}
            onHeightChange={this.handleHeightChange}
          />
        </ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichToolbar
            style={[styles.richBar, themeBg]}
            editor={this.richText}
            disabled={disabled}
            iconTint={color}
            selectedIconTint={'#2095F2'}
            disabledIconTint={'#8b8b8b'}
            onPressAddImage={this.onPressAddImage}
            onInsertLink={this.onInsertLink}
            // iconSize={40} // default 50
            actions={[
              'insertVideo',
              // ...defaultActions,
              // actions.setStrikethrough,
              // actions.heading1,
              // actions.heading4,
              // actions.removeFormat,
              'insertEmoji',
              'insertHTML',
            ]} // default defaultActions
            iconMap={{
              insertEmoji: phizIcon,
              // [actions.removeFormat]: ({ tintColor }) => (
              //   <Text style={[styles.tib, { color: tintColor }]}>C</Text>
              // ),
              // [actions.setStrikethrough]: strikethrough,
              // [actions.heading1]: ({ tintColor }) => (
              //   <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
              // ),
              // [actions.heading4]: ({ tintColor }) => (
              //   <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
              // ),
              insertHTML: htmlIcon,
              insertVideo: videoIcon,
            }}
          // insertEmoji={this.handleEmoji}
          // insertHTML={this.insertHTML}
          // insertVideo={this.insertVideo}
          />
          {emojiVisible && <EmojiView onSelect={this.insertEmoji} />}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
  },

  tib: {
    textAlign: 'center',
    color: '#515156',
  },
});

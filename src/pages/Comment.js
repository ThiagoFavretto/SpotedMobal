import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Modal,
  TextInput,
} from 'react-native';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../services/api';

export default class Comment extends Component {
  state = {post: {}, comment: [], modalVisible: false, newComment: ''};

  async componentDidMount() {
    const params = this.props.navigation.getParam('id');
    const PostResponse = await api.get(`posts/${params}/commetn`);
    const CommentResponse = await api.get(`/comment/${params}`);
    this.setState({post: PostResponse.data, comment: CommentResponse.data});
    console.log(this.state.comment);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleSubmit = async () => {
    const data = new FormData();
    data.append('comment', this.state.newComment);
    data.append('post', this.props.navigation.getParam('id'));

    await api.post('comment', data);

    this.setModalVisible(!this.state.modalVisible);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.postItemHeader}>
          <Image
            style={styles.postImage}
            source={{
              uri: `http://localhost:3333/files/${this.state.post.image}`,
            }}
          />
          <View style={styles.info}>
            <Text style={styles.location}>
              sao miguel{this.state.post.location}
            </Text>
            <Text>{this.state.post.description}</Text>

            <View style={styles.postItemsFooter}>
              <Text style={styles.likes}>{this.state.post.likes} Curtidas</Text>
            </View>
          </View>
        </View>
        <View style={styles.commentHeader}>
          <View style={styles.icon}>
            <Icons name="comment-text-outline" size={40} color="#000" />
          </View>
          <Text style={styles.commentHeaderTitle}>Comentários</Text>
        </View>
        <FlatList
          data={this.state.comment}
          keyExtractor={i => i._id}
          renderItem={({item}) => (
            <View style={styles.commentContainer}>
              <View style={styles.comment}>
                <Text style={styles.commentUser}>user</Text>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>
            </View>
          )}
        />
        <View style={styles.more}>
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Icons name="comment-plus-outline" size={50} color="#7159c1" />
          </TouchableHighlight>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={styles.containerModal}>
              <View style={styles.commentHeaderNew}>
                <View style={styles.icon}>
                  <TouchableHighlight onPress={this.handleSubmit}>
                    <Icons name="comment-plus-outline" size={40} color="#fff" />
                  </TouchableHighlight>
                </View>
                <Text style={styles.commentHeaderTitleNew}>
                  Novo comentário
                </Text>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <View style={styles.iconClose}>
                    <Icons name="close-box-outline" size={40} color="#fff" />
                  </View>
                </TouchableHighlight>
              </View>
              <TextInput
                style={styles.input}
                multiline
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Seu comentário"
                placeholderTextColor="#999"
                value={this.state.newComment}
                onChangeText={newComment => this.setState({newComment})}
              />
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  postItemHeader: {
    marginTop: 15,
    width: '100%',
    height: 200,
    flexDirection: 'row',
  },

  postImage: {
    width: 200,
    height: 200,
    marginLeft: 15,
    borderRadius: 10,
  },

  info: {
    width: 135,
    height: 80,
    marginLeft: 10,
    justifyContent: 'center',
  },

  actions: {
    flexDirection: 'row',
  },

  action: {
    marginRight: 8,
  },

  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  description: {
    marginTop: 10,
    lineHeight: 18,
    color: '#000',
  },

  commentHeader: {
    height: 60,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  commentHeaderTitle: {
    fontSize: 24,
    marginLeft: 40,
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 5,
  },

  commentContainer: {
    width: '100%',
  },

  commentText: {
    fontSize: 18,
    marginLeft: 10,
  },

  commentUser: {
    marginLeft: 5,
  },

  comment: {
    marginTop: 15,
  },

  more: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },

  commentHeaderNew: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8063e0',
  },

  commentHeaderTitleNew: {
    fontSize: 24,
    marginLeft: 40,
    color: '#ffffff',
  },

  iconClose: {
    width: 40,
    height: 40,
    marginLeft: 50,
  },

  containerModal: {
    position: 'absolute',
    width: '100%',
    height: 330,
    bottom: 0,
    backgroundColor: '#fff',
  },

  input: {
    maxHeight: 250,
    borderBottomWidth: 1,
  },
});

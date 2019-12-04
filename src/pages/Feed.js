import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import IconFea from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFon from 'react-native-vector-icons/FontAwesome';

import api from '../services/api';
import io from 'socket.io-client';

export default class Feed extends Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: (
      <TouchableOpacity
        style={{marginRight: 20}}
        onPress={() => navigation.navigate('New')}>
        <IconFea name="camera" size={25} color="#000" />
      </TouchableOpacity>
    ),
  });

  state = {
    feed: [],
  };

  async componentDidMount() {
    this.registerToSocket();
    const Response = await api.get('posts');
    this.setState({feed: Response.data});
  }

  registerToSocket = () => {
    const socket = io('http://localhost:3333');

    socket.on('post', newPost => {
      this.setState({feed: [newPost, ...this.state.feed]});
    });

    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post,
        ),
      });
    });
  };

  handleLike = id => {
    api.post(`posts/${id}/like`);
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.feed}
          keyExtractor={i => i._id}
          renderItem={({item}) => (
            <View style={styles.feedItem}>
              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.location}>{item.location}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>

              <Image
                style={styles.feedImage}
                source={{
                  uri: `http://localhost:3333/files/${item.image}`,
                }}
              />

              <View style={styles.feedItemsFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => {
                      this.handleLike(item._id);
                    }}>
                    <IconAnt name="hearto" size={25} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() =>
                      this.props.navigation.navigate('Comment', {id: item._id})
                    }>
                    <IconFon name="comment-o" size={25} color="#000" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.likes}>{item.likes} Curtidas</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedItem: {
    marginTop: 20,
  },
  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15,
  },

  feedItemsFooter: {
    paddingHorizontal: 15,
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
    lineHeight: 18,
    color: '#000',
  },

  hashtags: {
    color: '#7159c1',
  },
});

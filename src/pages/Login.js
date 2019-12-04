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

import Icons from 'react-native-vector-icons/Entypo';

import api from '../services/api';

export default class Comment extends Component {
  state = {name: '', email: ''};

  handleSubmit = async () => {
    if (this.state.name && this.state.email) {
      const data = new FormData();
      data.append('name', this.state.name);
      data.append('email', this.state.email);

      const id = await api.post('user', data);
      this.props.navigation.navigate('Feed', {id});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Spoted SMO</Text>
        <TouchableHighlight onPress={this.handleSubmit}>
          <Icons name="login" size={50} color="#000" />
        </TouchableHighlight>
        <Text style={styles.titleLogin}>Login</Text>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome"
          placeholderTextColor="#999"
          value={this.state.name}
          onChangeText={name => this.setState({name})}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor="#999"
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <Text>Seu nome não sera exibido</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Pacifico',
    fontSize: 40,
    marginBottom: 100,
  },

  titleLogin: {
    fontSize: 18,
  },

  input: {
    borderWidth: 1,
    width: '80%',
    marginTop: 15,
    borderRadius: 10,
  },
});

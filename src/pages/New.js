import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import api from '../services/api';

export default class New extends Component {
  state = {
    preview: null,
    image: null,
    location: '',
    description: '',
    user: 'nao implementado',
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar imagem',
      },
      upload => {
        if (upload.error) {
          console.log('ocoreu um erro ao lecionar a imagem: ', upload.error);
        } else if (upload.didCancel) {
          console.log('upload canceado');
        } else {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`,
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
          } else {
            prefix = new Date().getTime;
            ext = 'jpg';
          }
          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };

          this.setState({preview, image});
        }
      },
    );
  };

  handleSubmit = async () => {
    const data = new FormData();
    data.append('image', this.state.image);
    data.append('user', this.state.user);
    data.append('location', this.state.location);
    data.append('description', this.state.description);

    await api.post('posts', data);

    this.props.navigation.navigate('Feed');
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={this.handleSubmit}>
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Local da foto"
          placeholderTextColor="#999"
          value={this.state.location}
          onChangeText={location => this.setState({location})}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Descrição"
          placeholderTextColor="#999"
          value={this.state.description}
          onChangeText={description => this.setState({description})}
        />

        <TouchableOpacity
          style={styles.selectButton}
          onPress={this.handleSelectImage}>
          <Text style={styles.selectButtonText}>Selecionar imagen</Text>
        </TouchableOpacity>

        {this.state.preview && (
          <Image style={styles.preview} source={this.state.preview} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    marginTop: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 150,
    height: 150,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});

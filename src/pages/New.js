import React, {useState} from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import api from '../services/api';

export default function New() {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');

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

          setPreview(preview);
          setImage(image);
        }
      },
    );
  };

  handleSubmit = async () => {
    const data = new FormData();
    data.append('image', image);
    data.append('author', author);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);

    await api.post('posts', data);

    props.navigation.navigate('Feed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={handleSelectImage}>
        <Text style={styles.selectButtonText}>Selecionar imagen</Text>
      </TouchableOpacity>

      {preview && <Image style={styles.preview} source={preview} />}

      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Nome do autor"
        placeholderTextColor="#999"
        value={author}
        onChangeText={author => setAuthor(author)}
      />

      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Local da foto"
        placeholderTextColor="#999"
        value={place}
        onChangeText={place => setPlace(place)}
      />

      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Descrição"
        placeholderTextColor="#999"
        value={description}
        onChangeText={description => setDescription(description)}
      />

      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Hashtags"
        placeholderTextColor="#999"
        value={hashtags}
        onChangeText={hashtags => setHashtags(hashtags)}
      />

      <TouchableOpacity style={styles.shareButton} onPress={handleSubmit}>
        <Text style={styles.shareButtonText}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
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
    width: 100,
    height: 100,
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

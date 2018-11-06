import React from 'react';
import {ScrollView, StyleSheet, Text, Button} from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Feed',
    // headerRight: <Button title='ok' />
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>ok</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

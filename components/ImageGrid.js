import React from 'react';
import Grid from 'react-native-grid-component';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

export default class ImageGrid extends React.Component {

  renderItem = (data, i) => (
    <TouchableHighlight key={i} onPress={() => this.props.itemPressed && this.props.itemPressed(i, data)}>
      <View style={{background: 'red'}}>
        <Image source={require('../assets/images/robot-prod.png')} />
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View style={styles.gridContainer}>
        <Grid
          style={styles.list}
          renderItem={this.renderItem}
          // renderPlaceholder={_ => <Text>placeholder</Text>}
          data={['black', 'yellow', 'red', 'green', 'blue',
            'black', 'yellow', 'red', 'green', 'blue',
            'black', 'yellow', 'red', 'green', 'blue',
            'black', 'yellow', 'red', 'green', 'blue',
            'black', 'yellow', 'red', 'green', 'blue',
            'black', 'yellow', 'red', 'green', 'blue',]}
          itemsPerRow={3}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 160,
    margin: 1
  },
  gridContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
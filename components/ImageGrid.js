import React from 'react';
import Grid from 'react-native-grid-component';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import OptionsMenu from 'react-native-options-menu';
import Colors from '../constants/Colors';
import {Icon} from 'expo';

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
      <ScrollView style={styles.gridContainer}>
        {this.props.sortOptions ? (
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10}}>
            <OptionsMenu
              options={this.props.sortOptions}
              customButton={(
                <View style={{flexDirection: 'row'}}>
                  <Icon.Ionicons name='ios-arrow-down' style={{color: Colors.tintColor, paddingTop: 3}} />
                  <Text style={{color: Colors.tintColor}}> Sort</Text>
                </View>
              )}
              actions={[
                this.props.onSort && this.props.onSort.bind(this, 'Popular') || (_ => null),
                this.props.onSort && this.props.onSort.bind(this, 'Trending') || (_ => null),
                this.props.onSort && this.props.onSort.bind(this, 'Newest') || (_ => null),
                _ => null
              ]} />
          </View>
        ) : null}
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
      </ScrollView>
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
import React from 'react';
import Grid from 'react-native-grid-component';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import OptionsMenu from 'react-native-options-menu';
import Colors from '../constants/Colors';
import {Icon} from 'expo';
import ImageStats from '../components/ImageStats';

export default class ImageGrid extends React.Component {

  state = {
    itemPerRow: 3,
  };

  renderItem = (data, i) => (
    <TouchableHighlight key={i} onPress={() => this.props.itemPressed && this.props.itemPressed(i, data)}>
      <View style={{backgroundColor: 'red'}}>
        <Image
          source={require('../assets/images/robot-prod.png')}
          style={{
            width: Dimensions.get('window').width / this.state.itemPerRow,
            height: Dimensions.get('window').width / this.state.itemPerRow,
          }}
        />
        <View style={styles.stats}>
          <ImageStats size={12} color='#fff' />
        </View>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <ScrollView style={styles.gridContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', padding: 10}}>
          {this.props.sortOptions ? (
            <View style={{flexDirection: 'row'}}>
              <OptionsMenu
                options={this.props.sortOptions}
                customButton={(
                  <View style={{flexDirection: 'row'}}>
                    <Icon.Ionicons
                      name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
                      style={{color: Colors.tintColor, paddingTop: 3}}
                    />
                    <Text style={{color: Colors.tintColor}}> Sort by</Text>
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
          <View style={{flexDirection: 'row', paddingLeft: 20}}>
            <OptionsMenu
              options={['1', '2', '3', 'Cancel']}
              customButton={(
                <View style={{flexDirection: 'row'}}>
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
                    style={{color: Colors.tintColor, paddingTop: 3}}
                  />
                  <Text style={{color: Colors.tintColor}}> Items per row</Text>
                </View>
              )}
              actions={[
                () => this.setState({itemPerRow: 1}),
                () => this.setState({itemPerRow: 2}),
                () => this.setState({itemPerRow: 3}),
                _ => null
              ]} />
          </View>
        </View>
        <Grid
          renderItem={this.renderItem}
          data={['black', 'yellow', 'red', 'green', 'blue',
            'black', 'yellow', 'red', 'green', 'blue',
            'black', 'yellow', 'red', 'green', 'blue',
            'black', 'yellow', 'red', 'green', 'blue',
            'black', 'yellow', 'red', 'green', 'blue',
            'black', 'yellow', 'red', 'green', 'blue',]}
          itemsPerRow={this.state.itemPerRow}
        />
      </ScrollView>
    );
  }
}

styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  stats: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#333',
    opacity: 0.5,
    borderTopLeftRadius: 5,
  },
});
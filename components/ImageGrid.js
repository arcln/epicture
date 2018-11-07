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
    itemPerRow: 2,
  };

  renderItem = (data, i) => (
    <TouchableHighlight key={i} onPress={() => this.props.itemPressed && this.props.itemPressed(i, data)}>
      <View>
        <Image
          source={{uri: data.images[0].link}}
          style={{
            width: Dimensions.get('window').width / this.state.itemPerRow,
            height: Dimensions.get('window').width / this.state.itemPerRow,
          }}
        />
        <View style={styles.stats}>
          <View style={{color: 'rgba(0, 0, 0, 1)'}}>
            <ImageStats size={12} color='#fff' data={data} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <ScrollView style={styles.gridContainer}>
        {!this.props.sortOptions && this.props.disableRowSizeSelect ? null : (
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
                      <Text style={{color: Colors.tintColor}}> Popular</Text>
                    </View>
                  )}
                  actions={[
                    this.props.onSort && this.props.onSort.bind(this, 'Popular') || (_ => null),
                    this.props.onSort && this.props.onSort.bind(this, 'Trending') || (_ => null),
                    this.props.onSort && this.props.onSort.bind(this, 'User submitted') || (_ => null),
                    _ => null
                  ]} />
              </View>
            ) : null}
            {this.props.disableRowSizeSelect ? null : (
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
            )}
          </View>
        )}
        <Grid
          renderItem={this.renderItem}
          data={this.props.data.filter(e => e.images)}
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
    backgroundColor: 'rgba(42, 42, 42, 0.5)',
    borderTopLeftRadius: 5,
  },
});
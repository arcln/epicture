import React from 'react';
import Grid from 'react-native-grid-component';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  ScrollView,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import OptionsMenu from 'react-native-options-menu';
import Colors from '../constants/Colors';
import {Icon} from 'expo';
import ImageStats from '../components/ImageStats';
import AsyncImage from '../components/AsyncImage';

export default class ImageGrid extends React.Component {

  state = {
    itemPerRow: this.props.itemsPerRow,
    itemWidth: Dimensions.get('window').width / this.props.itemsPerRow,
    displayedData: [],
    displayedCount: 20,
  };

  updateData = data => {
    const newData = data.filter(e => {
      const ext = e.images && e.images[0].link.substr(e.images[0].link.lastIndexOf('.'));
      return ['.jpg', '.png', '.gif'].includes(ext);
    }).slice(0, this.state.displayedCount);

    if (newData.length < this.state.displayedCount) {
      newData.push(...Array(this.state.displayedCount - newData.length).map((_, idx) => ({key: newData.length + idx})));
    }
    console.log(newData.length, this.state.displayedCount);
    this.setState({displayedData: newData});
  };

  componentWillReceiveProps = (props) => {
    this.updateData(props.data);
  };

  endReached = async () => {
    await this.setState({displayedCount: this.state.displayedCount + 20});
    this.updateData(this.props.data);
    if (this.state.displayedCount >= this.props.data.length) {
      this.props.onEnd && this.props.onEnd();
    }
  };

  renderItem = (data, i) => (
    <TouchableHighlight key={i} onPress={() => this.props.itemPressed && this.props.itemPressed(i, data)}>
      <View>
        <AsyncImage
          source={{uri: data.images[0].link}}
          width={this.state.itemWidth}
          style={{
            width: this.state.itemWidth,
            height: this.state.itemWidth,
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

  header = (
    <View>
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
                  this.props.onSort && this.props.onSort.bind(null, this.props.sortOptions[0]) || (_ => null),
                  this.props.onSort && this.props.onSort.bind(null, this.props.sortOptions[1]) || (_ => null),
                  this.props.onSort && this.props.onSort.bind(null, this.props.sortOptions[2]) || (_ => null),
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
    </View>
  );

  render() {
    return (
      <ScrollView style={styles.gridContainer}>
        {this.header}
        <View style={{height: Dimensions.get('window').height}}>
          <Grid
            renderItem={this.renderItem}
            data={this.state.displayedData}
            itemsPerRow={this.state.itemPerRow}
            onEndReached={this.endReached}
            renderPlaceholder={() => <View style={{backgroundColor: '#ededed'}} key={Math.random()}></View>}
          />
        </View>
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
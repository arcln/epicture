import React from 'react';
import Grid from 'react-native-grid-component';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Dimensions,
} from 'react-native';
import Selector from '../components/Selector';
import Colors from '../constants/Colors';
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
      const ext = e.images && e.images[0] && e.images[0].link.substr(e.images[0].link.lastIndexOf('.'));
      return ['.jpg', '.png', '.gif'].includes(ext);
    }).slice(0, this.state.displayedCount);

    if (newData.length < this.state.displayedCount) {
      newData.push(...Array(this.state.displayedCount - newData.length).map((_, idx) => ({key: newData.length + idx})));
    }

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
    <View key={i} style={styles.item}>
      <TouchableHighlight onPress={() => this.props.itemPressed && this.props.itemPressed(i, data)}>
        <View>
          <AsyncImage
            source={{uri: data.images[0].link}}
            style={{
              width: Dimensions.get('window').width / this.state.itemPerRow - styles.item.margin * 2,
              height: Dimensions.get('window').width / this.state.itemPerRow,
            }}
          />
        </View>
      </TouchableHighlight>
      <View style={styles.stats}>
        <ImageStats size={12} color='#474a51' data={data} />
      </View>
    </View>
  );

  header = (
    <View>
      {!this.props.sortOptions && this.props.disableRowSizeSelect ? null : (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center', padding: 10}}>
          {this.props.sortOptions ? (
            <View style={{flexDirection: 'row'}}>
              <Selector
                options={this.props.sortOptions}
                default='Popular'
                onChange={this.props.onSort}
              />
            </View>
          ) : null}
          {this.props.disableRowSizeSelect ? null : (
            <View style={{flexDirection: 'row', paddingLeft: 20}}>
              <Selector
                options={['1', '2']}
                default='2'
                onChange={value => this.setState({itemPerRow: parseInt(value)})}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );

  render() {
    return (
      <View style={styles.gridContainer}>
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
      </View>
    );
  }
}

styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  stats: {
    padding: 5,
  },
  item: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden'
  },
});

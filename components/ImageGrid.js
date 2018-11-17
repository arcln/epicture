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
import {Video} from 'expo';

export default class ImageGrid extends React.Component {

  state = {
    itemPerRow: this.props.itemsPerRow || 2,
    itemWidth: Dimensions.get('window').width / (this.props.itemsPerRow || 2),
    displayedData: [],
    displayedCount: 20,
  };

  getExt = e => e.images && e.images[0] && e.images[0].link.substr(e.images[0].link.lastIndexOf('.'));

  updateData = data => {
    const newData = data.filter(e => {
      const ext = this.getExt(e);
      return ['.jpg', '.png', '.gif', '.mp4'].includes(ext);
    }).slice(0, this.state.displayedCount);

    if (newData.length % 2) {
      newData[newData.length - 1] = undefined;
    }

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
    <View key={i} style={[styles.item, {maxWidth: this.state.itemWidth}]}>
      <TouchableHighlight onPress={() => this.props.itemPressed && this.props.itemPressed(i, data)}>
        <View>
          {
            this.getExt(data) === '.mp4' ? (
              <Video
                source={{uri: data.images[0].link}}
                rate={1.0}
                volume={1.0}
                isMuted={true}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{
                  width: this.state.itemWidth - 10,
                  height: this.state.itemWidth,
                }}
              />
            ) : (
                <AsyncImage
                  source={{uri: data.images[0].link}}
                  style={{
                    width: Dimensions.get('window').width / this.state.itemPerRow - styles.item.margin * 2,
                    height: Dimensions.get('window').width / this.state.itemPerRow,
                  }}
                />
              )
          }
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
                options={['1 item per row', '2 items per row']}
                default='2 items per row'
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
        <View style={{height: Dimensions.get('window').height, paddingBottom: 50}}>
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
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  stats: {
    padding: 5,
  },
  item: {
    // flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden'
  },
});

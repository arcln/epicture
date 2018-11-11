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
import ContentLoader from 'react-native-content-loader';
import {Circle, Rect} from 'react-native-svg';
import AsyncImage from '../components/AsyncImage';

export default class ImageGrid extends React.Component {

  state = {
    itemPerRow: this.props.itemsPerRow,
    itemWidth: Dimensions.get('window').width / this.props.itemsPerRow,
    displayedData: [],
  };

  componentWillReceiveProps = (props) => {
    this.setState({
      displayedData: props.data.filter(e => {
        const ext = e.images && e.images[0].link.substr(e.images[0].link.lastIndexOf('.'));
        return ['.jpg', '.png', '.gif'].includes(ext);
      }).slice(0, 10),
    });
  };

  viewScrolled = e => {
    // console.log(e);
  };

  loader = (
    <ContentLoader
      height={this.state.itemWidth}
      width={this.state.itemWidth}
      speed={3}
      primaryColor='#f3f3f3'
      secondaryColor='#eee'
    >
      <Rect x='0' y='0' rx='5' ry='5' width={this.state.itemWidth} height={this.state.itemWidth} />
    </ContentLoader>
  );

  renderItem = (data, i) => (
    <TouchableHighlight key={i} onPress={() => this.props.itemPressed && this.props.itemPressed(i, data)}>
      <View>
        <AsyncImage
          source={{uri: data.images[0].link}}
          placeholder={this.loader}
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

  render() {
    return (
      <ScrollView style={styles.gridContainer} onScroll={this.viewScrolled} scrollEventThrottle={0}>
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
        <Grid
          renderItem={this.renderItem}
          data={this.state.displayedData}
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
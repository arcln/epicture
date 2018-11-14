import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'expo';

export default class ImageStats extends React.Component {
  onUpvote() {
    alert('upvote');
  }

  onDownvote() {
    alert('downvote');
  }

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.infoButton} >
          <View style={{justifyContent: 'center'}}>
            <Icon.Ionicons
              size={this.props.size  + this.platformSettings.eyeSize}
              color={this.props.color}
              name={this.platformSettings.eye}
            />
          </View>
          <View style={{justifyContent: 'center', paddingLeft: 6}}>
            <Text style={{fontSize: this.props.size, color: this.props.color}}>{this.props.data.views || 0}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.onUpvote} style={styles.infoButton}>
            <Icon.Ionicons
              size={this.props.size + this.platformSettings.arrowsSize}
              color={this.props.color}
              name={this.platformSettings.arrowUp}
            />
            <View style={styles.buttonLabel}>
              <Text style={{fontSize: this.props.size, color: this.props.color}}>{this.props.data.ups || 0}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onDownvote} style={styles.infoButton}>
            <Icon.Ionicons
              size={this.props.size + this.platformSettings.arrowsSize}
              color={this.props.color}
              name={this.platformSettings.arrowDown}
            />
            <View style={styles.buttonLabel}>
              <Text style={{fontSize: this.props.size, color: this.props.color}}>{this.props.data.downs || 0}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  platformSettings = Platform.OS === 'ios' ? {
    arrowUp: 'ios-arrow-round-up',
    arrowDown: 'ios-arrow-round-down',
    eye: 'ios-eye',
    arrowsSize: 8,
    eyeSize: 4,
  } : {
    arrowUp: 'md-arrow-round-up',
    arrowDown: 'md-arrow-round-down',
    eye: 'md-eye',
    arrowsSize: 4,
    eyeSize: 4,
  }
}

const styles = StyleSheet.create({
  infoButton: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  buttonLabel: {
    justifyContent: 'center',
    paddingLeft: 5,
  }
});

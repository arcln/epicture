import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'expo';
import User from '../api/User';
import Imgur from '../api/Imgur';
import ImgurConsts from '../constants/Imgur';

export default class ImageStats extends React.Component {

  imgur = new Imgur(ImgurConsts.clientId, ImgurConsts.clientSecret);

  user = User.get();

  state = {
    vote: null,
  }

  async componentDidMount() {
    this.user = await this.user;
    this.imgur.login(this.user.access_token);
    this.setState({vote: this.props.data.vote});
  }

  toggleVote = async (vote) => {
    if (this.user.account_username == this.props.data.account_url || this.user.account_username == this.props.data.images[0].account_url)
      return;

    let value = await this.imgur.toggleVote(vote, this.state.vote, this.props.data.id);
    this.setState({vote: value});
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
          <TouchableOpacity onPress={() => this.toggleVote('up')} style={styles.infoButton}>
            <Icon.Ionicons
              size={this.props.size + this.platformSettings.arrowsSize}
              color={this.state.vote == 'up' ? 'green' : this.props.color}
              name={this.platformSettings.arrowUp}
            />
            <View style={styles.buttonLabel}>
              <Text style={{fontSize: this.props.size, color: this.props.color}}>{this.props.data.ups || 0}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggleVote('down')} style={styles.infoButton}>
            <Icon.Ionicons
              size={this.props.size + this.platformSettings.arrowsSize}
              color={this.state.vote == 'down' ? 'red' : this.props.color}
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

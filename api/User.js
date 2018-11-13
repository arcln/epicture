import {AsyncStorage} from 'react-native';

export default class {

    static async get() {
        return JSON.parse(await AsyncStorage.getItem('user'));
    }

    static async set(user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    }

    static async logout() {
        await AsyncStorage.removeItem('user');
    }
}
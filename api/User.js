import {AsyncStorage} from 'react-native';

class User {

    static lastUpdate = 0;
    static cache = {};
    static subscribers = [];
    static triggerChange = () => User.subscribers.forEach(f => f(User.cache));

    static async get() {
        let now = Date.now();

        if (now - User.lastUpdate > 60 * 60 * 1000) { // 1 hour
            User.cache = JSON.parse(await AsyncStorage.getItem('user'));
            User.lastUpdate = now;
            console.log('put user in memory cache');
        }

        return User.cache;
    }

    static async set(user) {
        User.cache = JSON.stringify(user);
        await AsyncStorage.setItem('user', User.cache);
        User.triggerChange();
    }

    static async logout() {
        User.cache = null;
        await AsyncStorage.removeItem('user');
        User.triggerChange();
    }

    static onChange(callback) {
        User.subscribers.push(callback);
    }
}

export default User;

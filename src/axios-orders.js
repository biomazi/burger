import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-df448.firebaseio.com/',
    headers: {
        Authorization: 'AUTH_TOKEN'
    }
});

// instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;
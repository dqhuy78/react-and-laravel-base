import axios from 'axios';

const csrfToken = document.head.querySelector('meta[name=csrf-token]').getAttribute('content');

export default axios.create({
    headers: {
        'X-CSRF-TOKEN': csrfToken
    }
});

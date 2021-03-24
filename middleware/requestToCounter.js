const http = require('http');

module.exports = async (req, res, next) => {
    const { params: { id } } = req;

    const postOptions = {
        hostname: 'localhost',
        port: 5000,
        path: `/counter/${id}/incr`,
        method: 'POST',
    }

    const reqPost = await http.request(postOptions);

    reqPost.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    reqPost.end();
    next();
};

const http = require('http');
const Hawk = require('@hapi/hawk');

const host = '127.0.0.1';
const port = 5000;

const credentialsFunc = function (id) {
    const credentials = {
        key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
        algorithm: 'sha256',
        user: 'Someone'
    };
    return credentials;
};

const server = http.createServer((req, res) => {
    let status = 200;

    // hawk function
    console.log('calling hawk algo...');
    (async () => {
        try {
            const {
                credentials,
                artifacts
            } = await Hawk.server.authenticate(req, credentialsFunc);
            console.log(`Hello ${credentials.user} ${artifacts.ext}`);
        } catch (err) {
            console.log(`[ERROR]: Hawk auth error => ${err.message}`);
            status = 401;
        }
        console.log('server start responding...');
        res.writeHead(status, {
            'Content-Type': 'application/json'
        });
        res.end(`Hawk auth headers status code: ${status}`);
        console.log('server response ended...')
    })();

});

server.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}/`);
});

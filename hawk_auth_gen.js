const http = require('http');
const Hawk = require('@hapi/hawk');

const host = '127.0.0.1';
const port = 4000;

// Client credentials
const credentials = {
    id: 'dh37fgj492je',
    key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
    algorithm: 'sha256'
}

// Request options
const requestOptions = {
    uri: 'http://127.0.0.1:5000/',
    method: 'GET',
    headers: {}
};

const server = http.createServer( (req, res) => {

    // Generate Authorization request header
    const { header } = Hawk.client.header('http://127.0.0.1:5000/', 'GET', { credentials: credentials, ext: 'some-app-data' });
    requestOptions.headers.Authorization = header;
    console.log(header);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(`Hawk auth headers: ${header}`);
});

server.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}/`);
});

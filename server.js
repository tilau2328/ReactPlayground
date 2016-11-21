import { Server } from 'hapi';
import Inert from 'inert';

const server = new Server();
server.connection({
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 8080
});

let staticRoute = {
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'src/client/public',
            index: ['index.html']
        }
    }
};

let plugins = [ Inert ];
let routes = [ staticRoute ];

server.register( plugins,
    error => {
        server.route(routes);
        if (error) return console.error(error);
        server.start(() => console.log('Server running at:', server.info.uri));
    }
);

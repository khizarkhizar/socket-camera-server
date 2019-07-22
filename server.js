const app = require('http').createServer();
const io = require('socket.io').listen(app);

app.listen(3000, function(){
    console.log('listening on *:3000');
});

let camSockets = [];
let cameraSockets = [];

io.on('connection', function (socket) {

    let isClient = true;
    console.log('+ connected ' + socket.id);


    // support camera module
    socket.on('register', function (cams) {

        isClient = false;
        cams.forEach( function(cameraName) {
            cameraSockets[cameraName] = socket;
        });
        io.to('#clients').emit('cameraList', Object.keys(cameraSockets));

    });

    socket.on('getSnapshot', function (cameraName, ack) {

        if( cameraSockets[cameraName] === undefined ) {
            ack(false);
        } else {
            ack(true);
            cameraSockets[cameraName].emit('getSnapshot', {
                'camera':   cameraName,
                'returnTo': socket.id
            });
        }

    });

    socket.on('sendSnapshot', function(data) {

        console.log('= send snap ');
        io.to(data.returnTo).emit('snapshot', data);

    });


    // support client module
    socket.on('subscribeCameraList', function() {

        socket.join('#clients');
        socket.emit('cameraList', Object.keys(cameraSockets));

    });

    // disconnet
    socket.on('disconnect', function() {

        if( ! isClient ) {
            cameraSockets = cameraSockets.filter(function(s) {
                return s.id !== socket.id;
            });
            io.to('#clients').emit('cameraList', Object.keys(cameraSockets));
            console.log('- camera disconnected ' + socket.id);
        } else {
            console.log('- client disconnected ' + socket.id);
        }

    });

});
var express = require('express'); 
var mongoose = require('mongoose');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
mongoose.connect('mongodb://abc:12345@cluster0-shard-00-00-ezags.mongodb.net:27017,cluster0-shard-00-01-ezags.mongodb.net:27017,cluster0-shard-00-02-ezags.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection err:'));
db.once('open', function () {
    console.log('connect')

    // we're connected!
});

// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/login.html');
})
var Schema = new mongoose.Schema({
    name: String,
    age: Number
});

var user = mongoose.model('emp', Schema);

app.post('/new', function (req, res) {
    new user({
        name: req.body.name,
        number: req.body.number
    }).save(function (err, doc) {
        if (err) res.json(err);
        else res.send('Successfully inserted!');
    });
}).listen(3000,()=>{
    console.log('start')
})




import app from './app';

app.listen(app.get('port'));

console.log("Server & Database running on port..", app.get('port'));
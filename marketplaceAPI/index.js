const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const connectDB = require('./connectDB');
const app = express();
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const dropboxRoute = require('./routes/dropboxRoute');
const cors = require('cors');

const productRoute = require('./routes/productRoute');

connectDB();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/products', productRoute);
app.use('/dropbox', dropboxRoute);

// const dbx = new require('dropbox').Dropbox({
//     accessToken: 'sl.BcfW_A_xKK3QgGgTMGpqcQZSXZ9cCGakPkpJnfhlBHR0kTU3HDOZ0HAnixKA88UGpVMfF5mWwTf4K5pSMJOL9bLnIa_0txUeXq1V-hs7mBMfzAbYGIa4HxDP142WWPH5EpXgImb8'
// });
// app.use('/files/:filename', (req, res, next) => {
//     const filename = req.params.filename;
//     const filePath = `https://content.dropboxapi.com/2/files/download?arg={"path":"/user/${filename}"}`;
//     express.static(filePath)(req, res, next);
// });


// sample request post http://localhost:4000/file/a.jpg with auth access token bearer

// serve files from the specified Dropbox folder
// app.use(express.static('https://content.dropboxapi.com/2/files/download?path=/connectDB.js'));
// app.use(express.static('https://api.dropboxapi.com/2/files/download?path=/user/index.js'));

app.listen(port, () => {
    console.log(`server running on ${port}`);
})
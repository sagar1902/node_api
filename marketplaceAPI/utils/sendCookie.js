const sendCookie = (user = {}, statusCode, res) => {
    const token = user.generateToken();

    const options = {
        // expires: new Date(
        //     Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        // ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user:{
            _id: user._id,
            name:user.name,
            username:user.username,
            email:user.email,
        },
    });
}

module.exports = sendCookie;
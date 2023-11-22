import loginRegisterService from '../services/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters', //error message
                EC: '1', //error code
                DT: ''//data
            })
        }
        if (req.body.password && req.body.password < 3) {
            return res.status(200).json({
                EM: 'Your password must have more than 3 letters', //error message
                EC: '1', //error code
                DT: ''//data
            })
        }

        let data = await loginRegisterService.registerNewUser(req.body);

        //service
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''//data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: ''//data
        })
    }
    console.log(">>> call me", req.body)
}

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        // set cookie 
        if (data && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }


}

module.exports = {
    testApi, handleRegister, handleLogin
}
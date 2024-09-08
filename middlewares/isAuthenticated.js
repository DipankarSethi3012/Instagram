import jwt from "jsonwebtoken"

const isAuthenticated = async(req, res, next) => {
    try {
        const token =  req.cookies.token ||  req.headers['authorization'].replace('Bearer ', '');

        if(!token) {

            console.log("Can't able to find token in cookies and header");
            return res.status(401).json(  //401 means unauthorized
                {
                    success : false,
                    message : "User not authenticated"
                }
            )
        }
        //verify method is used to verify oor token by matching it or secret key
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        //means token isn't same
        if(!decode) {
            console.log("Token not verified");

            return res.status(401).json( {
                success : false,
                message : "Token verification unsuccessfull"
            })
        }

        console.log("Token verified successfull");
        req.id = decode.userId; //saving the id of user in req so that we can fetch it when we need it
        next();// means this is completed 
    } catch (err) {
        console.log("An error occured while autenticating the User");
        console.error(err.message);

        res.status(500).json( {
            success : false,
            error : err.message,
            message : "can't authenticate the User"
        })
    }
}

export default isAuthenticated;
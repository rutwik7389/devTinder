const adminauth = (req, res, next) => {
    console.log("admin auth is checked");
    const token = "xyz";
    const isadminauthorised = token === "xyz";
    if (!isadminauthorised) {
        res.status(401).send("unauthorised request");
    } else {
        next();
    }
};


const userauth = (req, res, next) => {
    console.log("user auth is checked");
    const token = "xyz";
    const isadminauthorised = token === "xyz";
    if (!isadminauthorised) {
        res.status(401).send("unauthorised request");
    } else {
        next();
    }
};

module.exports = { adminauth,userauth, };

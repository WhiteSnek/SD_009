import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try{
        const decision = await aj.protect(req, {
            requested: 1,
        });

        if (!decision.isDenied()) {
            // Request is allowed, proceed to the next middleware or route handler
            next();
        } else {
            // Request is blocked
            if(decision.reason.isRateLimit())
                return res.status(429).send("Rate limit exceeded. Please try again later.");
            
            if(decision.reason.isBot())
                return res.status(403).send("Access denied. Bots are not allowed.");

            if(decision.reason.isShield())
                return res.status(403).send("Access denied. Shield protection triggered.");

            return res.status(403).send("Access denied. Unknown reason.");
        }

    } catch(error){
        console.error("Error in arcjet middleware:", error);
        return res.status(500).send("Internal server error.");
    }
}

export default arcjetMiddleware;
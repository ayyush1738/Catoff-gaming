import apiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async(req, res) => {
    return res.status(200)
    .json(new apiResponse(200, "OK", "Healthcheck Passed"));
})

export { healthcheck };
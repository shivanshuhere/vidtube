import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/users.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, password, email } = req.body;

  //validation of data fields
  if ([fullName, username, password, email].some((field) => field?.trim === ""))
    throw new ErrorResponse(400, "Full name is required!");

  //user already exist or not
  const exitedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (exitedUser) {
    throw new ErrorResponse(409, "User with email/username already exist!");
  }

  // handle files from multer
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImgLocalPath = req.files?.coverImg[0]?.path;

  if (!avatarLocalPath)
    throw new ErrorResponse(400, "Avatar Image is missing!");

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  let coverImg = "";
  if (coverImgLocalPath) {
    coverImg = await uploadOnCloudinary(coverImgLocalPath);
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImg: coverImg?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  if (!createdUser)
    throw new ErrorResponse(
      500,
      "Something went wrong while registering user. "
    );

  return res
    .status(201)
    .json(new ApiResponse(200, "User registered successfully"));
});

export { registerUser };

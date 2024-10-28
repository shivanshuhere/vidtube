import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/users.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, password, email } = req.body;

  //validation of data fields
  if ([fullName, username, password, email].some((field) => field?.trim === ""))
    throw new ErrorResponse(400, "All fields are required!");

  //user already exist or not
  const exitedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (exitedUser) {
    throw new ErrorResponse(409, "User with email/username already exist!");
  }

  // handle files from multer
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImgLocalPath = req.files?.coverImg?.[0]?.path;

  if (!avatarLocalPath)
    throw new ErrorResponse(400, "Avatar Image is missing!");

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
  } catch (error) {
    console.log("Failed to upload avatar to cloudinary ", error);
  }

  let coverImg = "";
  if (coverImgLocalPath) {
    try {
      coverImg = await uploadOnCloudinary(coverImgLocalPath);
    } catch (error) {
      console.log("Faild to upload coverImg to cloudinary ", error);
    }
  }
  let user;
  let createdUser;
  try {
    user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImg: coverImg?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });
    createdUser = await User.findById(user._id).select(
      "-password -refreshToken "
    );
  } catch (error) {
    console.log("Failed to create user ", error);
  }

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

import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";

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

  if (!avatarLocalPath) {
    throw new ErrorResponse(400, "Avatar Image is missing!");
  }

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
    console.log("User created successfully !", user);
  } catch (error) {
    console.log("Failed to create user ", error);
    await deleteOnCloudinary(avatar.public_id);
    await deleteOnCloudinary(coverImg.public_id);
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

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ErrorResponse(404, "User not found!");
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!username && !email) {
    throw new ErrorResponse(400, "Username or email is required!");
  }
  let user;
  user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    throw new ErrorResponse(404, "User not found!");
  }

  const ispasswordCorrect = await user.isPasswordCorrect(req.body.password);
  if (!ispasswordCorrect) {
    throw new ErrorResponse(400, "Invalid credentials!");
  } else {
    user.generateAccessToken();
    user.generateRefreshToken();
    return res.status(200).json(new ApiResponse(200, "Login success", user));
  }
});

export { registerUser };

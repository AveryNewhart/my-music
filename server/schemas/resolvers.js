//! have to create the mutations for reviews, saving music. 
 
const { AuthenticationError, UserInputError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
// import mongoose from "mongoose";
const mongoose = require("mongoose");
const { User, Album, Review } = require("../models"); //we don't need to do the dataSource at all if we import all the models
// const { ObjectId } = require("mongodb"); //! for review as of now

const resolvers = {
  Query: {
    user: async (parent, { username }, context) => {
      return await User.findOne({ username })
      .populate("following")
      .populate("followers");
    },
    // users: async (_, __, context) => {
    //   return await User.find();
    // },
    users: async (_, __, context) => {
      return await User.find()
        .populate("listenedAlbums")
        .populate("wannaListenAlbums")
        .populate("reviews");
    },

    album: async (_, { id }, context) => {
      return await Album.getAlbumById(id);
    },
    // reviews: async (_, { id }, context) => {
    //   return await Review.getReviewById(id);
    // },
    reviews: async (_, __, context) => {
      return await Review.find();
    },
    

    protected: async (parent, args, context) => {
      //!Query defined in typeDef for authentication
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id })
        .populate("following")
        .populate("followers");
        console.log(context.user);
        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    createUser: async (parent, { input }) => {
      console.log(input);
      const user = await User.create(input);
      const token = signToken(user);

      return { token, user };
    },

    loginUser: async (parent, { email, password }) => {
      // console.log(context);
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      console.log(user);
      if (user.id) {
        const token = signToken(user);
        return { token, user };
      }
    },

    addProfilePicture: async (parent, { _id, profilePicture }) => {
      const user = await User.findOne({ _id });
      user.profilePicture = profilePicture;
      await user.save();
      return user;
    },

    deleteUser: async (parent, { password }, { user }) => {
      // Check if user is logged in
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // Find user by ID and delete
      const deletedUser = await User.findByIdAndDelete(user._id); //!pass id from user

      // If user is not found, throw an error
      if (!deletedUser) {
        throw new AuthenticationError("User not found.");
      }
      console.log(deletedUser.username);
      return deletedUser;
    },

  addReview: async (parent, { input }, context) => {
            // Generate a new ID for the album
      if (!context.user) {
              throw new AuthenticationError("You need to be logged in to save music.");
            }
    
      // const reviewWithId = { ...input, id: new mongoose.Types.ObjectId() };
      const reviewWithUsername = { ...input, username: context.user.username };
      const savedReview = await Review.create(reviewWithUsername);
    
      // const savedReview = await Review.create(reviewWithId);
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { reviews: savedReview } },
              { new: true, runValidators: true }
            ).populate("reviews");
    
            return updatedUser;
  },

    saveToListened: async (parent, { album }, context) => {
        // Generate a new ID for the album
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in to save music.");
        }

  const albumWithId = { ...album, id: new mongoose.Types.ObjectId() };

  const savedAlbum = await Album.create(albumWithId);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { listenedAlbums: savedAlbum } },
          { new: true, runValidators: true }
        ).populate("listenedAlbums");

        return updatedUser;
        },

    saveToWannaListen: async (parent, { album }, context) => {
        // Generate a new ID for the album
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in to save music.");
        }

  const albumWithId = { ...album, id: new mongoose.Types.ObjectId() };

  const savedAlbum = await Album.create(albumWithId);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { wannaListenAlbums: savedAlbum } },
          { new: true, runValidators: true }
        ).populate("wannaListenAlbums");

        return updatedUser;
    },  

    addFollower: async (_, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in to follow users.");
      }
    
      try {
        const loggedInUserId = context.user._id;
        const userToFollow = await User.findById(id);
    
        if (!userToFollow) {
          throw new UserInputError('User not found');
        }
    
        const isAlreadyFollowing = userToFollow.followers.includes(loggedInUserId);
        if (isAlreadyFollowing) {
          throw new Error("You are already following this user.");
        }
    
        userToFollow.followers.push(loggedInUserId);
        await userToFollow.save();
    
        const loggedInUser = await User.findById(loggedInUserId).populate('following');
        loggedInUser.following.push(userToFollow._id);
        await loggedInUser.save();
    
        return userToFollow;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to add follower: ' + error.message);
      }
    },
    
  },
};
module.exports = resolvers;


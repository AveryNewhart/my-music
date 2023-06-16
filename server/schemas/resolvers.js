//! have to create the mutations for reviews, saving music. 

const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Album } = require("../models"); //we don't need to do the dataSource at all if we import all the models
// const { ObjectId } = require("mongodb"); //! for review as of now

const resolvers = {
  Query: {
    user: async (parent, { username }, context) => {
      return await User.findOne({ username });
    },
    users: async (_, __, context) => {
      return await User.find();
    },

    album: async (_, { id }, context) => {
      return await Album.getAlbumById(id);
    },

    protected: async (parent, args, context) => {
      //!Query defined in typeDef for authentication
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
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

    // addReview: async (parent, { albumId, reviewText }, { user }) => {
    //   if (!user) {
    //     throw new AuthenticationError("You need to be logged in to add a review.");
    //   }

    //   const album = await Album.findById(albumId);
    //   if (!album) {
    //     throw new Error("Album not found.");
    //   }

    //   const review = {
    //     userId: user._id,
    //     reviewText,
    //   };

    //   album.reviews.push(review);
    //   await album.save();

    //   return album;
    // },
    saveToListened: async (parent, { albumId }, context) => {
      if (context.user) {
        return (updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { listenedAlbums: albumId } },
          { new: true, runValidators: true }
        ).populate("listenedAlbums"));
      }
      throw new AuthenticationError("You need to be logged in!");
      // if (!user) {
      //   throw new AuthenticationError("You need to be logged in to save music.");
      // }

      // const album = await Album.findById(albumId);
      // if (!album) {
      //   throw new Error("Album not found.");
      // }

      // user.listenedAlbums.push(album);
      // await user.save();

      // return user;
    },
    saveToWannaListen: async (parent, { albumId }, { user }) => {
      // if (context.user) {
      //   return (updatedUser = await User.findOneAndUpdate(
      //     { _id: context.user._id },
      //     { $addToSet: { watchedMovies: movie } },
      //     { new: true, runValidators: true }
      //   ).populate("watchedMovies"));
      // }
      // throw new AuthenticationError("You need to be logged in!");
      if (!user) {
        throw new AuthenticationError("You need to be logged in to save music.");
      }

      const album = await Album.findById(albumId);
      if (!album) {
        throw new Error("Album not found.");
      }

      user.wannaListenAlbums.push(album);
      await user.save();

      return user;
    },  
  },
};
module.exports = resolvers;


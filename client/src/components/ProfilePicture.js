import FileBase64 from "react-file-base64";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE_PICTURE } from "../utils/mutations";
import auth from "../utils/auth";

export default function ProfilePicture() {
  const [formState, setFormState] = useState({
    addProfilePictureId: auth.getProfile().data._id,
    profilePicture: ""
  });

  // eslint-disable-next-line
  const [addProfilePicture, { error, data }] = useMutation(ADD_PROFILE_PICTURE);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleFileUpload = (file) => {
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
      setFormState({
        ...formState,
        profilePicture: file
      });
    };
  

  const handleFormSubmit = async (event) => {
     event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfilePicture({
        variables: { ...formState }
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="" onSubmit={handleFormSubmit}>
      <input
        type="hidden"
        onChange={handleChange}
        value={auth.getProfile().data._id}
      />
      <div className="">
        {/* <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setFormState({
              addProfilePictureId: auth.getProfile().data._id,
              profilePicture: base64
            })
          }
        /> */}
           <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => handleFileUpload(base64)}
        />
      </div>
      <button className="">Upload Profile Picture</button>
    </form>
  );
}
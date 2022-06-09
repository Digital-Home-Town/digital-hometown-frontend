import image from "./alf.jpeg";
import defaultImage from "./NoImage.png";

export const data = {
  loggedIn: true,
  defaultImage: defaultImage,
  valid_interests: ["sport", "culture", "traveling", "tv"],
  
  first_name: "Alf",
  surname: "Tanner",
  adress: {
    street: "Hemdale",
    street_no: 167,
    place: "Los Angeles, California",
    postal_code: 1234,
    country: "US",
  },
  phone_number: "555-4044",
  image_url: image,
  description:
    "I'am an troublesome, sarcastic, cynical, and i'm an hungry alien who loves to eat food such as pizza.",
  interests: [],
};

import cloudinary from "./config/cloudinary";

async function test() {
  try {
    const result = await cloudinary.api.ping();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

test();
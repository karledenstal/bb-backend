import { Schema, model } from "mongoose";
import argon2 from "argon2";
import URLSlugs from "mongoose-url-slugs";

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: '',
      unique: true,
    }
  },
  {
    timestamps: true,
  }
);

User.pre("save", async (next) => {
  const user: any = this;
  const hash = await argon2.hash(user.password);
  user.password = hash;
  next();
});

User.methods.isValidPassword = async (password) => {
  const user: any = this;
  const valid = await argon2.verify(user.password, password);

  return valid;
}

User.plugin(URLSlugs('username', { field: 'slug' }));

export default model("user", User);

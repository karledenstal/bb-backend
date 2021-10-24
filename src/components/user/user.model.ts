import { Schema, model } from "mongoose";
import argon2 from "argon2";
import URLSlugs from "mongoose-url-slugs";

interface IUser {
  email: string;
  password: string;
  alias: string;
  slug: string;
  updatedAt?: string;
  createdAt?: string;
  isValidPassword(password: string): boolean;
}

const User = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    alias: {
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
      default: "",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

User.pre("save", async function (next): Promise<void> {
  const self: any = this;
  console.log("self", self);
  const hash = await argon2.hash(self.password);
  self.password = hash;
  next();
});

User.methods.isValidPassword = async function (password): Promise<boolean> {
  const user: any = this;
  const valid = await argon2.verify(user.password, password);

  return valid;
};

User.plugin(URLSlugs("alias", { field: "slug" }));

export default model<IUser>("user", User);

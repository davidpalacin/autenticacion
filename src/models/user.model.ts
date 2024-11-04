import { ObjectId } from 'mongodb';
import db from '../database/mongo.conn';
import { UserInterface } from '../utils/interfaces/UserInterface';


export const getUsers =
  async (): Promise<UserInterface[]> => {
    const users = await db
      .collection<UserInterface>('users')
      .find()
      .toArray();
    return users;
  };

export const getUserById =
  async (id: string): Promise<UserInterface | null> => {
    const user = await db
      .collection<UserInterface>('users')
      .findOne({ id });
    return user;
  };

export const getUserByEmail = 
  async (email: string): Promise<UserInterface | null> => {
    const user = await db
      .collection<UserInterface>('users')
      .findOne({ email });
    return user
  }

export const createUser =
  async (user: UserInterface): Promise<ObjectId | null> => {
    const result = await db
      .collection<UserInterface>('users')
      .insertOne(user);
    return result.insertedId ? result.insertedId : null;
  };

export const updateUser =
  async (user: UserInterface): Promise<boolean> => {
    const result = await db
      .collection<UserInterface>('users')
      .updateOne({ id: user.id }, { $set: user });
    return result.modifiedCount === 1;
  };

export const deleteUserDb =
  async (id: string): Promise<boolean> => {
    const result = await db
      .collection<UserInterface>('users')
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  };

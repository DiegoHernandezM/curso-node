import { envs } from "../../config";
import { CategoryModel } from "../mongo/models/category.model";
import { ProductModel } from "../mongo/models/product.model";
import { MongoDatabase } from "../mongo/mongo-database";
import { UserModel } from "../mongo/models/user.mode";
import { seedData } from "./data";



(async () => {
  await MongoDatabase.connection({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });
  await main();
  await MongoDatabase.disconnect();
})();

const randomBetween =(x:number) => {
  return Math.floor(Math.random() * x);
}


async function main()
{
  console.log('Seeding database...');
  await ProductModel.deleteMany();
  console.log('Deleted all products');
  await CategoryModel.deleteMany();
  console.log('Deleted all categories');

  const users = await UserModel.insertMany(seedData.users);
  console.log('Inserted users');
  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => ({
      ...category,
      userId: users[randomBetween(users.length-1)]._id,
    }))
  );
  console.log('Inserted categories');
  const products = await ProductModel.insertMany(
    seedData.products.map((product) => ({
      ...product,
      userId: users[randomBetween(users.length-1)]._id,
      categoryId: categories[randomBetween(categories.length -1)]._id,
    }))
  );
  console.log('Inserted products');

  console.log('Seed completed');
}
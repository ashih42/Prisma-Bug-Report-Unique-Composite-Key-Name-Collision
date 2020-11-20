import { PrismaClient } from "@prisma/client";

export const PRISMA_CLIENT = new PrismaClient();

async function main() {
  const my_cat = await PRISMA_CLIENT.cat.findOne({
    where: {
      api_id_workspace_id: {
        api_id: 12345,
        workspace_id: "my_workspace_id",
      },
    },
  });
  console.log("my_cat:", my_cat);

  const my_dog = await PRISMA_CLIENT.dog.findOne({
    where: {
      api_id_workspace_id: {
        api_id: "asdf",
        workspace_id: "my_workspace_id",
      },
    },
  });
  console.log("my_dog:", my_dog);

  process.exit();
}

main();

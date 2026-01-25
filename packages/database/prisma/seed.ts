import { PrismaPg } from "@prisma/adapter-pg";
import * as bcrypt from "bcrypt";

import { PrismaClient } from "../generated/prisma/client";
import { readFile } from "node:fs/promises";

const SALTORROUND = 12;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });
async function main() {
  async function createUser({
    name,
    pass,
    emailAddress,
  }: {
    name: string;
    pass: string;
    emailAddress: string;
  }) {
    return await prisma.user.create({
      data: {
        name,
        passwordHash: await bcrypt.hash(pass, SALTORROUND),
        emailAddress,
      },
    });
  }

  async function createAuthor(name: string) {
    return await prisma.author.create({
      data: {
        name,
      },
    });
  }

  async function createBooksFromSameAuthor(
    userId: string,
    authorId: string,
    books: {
      title: string;
    }[],
  ) {
    return await Promise.all(
      books.map(({ title }) =>
        prisma.book.create({
          data: {
            title,
            authors: {
              connect: [{ id: authorId }],
            },
            userId,
          },
        }),
      ),
    );
  }

  const jane = await createUser({
    name: "jane",
    pass: "1234abcd@ABCD",
    emailAddress: "jane@gmail.com",
  });
  const janeAusten = await createAuthor("Jane Austen");
  await createBooksFromSameAuthor(jane.id, janeAusten.id, [
    { title: "Sense and Sensibility" },
    { title: "Pride and Prejudice" },
    { title: "Mansfield Park" },
    { title: "Emma" },
    { title: "Northanger Abbey" },
    { title: "Persuasion" },
  ]);

  const john = await createUser({
    name: "john",
    pass: "1234abcd@ABCD",
    emailAddress: "john@gmail.com",
  });
  const stevenPressfield = await createAuthor("Steven Pressfield");
  await createBooksFromSameAuthor(john.id, stevenPressfield.id, [
    { title: "The War of Art" },
    { title: "Turning Pro" },
    { title: "The Artist's Journey" },
    { title: "A Man at Arms" },
    { title: "Tide of War" },
    { title: "The Profession" },
    { title: "The Daily Pressfield" },
    { title: "The Virtues of War" },
  ]);

  const ryanSinger = await createAuthor("Ryan Singer");
  const jsonText = await readFile(
    new URL("./example-book.json", import.meta.url),
    "utf-8",
  );
  const shapeUpChapters = JSON.parse(jsonText) as {
    title: string;
    number: number;
    content: string;
  }[];
  const shapeUp = await prisma.book.create({
    data: {
      title: "Shape Up",
      authors: {
        connect: [{ id: ryanSinger.id }],
      },
      userId: john.id,
    },
  });
  await prisma.chapter.createMany({
    data: shapeUpChapters.map((chapter) => ({
      ...chapter,
      bookId: shapeUp.id,
    })),
  });

  const richardFeynman = await createAuthor("Richard Feynman");
  const sixEasyPieces = await prisma.book.create({
    data: {
      title: "Six Easy Pieces",
      authors: {
        connect: [
          {
            id: richardFeynman.id,
          },
        ],
      },
      userId: jane.id,
      chapters: {
        createMany: {
          data: [
            {
              content:
                "Explains the origin of the book from Feynman’s lectures and his goal of conveying the spirit of physics rather than formal derivations.",
              number: 1,
              title: "Preface",
            },
            {
              content:
                "Introduces gravity as a universal interaction, highlighting Newton’s insight and the mystery behind why masses attract each other.",
              number: 2,
              title: "The Law of Gravitation",
            },
            {
              content:
                "Discusses mathematics as the language of nature, emphasizing its power to describe physical laws despite its abstract origins.",
              number: 3,
              title: "The Relation of Mathematics to Physics",
            },
            {
              content:
                "Explores fundamental conservation laws, such as energy and momentum, as deep invariants that govern all physical processes.",
              number: 4,
              title: "The Great Conservation Principles",
            },
            {
              content:
                "Shows how symmetry principles guide modern physics and reveal what remains unchanged when systems are transformed.",
              number: 5,
              title: "Symmetry in Physical Laws",
            },
            {
              content:
                "Introduces the strange and counterintuitive nature of quantum mechanics, focusing on probability, uncertainty, and measurement.",
              number: 6,
              title: "Quantum Behavior",
            },
          ],
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

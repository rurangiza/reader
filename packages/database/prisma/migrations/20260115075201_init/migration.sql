-- CreateTable
CREATE TABLE "Book" (
    "id" UUID NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" UUID NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "bookId" UUID,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" UUID NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "bookId" UUID,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

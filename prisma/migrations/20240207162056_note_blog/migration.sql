-- CreateTable
CREATE TABLE "BlogNote" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "start" TEXT,
    "end" TEXT,
    "userId" TEXT,

    CONSTRAINT "calendar_pkey" PRIMARY KEY ("id")
);

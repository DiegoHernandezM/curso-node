-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "completedAt" TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

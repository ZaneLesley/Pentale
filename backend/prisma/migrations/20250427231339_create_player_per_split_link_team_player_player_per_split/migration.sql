-- CreateTable
CREATE TABLE "PlayerPerSplit" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "PlayerPerSplit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayerPerSplit" ADD CONSTRAINT "PlayerPerSplit_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerPerSplit" ADD CONSTRAINT "PlayerPerSplit_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

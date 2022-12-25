-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatuses" AS ENUM ('INVITED', 'ACTIVE', 'INACTIVE', 'ARCHIVE', 'DEACTIVATED', 'REMOVED');

-- CreateEnum
CREATE TYPE "UserVerifications" AS ENUM ('STANDARD', 'CELEBRITY', 'OFFICIAL', 'DEVELOPER');

-- CreateEnum
CREATE TYPE "MediaTypes" AS ENUM ('VIDEO', 'PHOTO', 'AUDIO', 'MODEL');

-- CreateEnum
CREATE TYPE "MediaExtensions" AS ENUM ('PNG', 'JPG', 'JPEG', 'BMP', 'MP4', 'AVI', 'FBX', 'USDZ', 'GLTF');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" VARCHAR(200) NOT NULL,
    "lastName" VARCHAR(200) NOT NULL,
    "screenName" VARCHAR(200) NOT NULL,
    "password" TEXT NOT NULL,
    "tempPassword" TEXT,
    "tempPasswordExpires" TIMESTAMP(3),
    "hasTempPassword" BOOLEAN NOT NULL DEFAULT false,
    "tokenVersion" INTEGER NOT NULL DEFAULT 0,
    "profilePic" TEXT,
    "role" "UserRoles" NOT NULL DEFAULT 'USER',
    "status" "UserStatuses" NOT NULL DEFAULT 'ACTIVE',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationType" "UserVerifications" NOT NULL DEFAULT 'STANDARD',
    "cellID" INTEGER,
    "totalPosts" INTEGER NOT NULL DEFAULT 0,
    "totalLikes" INTEGER NOT NULL DEFAULT 0,
    "totalFollowers" INTEGER NOT NULL DEFAULT 0,
    "totalFollowing" INTEGER NOT NULL DEFAULT 0,
    "totalFollowingPlaces" INTEGER NOT NULL DEFAULT 0,
    "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Followers" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "authorID" INTEGER NOT NULL,
    "cellID" INTEGER NOT NULL,
    "placeID" INTEGER,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replyCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReply" (
    "id" SERIAL NOT NULL,
    "postID" INTEGER NOT NULL,
    "authorID" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "PostReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "extension" "MediaExtensions" NOT NULL,
    "mediaType" "MediaTypes" NOT NULL,
    "postID" INTEGER NOT NULL,
    "mediaURL" TEXT NOT NULL,
    "mediaIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "likerID" INTEGER NOT NULL,
    "postID" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "cellID" INTEGER NOT NULL,
    "streetNum" VARCHAR(200) NOT NULL,
    "street" VARCHAR(200) NOT NULL,
    "city" VARCHAR(200) NOT NULL,
    "state" VARCHAR(200) NOT NULL,
    "stateCode" VARCHAR(5) NOT NULL,
    "postalCode" VARCHAR(20) NOT NULL,
    "county" VARCHAR(200) NOT NULL,
    "countryName" VARCHAR(200) NOT NULL,
    "countryCode" VARCHAR(5) NOT NULL,
    "peopleHere" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceFavorites" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "PlaceFavorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationCell" (
    "id" SERIAL NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "geoCellRes1" TEXT NOT NULL,
    "geoCellRes2" TEXT NOT NULL,
    "geoCellRes3" TEXT NOT NULL,
    "geoCellRes4" TEXT NOT NULL,
    "geoCellRes5" TEXT NOT NULL,
    "geoCellRes6" TEXT NOT NULL,
    "geoCellRes7" TEXT NOT NULL,
    "geoCellRes8" TEXT NOT NULL,
    "geoCellRes9" TEXT NOT NULL,
    "geoCellRes10" TEXT NOT NULL,
    "geoCellRes11" TEXT NOT NULL,
    "geoCellRes12" TEXT NOT NULL,
    "geoCellRes13" TEXT NOT NULL,
    "geoCellRes14" TEXT NOT NULL,
    "geoCellRes15" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LocationCell_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes1_idx" ON "LocationCell" USING HASH ("geoCellRes1");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes2_idx" ON "LocationCell" USING HASH ("geoCellRes2");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes3_idx" ON "LocationCell" USING HASH ("geoCellRes3");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes4_idx" ON "LocationCell" USING HASH ("geoCellRes4");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes5_idx" ON "LocationCell" USING HASH ("geoCellRes5");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes6_idx" ON "LocationCell" USING HASH ("geoCellRes6");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes7_idx" ON "LocationCell" USING HASH ("geoCellRes7");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes8_idx" ON "LocationCell" USING HASH ("geoCellRes8");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes9_idx" ON "LocationCell" USING HASH ("geoCellRes9");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes10_idx" ON "LocationCell" USING HASH ("geoCellRes10");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes11_idx" ON "LocationCell" USING HASH ("geoCellRes11");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes12_idx" ON "LocationCell" USING HASH ("geoCellRes12");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes13_idx" ON "LocationCell" USING HASH ("geoCellRes13");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes14_idx" ON "LocationCell" USING HASH ("geoCellRes14");

-- CreateIndex
CREATE INDEX "LocationCell_geoCellRes15_idx" ON "LocationCell" USING HASH ("geoCellRes15");

-- CreateIndex
CREATE UNIQUE INDEX "LocationCell_geoCellRes1_geoCellRes2_geoCellRes3_geoCellRes_key" ON "LocationCell"("geoCellRes1", "geoCellRes2", "geoCellRes3", "geoCellRes4", "geoCellRes5", "geoCellRes6", "geoCellRes7", "geoCellRes8", "geoCellRes9", "geoCellRes10", "geoCellRes11", "geoCellRes12", "geoCellRes13", "geoCellRes14", "geoCellRes15");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cellID_fkey" FOREIGN KEY ("cellID") REFERENCES "LocationCell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_cellID_fkey" FOREIGN KEY ("cellID") REFERENCES "LocationCell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_placeID_fkey" FOREIGN KEY ("placeID") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReply" ADD CONSTRAINT "PostReply_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReply" ADD CONSTRAINT "PostReply_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_likerID_fkey" FOREIGN KEY ("likerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_cellID_fkey" FOREIGN KEY ("cellID") REFERENCES "LocationCell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

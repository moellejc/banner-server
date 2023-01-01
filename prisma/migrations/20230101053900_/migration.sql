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

-- CreateEnum
CREATE TYPE "PlaceTypes" AS ENUM ('Transit', 'Residential', 'Commercial', 'Educational', 'Medical', 'Religious', 'Community', 'Municipality', 'Administrative', 'State', 'Province', 'Country', 'Continent', 'Geographic', 'Landmark');

-- CreateEnum
CREATE TYPE "LocationTypes" AS ENUM ('Place', 'User');

-- CreateTable
CREATE TABLE "users" (
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
    "locationID" INTEGER,
    "totalPosts" INTEGER NOT NULL DEFAULT 0,
    "totalLikes" INTEGER NOT NULL DEFAULT 0,
    "totalFollowers" INTEGER NOT NULL DEFAULT 0,
    "totalFollowing" INTEGER NOT NULL DEFAULT 0,
    "totalFollowingPlaces" INTEGER NOT NULL DEFAULT 0,
    "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_visit_histories" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "placeID" INTEGER NOT NULL,
    "departAt" TIMESTAMP(3) NOT NULL,
    "arriveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_visit_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_location_paths" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "geoCell" TEXT NOT NULL,
    "geoCellLevel" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_location_paths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friends" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "followers" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "authorID" INTEGER NOT NULL,
    "locationID" INTEGER NOT NULL,
    "placeID" INTEGER,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replyCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_replies" (
    "id" SERIAL NOT NULL,
    "postID" INTEGER NOT NULL,
    "authorID" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "post_replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "extension" "MediaExtensions" NOT NULL,
    "mediaType" "MediaTypes" NOT NULL,
    "postID" INTEGER NOT NULL,
    "mediaURL" TEXT NOT NULL,
    "mediaIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "likerID" INTEGER NOT NULL,
    "postID" INTEGER NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "places" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "language" VARCHAR(3) NOT NULL DEFAULT 'en',
    "placeType" "PlaceTypes" NOT NULL,
    "locationID" INTEGER NOT NULL,
    "parentID" INTEGER,
    "addressID" INTEGER NOT NULL,
    "peopleHere" INTEGER NOT NULL DEFAULT 0,
    "references" JSONB,
    "categories" JSONB,
    "contacts" JSONB,
    "hours" JSONB,
    "organizationID" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place_favorites" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "place_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "countryCode" VARCHAR(100) NOT NULL,
    "countryName" VARCHAR(100) NOT NULL,
    "stateCode" VARCHAR(100),
    "state" VARCHAR(100),
    "county" VARCHAR(100),
    "city" VARCHAR(100),
    "district" VARCHAR(100),
    "street" VARCHAR(100),
    "postalCode" VARCHAR(100),
    "houseNumber" VARCHAR(100),

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "locationType" "LocationTypes" NOT NULL,
    "primaryCellLevel" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "geoCellRes0" VARCHAR(30) NOT NULL,
    "geoCellRes1" VARCHAR(30) NOT NULL,
    "geoCellRes2" VARCHAR(30) NOT NULL,
    "geoCellRes3" VARCHAR(30) NOT NULL,
    "geoCellRes4" VARCHAR(30) NOT NULL,
    "geoCellRes5" VARCHAR(30) NOT NULL,
    "geoCellRes6" VARCHAR(30) NOT NULL,
    "geoCellRes7" VARCHAR(30) NOT NULL,
    "geoCellRes8" VARCHAR(30) NOT NULL,
    "geoCellRes9" VARCHAR(30) NOT NULL,
    "geoCellRes10" VARCHAR(30) NOT NULL,
    "geoCellRes11" VARCHAR(30) NOT NULL,
    "geoCellRes12" VARCHAR(30) NOT NULL,
    "geoCellRes13" VARCHAR(30) NOT NULL,
    "geoCellRes14" VARCHAR(30) NOT NULL,
    "geoCellRes15" VARCHAR(30) NOT NULL,
    "bbox" JSONB,
    "accessPoints" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "places_name_idx" ON "places" USING HASH ("name");

-- CreateIndex
CREATE INDEX "locations_geoCellRes0_idx" ON "locations" USING HASH ("geoCellRes0");

-- CreateIndex
CREATE INDEX "locations_geoCellRes1_idx" ON "locations" USING HASH ("geoCellRes1");

-- CreateIndex
CREATE INDEX "locations_geoCellRes2_idx" ON "locations" USING HASH ("geoCellRes2");

-- CreateIndex
CREATE INDEX "locations_geoCellRes3_idx" ON "locations" USING HASH ("geoCellRes3");

-- CreateIndex
CREATE INDEX "locations_geoCellRes4_idx" ON "locations" USING HASH ("geoCellRes4");

-- CreateIndex
CREATE INDEX "locations_geoCellRes5_idx" ON "locations" USING HASH ("geoCellRes5");

-- CreateIndex
CREATE INDEX "locations_geoCellRes6_idx" ON "locations" USING HASH ("geoCellRes6");

-- CreateIndex
CREATE INDEX "locations_geoCellRes7_idx" ON "locations" USING HASH ("geoCellRes7");

-- CreateIndex
CREATE INDEX "locations_geoCellRes8_idx" ON "locations" USING HASH ("geoCellRes8");

-- CreateIndex
CREATE INDEX "locations_geoCellRes9_idx" ON "locations" USING HASH ("geoCellRes9");

-- CreateIndex
CREATE INDEX "locations_geoCellRes10_idx" ON "locations" USING HASH ("geoCellRes10");

-- CreateIndex
CREATE INDEX "locations_geoCellRes11_idx" ON "locations" USING HASH ("geoCellRes11");

-- CreateIndex
CREATE INDEX "locations_geoCellRes12_idx" ON "locations" USING HASH ("geoCellRes12");

-- CreateIndex
CREATE INDEX "locations_geoCellRes13_idx" ON "locations" USING HASH ("geoCellRes13");

-- CreateIndex
CREATE INDEX "locations_geoCellRes14_idx" ON "locations" USING HASH ("geoCellRes14");

-- CreateIndex
CREATE INDEX "locations_geoCellRes15_idx" ON "locations" USING HASH ("geoCellRes15");

-- CreateIndex
CREATE UNIQUE INDEX "locations_geoCellRes0_geoCellRes1_geoCellRes2_geoCellRes3_g_key" ON "locations"("geoCellRes0", "geoCellRes1", "geoCellRes2", "geoCellRes3", "geoCellRes4", "geoCellRes5", "geoCellRes6", "geoCellRes7", "geoCellRes8", "geoCellRes9", "geoCellRes10", "geoCellRes11", "geoCellRes12", "geoCellRes13", "geoCellRes14", "geoCellRes15");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_visit_histories" ADD CONSTRAINT "user_visit_histories_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_visit_histories" ADD CONSTRAINT "user_visit_histories_placeID_fkey" FOREIGN KEY ("placeID") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_location_paths" ADD CONSTRAINT "user_location_paths_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_placeID_fkey" FOREIGN KEY ("placeID") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_postID_fkey" FOREIGN KEY ("postID") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_postID_fkey" FOREIGN KEY ("postID") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_likerID_fkey" FOREIGN KEY ("likerID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postID_fkey" FOREIGN KEY ("postID") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

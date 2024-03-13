-- CreateEnum
CREATE TYPE "Ratings" AS ENUM ('sangat_buruk', 'buruk', 'cukup_baik', 'baik', 'sangat_baik');

-- CreateTable
CREATE TABLE "users" (
    "email" VARCHAR(255) NOT NULL,
    "no_hp" VARCHAR(12) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT 'http://localhost:2008/images/foto-profile-default.jpeg',
    "foto_profile" VARCHAR(1500) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "verify" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "alamat" (
    "email_user" VARCHAR(255) NOT NULL,
    "village" VARCHAR(255) NOT NULL,
    "subdistrick" VARCHAR(255) NOT NULL,
    "regency" VARCHAR(255) NOT NULL,
    "province" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "kode_pos" INTEGER NOT NULL,

    CONSTRAINT "alamat_pkey" PRIMARY KEY ("email_user")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" INTEGER NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "deks" VARCHAR(255) NOT NULL,
    "thumbnail" VARCHAR(1500) NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alamat_destination" (
    "id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "village" VARCHAR(500) NOT NULL,
    "subdistrick" VARCHAR(500) NOT NULL,
    "regency" VARCHAR(500) NOT NULL,
    "province" VARCHAR(500) NOT NULL,
    "country" VARCHAR(500) NOT NULL,

    CONSTRAINT "alamat_destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_gallery" (
    "id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "image" VARCHAR(1500) NOT NULL,

    CONSTRAINT "destination_gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_feature" (
    "id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "feature_id" INTEGER NOT NULL,

    CONSTRAINT "destination_feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature" (
    "id" INTEGER NOT NULL,
    "nama" VARCHAR(1500) NOT NULL,
    "detail" VARCHAR(1500) NOT NULL,

    CONSTRAINT "feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_reviews" (
    "id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "comment" VARCHAR(1500) NOT NULL,
    "review_by" VARCHAR(1500) NOT NULL,
    "ratings" "Ratings" NOT NULL,

    CONSTRAINT "destination_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_reviews_image" (
    "id" INTEGER NOT NULL,
    "destination_reviews_id" INTEGER NOT NULL,
    "image" VARCHAR(1500) NOT NULL,

    CONSTRAINT "destination_reviews_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "my_favorite" (
    "id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,

    CONSTRAINT "my_favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "my_destination" (
    "id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,

    CONSTRAINT "my_destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weather" (
    "id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "detail" VARCHAR(2500) NOT NULL,

    CONSTRAINT "weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" INTEGER NOT NULL,
    "user_email" VARCHAR(255) NOT NULL,
    "title" VARCHAR(600) NOT NULL,
    "deks" VARCHAR(2500) NOT NULL,
    "categories_id" INTEGER NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_categories" (
    "id" INTEGER NOT NULL,
    "nama" VARCHAR(1500) NOT NULL,

    CONSTRAINT "notification_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_read" (
    "id" INTEGER NOT NULL,
    "notification_id" INTEGER NOT NULL,
    "user_email" VARCHAR(255) NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notification_read_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_transportation" (
    "id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "trasnporation_id" INTEGER NOT NULL,

    CONSTRAINT "destination_transportation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportation" (
    "id" INTEGER NOT NULL,
    "transportation" VARCHAR(1500) NOT NULL,
    "seats" INTEGER NOT NULL,
    "fasilty_detail" VARCHAR(1500) NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "transportation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_no_hp_key" ON "users"("no_hp");

-- CreateIndex
CREATE UNIQUE INDEX "alamat_destination_destination_id_key" ON "alamat_destination"("destination_id");

-- AddForeignKey
ALTER TABLE "alamat" ADD CONSTRAINT "alamat_email_user_fkey" FOREIGN KEY ("email_user") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alamat_destination" ADD CONSTRAINT "alamat_destination_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_gallery" ADD CONSTRAINT "destination_gallery_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_feature" ADD CONSTRAINT "destination_feature_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_feature" ADD CONSTRAINT "destination_feature_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_reviews" ADD CONSTRAINT "destination_reviews_review_by_fkey" FOREIGN KEY ("review_by") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_reviews" ADD CONSTRAINT "destination_reviews_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_reviews_image" ADD CONSTRAINT "destination_reviews_image_destination_reviews_id_fkey" FOREIGN KEY ("destination_reviews_id") REFERENCES "destination_reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_favorite" ADD CONSTRAINT "my_favorite_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_destination" ADD CONSTRAINT "my_destination_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weather" ADD CONSTRAINT "weather_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "notification_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_read" ADD CONSTRAINT "notification_read_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_read" ADD CONSTRAINT "notification_read_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_transportation" ADD CONSTRAINT "destination_transportation_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_transportation" ADD CONSTRAINT "destination_transportation_trasnporation_id_fkey" FOREIGN KEY ("trasnporation_id") REFERENCES "transportation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

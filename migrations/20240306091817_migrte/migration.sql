-- CreateEnum
CREATE TYPE "Ratings" AS ENUM ('sangat_buruk', 'buruk', 'cukup_baik', 'baik', 'sangat_baik');

-- CreateTable
CREATE TABLE "users" (
    "email" TEXT NOT NULL,
    "no_hp" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "foto_profile" TEXT NOT NULL,
    "alamat_id" INTEGER NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "alamat" (
    "alamat_id" INTEGER NOT NULL,
    "village" TEXT NOT NULL,
    "subdistrick" TEXT NOT NULL,
    "regency" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "kode_pos" INTEGER NOT NULL,

    CONSTRAINT "alamat_pkey" PRIMARY KEY ("alamat_id")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "deks" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alamat_destination" (
    "id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "village" TEXT NOT NULL,
    "subdistrick" TEXT NOT NULL,
    "regency" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "alamat_destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_gallery" (
    "id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

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
    "nama" TEXT NOT NULL,
    "detail" TEXT NOT NULL,

    CONSTRAINT "feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_reviews" (
    "id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "review_by" TEXT NOT NULL,
    "ratings" "Ratings" NOT NULL,

    CONSTRAINT "destination_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_reviews_image" (
    "id" INTEGER NOT NULL,
    "destination_reviews_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

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
    "detail" TEXT NOT NULL,

    CONSTRAINT "weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" INTEGER NOT NULL,
    "user_email" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "deks" TEXT NOT NULL,
    "categories_id" INTEGER NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_categories" (
    "id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "notification_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_read" (
    "id" INTEGER NOT NULL,
    "notification_id" INTEGER NOT NULL,
    "user_email" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL,

    CONSTRAINT "notification_read_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_no_hp_key" ON "users"("no_hp");

-- CreateIndex
CREATE UNIQUE INDEX "users_alamat_id_key" ON "users"("alamat_id");

-- CreateIndex
CREATE UNIQUE INDEX "alamat_destination_destination_id_key" ON "alamat_destination"("destination_id");

-- AddForeignKey
ALTER TABLE "alamat" ADD CONSTRAINT "alamat_alamat_id_fkey" FOREIGN KEY ("alamat_id") REFERENCES "users"("alamat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

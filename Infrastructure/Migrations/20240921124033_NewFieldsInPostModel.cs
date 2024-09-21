using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class NewFieldsInPostModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CityHolidaysName",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CityOfDeparture",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Comments",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CountryHolidaysName",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOffer",
                table: "Posts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Posts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Food",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "GoogleOpinions",
                table: "Posts",
                type: "decimal(18,4)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "HotelHolidaysName",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "HotelRating",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Posts",
                type: "decimal(18,4)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "RegionHolidaysName",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Posts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TravelAgency",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "TravelAgencyOpinions",
                table: "Posts",
                type: "decimal(18,4)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TripAdvisorOpinions",
                table: "Posts",
                type: "decimal(18,4)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "isPremium",
                table: "Posts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CityHolidaysName",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "CityOfDeparture",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Comments",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "CountryHolidaysName",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "DateOffer",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Food",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "GoogleOpinions",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "HotelHolidaysName",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "HotelRating",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "RegionHolidaysName",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "TravelAgency",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "TravelAgencyOpinions",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "TripAdvisorOpinions",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "isPremium",
                table: "Posts");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantListings.Data.Migrations
{
    public partial class BasicIndexing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_Description",
                table: "Restaurants",
                column: "Description");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_Name",
                table: "Restaurants",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_Tags",
                table: "Restaurants",
                column: "Tags");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_VeganFriendly",
                table: "Restaurants",
                column: "VeganFriendly");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Restaurants_Description",
                table: "Restaurants");

            migrationBuilder.DropIndex(
                name: "IX_Restaurants_Name",
                table: "Restaurants");

            migrationBuilder.DropIndex(
                name: "IX_Restaurants_Tags",
                table: "Restaurants");

            migrationBuilder.DropIndex(
                name: "IX_Restaurants_VeganFriendly",
                table: "Restaurants");
        }
    }
}

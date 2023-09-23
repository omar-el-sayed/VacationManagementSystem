using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VacationManagementSystem.Db.Migrations
{
    /// <inheritdoc />
    public partial class AddApproved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f6697b8f-659e-442d-a12f-e95c68c206c3");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Vacations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "32d929c2-2740-4a79-8a04-6234462c2e96",
                column: "ConcurrencyStamp",
                value: "7af9d8a9-5a8b-48ff-b7b5-078c9c5e0e52");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "992e93c0-42a6-4f32-9a07-32f6ec2a6f6a", "936e733c-a522-4d1e-898e-c2ec521db903", "User", "USER" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "673f1e40-23fc-4ca1-9317-553be38732a7",
                columns: new[] { "BirthDate", "ConcurrencyStamp", "HireDate" },
                values: new object[] { new DateTime(2023, 9, 23, 13, 41, 0, 225, DateTimeKind.Local).AddTicks(3078), "0da40c29-2471-4254-ad7b-ad9dc8c93c03", new DateTime(2023, 9, 23, 13, 41, 0, 225, DateTimeKind.Local).AddTicks(3100) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "992e93c0-42a6-4f32-9a07-32f6ec2a6f6a");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Vacations");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "32d929c2-2740-4a79-8a04-6234462c2e96",
                column: "ConcurrencyStamp",
                value: "84c874ae-0106-4b06-9856-8af75faa99e8");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f6697b8f-659e-442d-a12f-e95c68c206c3", "5d882c91-77c3-4f0f-b407-9b5fcb736bb2", "User", "USER" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "673f1e40-23fc-4ca1-9317-553be38732a7",
                columns: new[] { "BirthDate", "ConcurrencyStamp", "HireDate" },
                values: new object[] { new DateTime(2023, 9, 23, 12, 32, 33, 144, DateTimeKind.Local).AddTicks(5278), "d9e9bb17-af26-462b-b16a-0b0aae301a5e", new DateTime(2023, 9, 23, 12, 32, 33, 144, DateTimeKind.Local).AddTicks(5293) });
        }
    }
}

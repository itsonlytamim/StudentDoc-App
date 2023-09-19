using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentDocHub_App.Migrations
{
    /// <inheritdoc />
    public partial class ModifyingDocumentsDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FolderName",
                table: "Documents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FolderName",
                table: "Documents");
        }
    }
}

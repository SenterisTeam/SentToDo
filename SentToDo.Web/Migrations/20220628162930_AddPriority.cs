using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SentToDo.Web.Migrations
{
    public partial class AddPriority : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "ToDoTasks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "ToDoTasks");
        }
    }
}

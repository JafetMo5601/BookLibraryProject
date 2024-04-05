using System;
using Microsoft.EntityFrameworkCore;

namespace BookLibrary.Data
{
	internal class Seed
	{
        internal static void SeedData(BooksDbContext dbContext)
        {
            try
            {
                // Check if the database has been seeded already
                if (dbContext.Books.Any())
                {
                    Console.WriteLine("Database already seeded.");
                    return; // Exit if already seeded
                }

                // Load SQL script from file
                var sqlScript = File.ReadAllText("data.sql");

                // Execute SQL script
                dbContext.Database.ExecuteSqlRaw(sqlScript);

                Console.WriteLine("Database seeded successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error seeding database: {ex.Message}");
            }
        }
    }

    internal static class DbInitializerExtension
    {
        public static IApplicationBuilder UseItToSeedSqlServer(this IApplicationBuilder app)
        {
            ArgumentNullException.ThrowIfNull(app, nameof(app));

            using var scope = app.ApplicationServices.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var context = services.GetRequiredService<BooksDbContext>();
                Seed.SeedData(context);
            }
            catch (Exception ex)
            {

            }

            return app;
        }
    }
}


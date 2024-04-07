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
                if (dbContext.Books.Any())
                {
                    Console.WriteLine("Database already seeded.");
                    return;
                }

                var sqlScript = File.ReadAllText("data.sql");

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


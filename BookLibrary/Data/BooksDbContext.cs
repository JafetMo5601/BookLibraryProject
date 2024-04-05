using Microsoft.EntityFrameworkCore;

namespace BookLibrary.Data
{
    public class BooksDbContext: DbContext
    {
        public DbSet<Book> Books { get; set; }

        public BooksDbContext(DbContextOptions<BooksDbContext> options) : base(options)
        {
        }
    }
}


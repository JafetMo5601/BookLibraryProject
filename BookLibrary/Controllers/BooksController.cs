using BookLibrary.Data;
using BookLibrary.EventHandler;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace BookLibrary.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController: ControllerBase
	{
         private readonly IEventHandler<BookRegisteredEvent> _bookRegisteredEventHandler;
        private readonly BooksDbContext _context;

        public BooksController(BooksDbContext context, IEventHandler<BookRegisteredEvent> bookRegisteredEventHandler)
        {
            _bookRegisteredEventHandler = bookRegisteredEventHandler;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<object>> GetBooks([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var totalCount = await _context.Books.CountAsync();
            var books = await _context.Books
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new
            {
                totalCount,
                books
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            try {
                _context.Books.Add(book);
                await _context.SaveChangesAsync();
                await _bookRegisteredEventHandler.HandleEventAsync(new BookRegisteredEvent{ Title = book.title, Category = book.category});

                return CreatedAtAction(nameof(GetBook), new { id = book.book_id }, book);
            } catch (Exception e) {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.book_id)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.book_id == id);
        }
    }
}


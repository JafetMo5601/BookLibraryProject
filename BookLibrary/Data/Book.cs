using System;
using System.ComponentModel.DataAnnotations;

namespace BookLibrary.Data
{
	public class Book
	{
        [Key]
        public int book_id { get; set; }

        [Required]
        public string title { get; set; }

        [Required]
        public string first_name { get; set; }

        [Required]
        public string last_name { get; set; }

        [Required]
        public int total_copies { get; set; }

        [Required]
        public int copies_in_use { get; set; }

        [Required]
        public string type { get; set; }

        [Required]
        public string isbn { get; set; }

        [Required]
        public string category { get; set; }
    }
}
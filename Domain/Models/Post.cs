using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wakacyjny_last.Domain.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        public int NumberOfPerson { get; set; }
        public byte[] HolidayImage { get; set; }
        public string UserId { get; set; }
        public User User { get; set; } = default!;
    }
}

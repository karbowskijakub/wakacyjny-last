using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wakacyjny_last.Domain.Models
{
    public class PaymentHistory
    {
        [Key]
        public int PaymentId { get; set; }
        public DateTimeOffset PaymentDate { get; set; }
        public string UserId { get; set; }
        public User User { get; set; } = default!;
    }
}

using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace wakacyjny_last.Domain.Models
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; } 
        public string? LastName { get; set; }  
        public bool Terms { get; set; }
        public string? NickName { get; set; }
        public DateTime RegisterDate { get; set; }
        public DateTimeOffset LastTimeLogin { get; set; }
        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<PaymentHistory> Payments { get; set; } = new List<PaymentHistory>();
    }
}
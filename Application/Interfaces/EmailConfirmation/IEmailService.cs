using wakacyjny_last.Domain.Email;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wakacyjny_last.Application.Interfaces.EmailConfirmation
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailRequest request);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace wakacyjny_last.Infrastructure.Resources.Templates
{
    public static class ResetPasswordTemplate
    {
        public static string GeneratePasswordResetEmailBody(string firstName, string resetPasswordUrl)
        {
            return $@"
                <html>
                <body>
                    <p>Cześć {HtmlEncoder.Default.Encode(firstName)},</p>
                    <p>Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta. Jeśli to Ty zgłosiłeś tę prośbę, kliknij poniższy link, aby zresetować swoje hasło:</p>
                    <p><a href='{HtmlEncoder.Default.Encode(resetPasswordUrl)}'>Kliknij tutaj, aby zresetować hasło</a></p>
                    <p>Jeśli nie zgłaszałeś prośby o zresetowanie hasła, zignoruj tę wiadomość. Twoje hasło pozostanie bez zmian.</p>
                    <p>Pozdrawiamy,<br>Zespół TypujemyRazem.</br></p>
                </body>
                </html>";
        }
    }
}

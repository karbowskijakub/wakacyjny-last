using System.Text.Encodings.Web;

namespace wakacyjny_last.Infrastructure.Resources.Templates
{
    public static class EmailConfirmationTemplate
    {
        public static string GenerateConfirmationEmailBody(string firstName, string confirmEmailUrl)
        {
            return $@"
                <html>
                <body>
                    <p>Cześć {HtmlEncoder.Default.Encode(firstName)},</p>
                    <p>Dziękujemy za założenie konta! Aby zakończyć proces rejestracji, prosimy o potwierdzenie swojego adresu e-mail, klikając w poniższy link:</p>
                    <p><a href='{HtmlEncoder.Default.Encode(confirmEmailUrl)}'>Kliknij tutaj, aby potwierdzić swój e-mail</a></p>
                    <p>Jeśli nie rejestrowałeś się na naszej stronie, zignoruj ten e-mail.</p>
                    <p>Pozdrawiamy,<br>Zespół TypujemyRazem.</br></p>
                </body>
                </html>";
        }
    }
}

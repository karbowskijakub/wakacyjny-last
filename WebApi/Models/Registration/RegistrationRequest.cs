namespace wakacyjny_last.WebApi.Models.Registration
{
    public class RegistrationRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required bool Terms { get; set; }
    }
}

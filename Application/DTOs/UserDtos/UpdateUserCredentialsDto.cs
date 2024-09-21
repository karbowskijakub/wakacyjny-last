namespace wakacyjny_last.Application.DTOs.UserDtos
{
    public record UpdateUserCredentialsDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime RegisterDate { get; set; }
    }
}

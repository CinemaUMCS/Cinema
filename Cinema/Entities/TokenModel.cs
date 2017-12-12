namespace Cinema.Entities
{
    public class TokenModel
    {
        public string Token { get; set; }
        public string Role { get; set; }
        public long Expires { get; set; }
    }
}
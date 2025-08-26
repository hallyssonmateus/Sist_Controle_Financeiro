namespace ControleFinanceiro.API.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Senha { get; set; } = null!;
    }
}

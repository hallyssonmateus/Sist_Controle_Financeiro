using ControleFinanceiro.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleFinanceiro.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Usuario> Usuarios => Set<Usuario>();
    }
}

using ControleFinanceiro.API.Data;
using ControleFinanceiro.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ControleFinanceiro.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController: ControllerBase
    {
        private readonly AppDbContext _db;

        public UsuariosController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetAll()
        {
            return await _db.Usuarios.ToListAsync();
        }

        // GET: api/usuarios/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Usuario>> GetById(int id)
        {
            var usuario = await _db.Usuarios.FindAsync(id);
            if (usuario == null) return NotFound();
            return usuario;
        }

        // POST: api/usuarios
        [HttpPost]
        public async Task<ActionResult<Usuario>> Create([FromBody] Usuario usuario)
        {
            _db.Usuarios.Add(usuario);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = usuario.Id }, usuario);
        }

        // PUT: api/usuarios/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, Usuario usuario)
        {
            if (id != usuario.Id) return BadRequest("ID do corpo diferente do ID da rota.");

            var exists = await _db.Usuarios.AnyAsync(u => u.Id == id);
            if (!exists) return NotFound();

            _db.Entry(usuario).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return Ok(usuario);
        }

        // DELETE: api/usuarios/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var usuario = await _db.Usuarios.FindAsync(id);
            if (usuario == null) return NotFound();

            _db.Usuarios.Remove(usuario);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}

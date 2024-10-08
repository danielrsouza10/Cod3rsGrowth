using Dominio.Exceptions;
using Dominio.Filtros;
using Dominio.Modelos;
using LinqToDB;
using Microsoft.Data.SqlClient;
using Testes.Interfaces;

namespace Infra.Repositorios;
public class RepositorioRaca : IRepositorio<Raca>
{
    private readonly DbOSenhorDosAneis _db;
    public RepositorioRaca (DbOSenhorDosAneis db) => _db = db;
    public IEnumerable<Raca> ObterTodos(Filtro filtro)
    {
        var racas = from r in _db.Raca select r;

        if(filtro == null) return racas.ToList();

        if (!string.IsNullOrEmpty(filtro.NomeDaRaca)) racas = from r in racas where r.Nome.ToLower().Contains(filtro.NomeDaRaca.ToLower()) select r;
        if (!filtro.EstaExtinta.Equals(null)) racas = from r in racas where r.EstaExtinta == filtro.EstaExtinta select r;

        return racas.ToList();
    }
    public Raca ObterPorId(int id)
    {
        var racas = _db.Raca;
        return racas.FirstOrDefault(r => r.Id == id);
    }
    public int Criar(Raca raca) => _db.InsertWithInt32Identity(raca);
    public Raca Editar(Raca raca)
    {
        var racas = _db.Raca.ToList();
        _db.Update(raca);
        return racas.FirstOrDefault(r => r.Nome == raca.Nome);
    }
    public void Deletar(int id)
    {
        try
        {
            _db.Raca
                .Where(r => r.Id == id)
                .Delete();
        }
        catch (SqlException ex) { 
            throw new RegistroComDepententesException("N�o � poss�vel excluir uma ra�a com personagens", ex);
        }
    }
    public bool VerificarNomeNoDb(string nome, int? id = null)
    {
        if (id.HasValue)
        {
            return _db.Raca
                        .Any(r => r.Nome.ToLower() == nome.ToLower() && r.Id != id.Value);
        }
        return _db.Raca
                        .Any(r => r.Nome.ToLower().Equals(nome.ToLower()));
    }
}
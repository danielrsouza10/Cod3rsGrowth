﻿using Dominio.Modelos;
using System;
using Dominio.Filtros;
using Testes.Interfaces;
using Testes.Singleton;

namespace Testes.Repositorios
{
    public class RepositorioMockRacas : IRepositorio<Raca>
    {

        private List<Raca> _listaDeRacas = RacaSingleton.Instance.Racas;

        public IEnumerable<Raca> ObterTodos(Filtro filtro) => _listaDeRacas;
        public Raca ObterPorId(int id) => _listaDeRacas.Find(r => r.Id == id) ?? throw new Exception("O ID informado não existe");

        public int Criar(Raca raca)
        {
            const int IncrementoParaONovoId = 1;
            raca.Id = _listaDeRacas.Any() ? _listaDeRacas.Max(r => r.Id) + IncrementoParaONovoId : IncrementoParaONovoId;
            _listaDeRacas.Add(raca);
            return raca.Id;
        }

        public Raca Editar(Raca raca)
        {
            var racaExistente = ObterPorId(raca.Id);
            if (raca.Nome != null) racaExistente.Nome = raca.Nome;
            racaExistente.HabilidadeRacial = raca.HabilidadeRacial;
            racaExistente.LocalizacaoGeografica = raca.LocalizacaoGeografica;
            return racaExistente;
        }
        public void Deletar(int id) => _listaDeRacas.Remove(ObterPorId(id));
        public bool VerificarNomeNoDb(string nome, int? id = null)
        {
            if (id.HasValue)
            {
                return _listaDeRacas
                            .Any(p => p.Nome.ToLower() == nome.ToLower() && p.Id != id.Value);
            }
            return _listaDeRacas
                            .Any(p => p.Nome.ToLower().Equals(nome.ToLower()));
        }
    }
}
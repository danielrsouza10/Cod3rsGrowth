﻿using Dominio.Modelos;
using System;
using Testes.Interfaces;

namespace Testes.Repositorios
{
    public class RepositorioMockRacas : IRepositorioMock<Raca>
    {

        public List<Raca> ListaDeRacas { get; }
        public RepositorioMockRacas()
        {

            ListaDeRacas = new List<Raca>()
        {
            new Raca(1, "Humano"),
            new Raca(2, "Elfo"),
            new Raca(3, "Anão"),
            new Raca(4, "Maiar"),
            new Raca(5, "Hobbit")
        };
        }

        public List<Raca> ObterTodos()
        {
            throw new NotImplementedException();
        }
    }
}
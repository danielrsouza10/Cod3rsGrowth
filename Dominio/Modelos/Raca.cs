﻿
namespace Dominio.Modelos
{
    public class Raca
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string? LocalizacaoGeografica { get; set; }
        public string? HabilidadeRacial { get; set; }

        public Raca(int id, string nome)
        {
            Id = id;
            Nome = nome;
        }

        public static implicit operator Raca(string v)
        {
            throw new NotImplementedException();
        }
    }
}


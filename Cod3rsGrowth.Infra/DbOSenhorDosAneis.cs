﻿using Dominio.Modelos;
using LinqToDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Infra
{
    public class DbOSenhorDosAneis : LinqToDB.Data.DataConnection
    {
        public DbOSenhorDosAneis(DataOptions options) : base(options) {}
        public ITable<Personagem> Personagem => this.GetTable<Personagem>();
        public ITable<Raca> Raca => this.GetTable<Raca>();
    }
}

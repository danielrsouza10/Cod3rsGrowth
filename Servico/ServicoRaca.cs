﻿using Dominio.Interfaces;
using Dominio.Modelos;
using Dominio.Validacao;
using FluentValidation;
using Testes.Interfaces;
namespace Dominio.Servicos
{
    public class ServicoRaca : IServicoRaca
    {
        private readonly IRepositorioMock<Raca> _servicoRepositorio;
        private readonly RacaValidacao _racaValidacao;

        public ServicoRaca(IRepositorioMock<Raca> servicoRepositorio, RacaValidacao racaValidacao)
        {
            _servicoRepositorio = servicoRepositorio;
            _racaValidacao = racaValidacao;
        }

        public List<Raca> ObterTodos() => _servicoRepositorio.ObterTodos();
        public Raca ObterPorId(int id) => id > 0 ? _servicoRepositorio.ObterPorId(id) : throw new Exception("O ID deve ser maior que zero");
        public void Deletar(int id) => _servicoRepositorio.Deletar(id);
        public void Criar(Raca raca)
        {
            var resultadoValidacao = _racaValidacao
                .Validate(raca, options => options.IncludeRuleSets("Criacao"));
            if (!resultadoValidacao.IsValid) 
            {
                var erros = "";
                const string SerapacaoEntreErros = ". ";
                foreach (var falha in resultadoValidacao.Errors)
                {
                    erros += falha.ErrorMessage + SerapacaoEntreErros;
                }
                throw new Exception(erros);
            }
            _servicoRepositorio.Criar(raca);
        }
        public Raca Editar(Raca raca)
        {
            var resultadoValidacao = _racaValidacao
                .Validate(raca, options => options.IncludeRuleSets("Edicao"));
            if (!resultadoValidacao.IsValid) 
            {
                var erros = "";
                const string SerapacaoEntreErros = ". ";
                foreach (var falha in resultadoValidacao.Errors)
                {
                    erros += falha.ErrorMessage + SerapacaoEntreErros;
                }
                throw new Exception(erros);
            }
            return _servicoRepositorio.Editar(raca);
        }
    }
}


﻿
using Dominio.Filtros;
using Dominio.Modelos;
using Dominio.Validacao;
using FluentValidation;
using Testes.Interfaces;
namespace Servico.Servicos
{
    public class ServicoPersonagem
    {
        private readonly IRepositorio<Personagem> _servicoRepositorio;
        private readonly PersonagemValidacao _personagemValidacao;

        public ServicoPersonagem(IRepositorio<Personagem> servicoRepositorio, PersonagemValidacao personagemValidacao)
        {
            _servicoRepositorio = servicoRepositorio;
            _personagemValidacao = personagemValidacao;
        }
        public IEnumerable<Personagem> ObterTodos(Filtro filtro) => _servicoRepositorio.ObterTodos(filtro);
        public void Deletar(int id) => _servicoRepositorio.Deletar(id);
        public Personagem ObterPorId(int id)
        {
            return _servicoRepositorio.ObterPorId(id);
        }
        public int Criar(Personagem personagem)
        {
            var resultadoValidacao = _personagemValidacao
                .Validate(personagem, options => options.IncludeRuleSets("Criacao"));
            if (!resultadoValidacao.IsValid)
            {
                throw new ValidationException(resultadoValidacao.Errors);
            }
            return _servicoRepositorio.Criar(personagem);
        }
        public Personagem Editar(Personagem personagem)
        {
            var resultadoValidacao = _personagemValidacao
                .Validate(personagem, options => options.IncludeRuleSets("Edicao"));
            if (!resultadoValidacao.IsValid)
            {
                throw new ValidationException(resultadoValidacao.Errors);
            }
            return _servicoRepositorio.Editar(personagem);
        }
    }
}

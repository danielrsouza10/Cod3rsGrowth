sap.ui.define(
  [
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/matchers/PropertyStrictEquals",
  ],
  function (Opa5, Press, EnterText, PropertyStrictEquals) {
    "use strict";

    const NOME_VIEW = "CriarRaca",
      NOME_VIEW_HOME = "Home",
      ID_PAGINA = "paginaCriarRaca",
      ID_INPUT_NOME = "inputNome",
      ID_INPUT_LOCALIZACAO_GEOGRAFICA = "inputLocalizacaoGeografica",
      ID_INPUT_HABILIDADE_RACIAL = "inputHabilidadeRacial",
      ID_RADIO_BUTTON_EXTINTA = "radioBtnExtinta",
      ID_RADIO_BUTTON_NAO_EXTINTA = "radioBtnNaoExtinta";
    Opa5.createPageObjects({
      naPaginaDeCriarRaca: {
        actions: {
          aTelaFoiCarregadaCorretamente: function () {
            return this.waitFor({
              viewName: NOME_VIEW,
              success: () =>
                Opa5.assert.ok(true, "A tela foi carregada corretamente"),
              errorMessage: "A tela não foi carregada corretamente",
            });
          },
          euDigitoUmNomeNoInputField: function (nomeRaca) {
            return this.waitFor({
              id: ID_INPUT_NOME,
              viewName: NOME_VIEW,
              actions: new EnterText({
                text: nomeRaca,
              }),
              errorMessage: "Input não encontrado",
            });
          },
          euDigitoUmaLocalizacaoGeograficaNoInputField: function (
            localizacaoGeografica
          ) {
            return this.waitFor({
              id: ID_INPUT_LOCALIZACAO_GEOGRAFICA,
              viewName: NOME_VIEW,
              actions: new EnterText({
                text: localizacaoGeografica,
              }),
              errorMessage:
                "Não foi possível inserir um valor para a localização geográfica",
            });
          },
          euDigitoUmaHabilidadeRacialNoInputField: function (habilidadeRacial) {
            return this.waitFor({
              id: ID_INPUT_HABILIDADE_RACIAL,
              viewName: NOME_VIEW,
              actions: new EnterText({
                text: habilidadeRacial,
              }),
              errorMessage:
                "Não foi possível inserir um valor para a habilidade racial",
            });
          },
          euSelecionoCondicaoExinta: function () {
            return this.waitFor({
              id: ID_RADIO_BUTTON_EXTINTA,
              viewName: NOME_VIEW,
              actions: new Press(),
              errorMessage: "Não foi possível selecionar o box 'Vivo'",
            });
          },
          euSelecionoCondicaoNaoExtinta: function () {
            return this.waitFor({
              id: ID_RADIO_BUTTON_NAO_EXTINTA,
              viewName: NOME_VIEW,
              actions: new Press(),
              errorMessage: "Não foi possível selecionar o box 'Morto'",
            });
          },
          euPressionoOBotaoAdicionar: function () {
            return this.waitFor({
              controlType: "sap.m.Button",
              matchers: new PropertyStrictEquals({
                name: "type",
                value: "Accept",
              }),
              actions: new Press(),
              success: function () {
                Opa5.assert.ok(true, "O botão adicionar foi pressionado");
              },
              errorMessage: "Não foi possível encontrar o botao adicionar",
            });
          },
          euPressionoOBotaoCancelar: function () {
            return this.waitFor({
              controlType: "sap.m.Button",
              matchers: new PropertyStrictEquals({
                name: "type",
                value: "Reject",
              }),
              actions: new Press(),
              success: function () {
                Opa5.assert.ok(true, "O botão cancelar foi pressionado");
              },
              errorMessage: "Não foi possível encontrar o botao cancelar",
            });
          },
          euPressionoBotaoFechar: function () {
            return this.waitFor({
              searchOpenDialogs: true,
              controlType: "sap.m.Button",
              actions: new Press(),
              success: function () {
                Opa5.assert.ok(true, "O botão 'Fechar' foi pressionado");
              },
              errorMessage: "Não foi possível encontrar o botao 'Fechar'",
            });
          },
          euPressionoBotaoVoltar: function () {
            return this.waitFor({
              id: ID_PAGINA,
              viewName: NOME_VIEW,
              actions: new Press(),
              errorMessage:
                "Não foi possível encontrar o botão voltar na página",
            });
          },
        },
        assertions: {
          deveAparecerUmaMessageBoxDeErro: function () {
            return this.waitFor({
              searchOpenDialogs: true,
              controlType: "sap.m.Dialog",
              matchers: new PropertyStrictEquals({
                name: "title",
                value: "Erro ao criar raça",
              }),
              success: function () {
                Opa5.assert.ok(
                  true,
                  "Foi encontrada a MessageBox indicando um erro"
                );
              },
              errorMessage: "Não foi encontrada a MessageBox indicando um erro",
            });
          },
          deveAparecerUmaMessageBoxDeErroVindoDoServidor: function () {
            return this.waitFor({
              searchOpenDialogs: true,
              controlType: "sap.m.Dialog",
              matchers: new PropertyStrictEquals({
                name: "title",
                value: "Ocorreram um ou mais erros de validação",
              }),
              success: function () {
                Opa5.assert.ok(
                  true,
                  "Foi encontrada a MessageBox indicando um erro"
                );
              },
              errorMessage: "Não foi encontrada a MessageBox indicando um erro",
            });
          },
          aTelaHomeFoiCarregadaCorretamente: function () {
            return this.waitFor({
              viewName: NOME_VIEW_HOME,
              success: () =>
                Opa5.assert.ok(
                  true,
                  "A tela 'Home' foi carregada corretamente"
                ),
              errorMessage: "A tela 'Home' não foi carregada corretamente",
            });
          },
        },
      },
    });
  }
);
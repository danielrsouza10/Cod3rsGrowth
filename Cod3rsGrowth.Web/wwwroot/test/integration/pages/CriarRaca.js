sap.ui.define(
  [
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/matchers/PropertyStrictEquals",
    "sap/ui/test/matchers/Properties",
    "sap/ui/test/matchers/I18NText",
  ],
  function (
    Opa5,
    Press,
    EnterText,
    PropertyStrictEquals,
    Properties,
    I18NText
  ) {
    "use strict";

    const NOME_VIEW = "Raca.CriarRaca",
      NOME_VIEW_HOME = "Home.Home",
      ID_PAGINA = "paginaCriarRaca",
      ID_INPUT_NOME = "inputNome",
      ID_INPUT_LOCALIZACAO_GEOGRAFICA = "inputLocalizacaoGeografica",
      ID_INPUT_HABILIDADE_RACIAL = "inputHabilidadeRacial",
      ID_RADIO_BUTTON_EXTINTA = "radioBtnExtinta",
      ID_RADIO_BUTTON_NAO_EXTINTA = "radioBtnNaoExtinta";
    Opa5.createPageObjects({
      naPaginaDeCriarRaca: {
        actions: {
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
          euPressionoOkNaMessageBoxDeSucesso: function () {
            return this.waitFor({
              searchOpenDialogs: true,
              controlType: "sap.m.Button",
              matchers: new Properties({
                text: "OK",
              }),
              actions: new Press(),
              errorMessage:
                "Não foi possível pressionar o botão 'OK' para fechar o diálogo",
            });
          },
        },
        assertions: {
          aTelaFoiCarregadaCorretamente: function () {
            return this.waitFor({
              viewName: NOME_VIEW,
              success: () =>
                Opa5.assert.ok(true, "A tela foi carregada corretamente"),
              errorMessage: "A tela não foi carregada corretamente",
            });
          },
          deveAparecerUmaMessageBoxDeSucesso: function () {
            return this.waitFor({
              searchOpenDialogs: true,
              controlType: "sap.m.Dialog",
              matchers: new I18NText({
                propertyName: "title",
                key: "tituloDeBoxDeSucesso",
              }),
              success: function () {
                Opa5.assert.ok(
                  true,
                  "Foi encontrada a MessageBox indicando sucesso ao adicionar a raça"
                );
              },
              errorMessage:
                "Não foi encontrada a MessageBox indicando sucesso ao adicionar a raça",
            });
          },
          deveAparecerUmaMessageBoxDeErro: function () {
            return this.waitFor({
              searchOpenDialogs: true,
              controlType: "sap.m.Dialog",
              matchers: new I18NText({
                propertyName: "title",
                key: "tituloDeBoxDeErroDeCriacao",
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
          aTelaDeEdicaoFoiCarregadaCorretamente: function () {
            return this.waitFor({
              controlType: "sap.m.Page",
              matchers: new I18NText({
                propertyName: "title",
                key: "TituloPaginaEditarRaca",
              }),
              success: function (pagina) {
                Opa5.assert.ok(pagina, "O título da página está correto.");
              },
              errorMessage:
                "Não foi encontrado título correspondente ou não foi possível navegar até a página",
            });
          },
          oBotaoEditarTemONomeCorreto: function () {
            return this.waitFor({
              controlType: "sap.m.Button",
              matchers: new I18NText({
                propertyName: "text",
                key: "BotaoEditar",
              }),
              success: function (botao) {
                Opa5.assert.ok(
                  botao,
                  "O texto do botao na página está correto."
                );
              },
              errorMessage:
                "Não foi encontrado texto do botao correspondente ou não foi possível encontrar o botão em si",
            });
          },
        },
      },
    });
  }
);

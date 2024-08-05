sap.ui.define(
    [
        "sap/ui/test/Opa5",
        "sap/ui/test/matchers/AggregationLengthEquals",
        "sap/ui/test/matchers/I18NText",
        "sap/ui/test/matchers/Properties",
        "sap/ui/test/actions/Press",
        "sap/ui/test/actions/EnterText",

    ],
    function (Opa5, AggregationLengthEquals, I18NText, Properties, Press, EnterText) {
        "use strict";

        const NOME_VIEW = "ListaRacas",
            ID_PAGINA = "paginaListaDeRacas",
            ID_LISTA = "listaDeRacas",
            ID_SEARCH_FIELD = "searchFieldRacas",
            ID_BOTAO_RESET = "resetBtn",
            TITULO_DA_PAGINA = "O Senhor dos Anéis";
        Opa5.createPageObjects({
            naPaginaDaListaDeRacas: {
                actions: {
                    euApertoParaCarregarMaisItensDaListaDeRacas: function () {
                        return this.waitFor({
                            id: ID_LISTA,
                            viewName: NOME_VIEW,
                            actions: new Press(),
                            errorMessage: "A Lista de raças não tem a opção de listar mais itens",
                        });
                    },
                    euDigitoONomeDeUmaRacaNoSearchField: function (nomeDaRaca) {
                        return this.waitFor({
                            id: ID_SEARCH_FIELD,
                            viewName: NOME_VIEW,
                            actions: new EnterText({
                                text: nomeDaRaca
                            }),
                            errorMessage: "SearchField não encontrado."
                        });
                    },
                    euPressionoBotaoReset: function () {
                        return this.waitFor({
                            id: ID_BOTAO_RESET,
                            viewName: NOME_VIEW,
                            actions: new Press(),
                            errorMessage: "Não foi possível encontrar ou pressionar o botão reset"
                        });
                    },
                    euPressionoBotaoVoltar: function () {
                        return this.waitFor({
                            id: ID_PAGINA,
                            viewName: NOME_VIEW,
                            actions: new Press(),
                            errorMessage: "Não foi possível encontrar o botão voltar na página"
                        });
                    },
                },
                assertions: {
                    oTituloDaPaginaDeRacasDeveraSer: function () {
                        return this.waitFor({
                            success: function () {
                                return this.waitFor({
                                    id: ID_PAGINA,
                                    viewName: NOME_VIEW,
                                    matchers: new Properties({
                                        title: TITULO_DA_PAGINA,
                                    }),
                                    success: function (pagina) {
                                        Opa5.assert.ok(pagina, "O título da página está correto.");
                                    },
                                    errorMessage:
                                        "Não foi encontrado título correspondente a 'O Senhor dos Anéis' ou não foi possível navegar até a página",
                                });
                            },
                        });
                    },
                    aUrlDaPaginaDeRacasDeveraSer: function () {
                        return this.waitFor({
                            success: function () {
                                const hash = Opa5.getHashChanger().getHash();
                                Opa5.assert.strictEqual(
                                    hash,
                                    "racas",
                                    "Navegou para a pagina de racas"
                                );
                            },
                            errorMessage: "A URL é diferente da esperada",
                        });
                    },
                    aListaDeveApresentar10Racas: function () {
                        return this.waitFor({
                            id: ID_LISTA,
                            viewName: NOME_VIEW,
                            matchers: new AggregationLengthEquals({
                                name: "items",
                                length: 10,
                            }),
                            success: function () {
                                Opa5.assert.ok(true, "A lista contem 10 raças");
                            },
                            errorMessage:
                                "A lista nao contem 10 raças ou não foi possível verificar o seu tamanho",
                        });
                    },
                    aListaDeveApresentar5Racas: function () {
                        return this.waitFor({
                            id: ID_LISTA,
                            viewName: NOME_VIEW,
                            matchers: new AggregationLengthEquals({
                                name: "items",
                                length: 5,
                            }),
                            success: function () {
                                Opa5.assert.ok(true, "A lista contem 5 raças");
                            },
                            errorMessage:
                                "A lista nao contem 5 raças ou não foi possível verificar o seu tamanho",
                        });
                    },
                    aListaDeveApresentarApenas1Raca: function () {
                        return this.waitFor({
                            id: ID_LISTA,
                            viewName: NOME_VIEW,
                            matchers: new AggregationLengthEquals({
                                name: "items",
                                length: 1,
                            }),
                            success: function () {
                                Opa5.assert.ok(true, "A lista contem apenas 1 raça");
                            },
                            errorMessage:
                                "A lista nao contem apenas 1 raça ou não foi possível verificar o seu tamanho",
                        });
                    },
                    aListaDeveEstarVazia: function () {
                        return this.waitFor({
                            id: ID_LISTA,
                            viewName: NOME_VIEW,
                            matchers: new AggregationLengthEquals({
                                name: "items",
                                length: 0,
                            }),
                            success: function () {
                                Opa5.assert.ok(true, "A lista está vazia");
                            },
                            errorMessage:
                                "A lista nao está vazia ou não foi possível verificar o seu tamanho",
                        });
                    },
                },
            },
        });
    }
);
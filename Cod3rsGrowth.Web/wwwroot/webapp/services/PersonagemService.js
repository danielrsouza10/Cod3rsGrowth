sap.ui.define([], function () {
  "use strict";

  const URL_TODOS_OS_PERSONAGENS =
    "https://localhost:7244/api/Personagem/personagens";
  const URL_POST_PERSONAGEM =
    "https://localhost:7244/api/Personagem/personagem";

  return {
    obterTodos: async function (filtros) {
      let urlPersonagens = new URL(URL_TODOS_OS_PERSONAGENS);

      Object.keys(filtros).forEach((key) => {
        urlPersonagens.searchParams.append(key, filtros[key]);
      });

      try {
        const response = await fetch(urlPersonagens.href);
        if (!response.ok) {
          throw new Error("Sem resposta: " + response.statusText);
        }
        return response.json();
      } catch (erro) {
        throw erro;
      }
    },
    adicionarPersonagem: async function (personagem) {
      let urlPersonagens = new URL(URL_POST_PERSONAGEM);

      try {
        const response = await fetch(urlPersonagens.href, {
          method: "POST",
          body: JSON.stringify(personagem),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (!response.ok) {
          const erro = await response.json();
          throw erro;
        }
        return await response.json();
      } catch (erro) {
        throw erro;
      }
    },
  };
});

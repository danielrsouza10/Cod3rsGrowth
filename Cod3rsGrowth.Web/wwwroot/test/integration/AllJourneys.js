sap.ui.define(
  [
    "sap/ui/test/Opa5",
    "./arrangements/Startup",
    "./journeys/HomeJourney",
    "./journeys/ListaPersonagensJourney",
    "./journeys/ListaRacasJourney",
    "./journeys/CriarPersonagemJourney",
    "./journeys/CriarRacaJourney",
    "./journeys/EditarRacaJourney",
    "./journeys/DetalhesRacaJourney",
  ],
  function (Opa5, Startup) {
    "use strict";

    Opa5.extendConfig({
      arrangements: new Startup(),
      viewNamespace: "ui5.o_senhor_dos_aneis.App.",
      autoWait: true,
    });
  }
);

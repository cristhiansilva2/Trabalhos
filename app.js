
/**
 * Career Dreamer
 * Controle das etapas do formulário e envio do perfil.
 */

const formulario = document.querySelector("#form-perfil");
const botaoIniciar = document.querySelector("#btn-iniciar");
const cartaoFormulario = document.querySelector("#cartao-formulario");
const etapas = document.querySelectorAll(".etapa");
const mensagem = document.querySelector("#mensagem");

const campoNome = document.querySelector("#nome");
const campoHobbies = document.querySelector("#hobbies");
const campoInteresses = document.querySelector("#interesses");

let etapaAtual = 0;


/* MOSTRAR MENSAGENS */

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
  mensagem.hidden = false;
}

function limparMensagem() {
  mensagem.textContent = "";
  mensagem.hidden = true;
}


/* MOSTRAR UMA ETAPA */

function mostrarEtapa(indice) {
  if (indice < 0 || indice >= etapas.length) {
    return;
  }

  etapas.forEach((etapa, i) => {
    etapa.hidden = i !== indice;
  });

  etapaAtual = indice;
  limparMensagem();

  const primeiroCampo = etapas[indice].querySelector(
    "input, textarea"
  );

  if (primeiroCampo) {
    primeiroCampo.focus({ preventScroll: true });
  }
}


/* BOTÃO INICIAR */

botaoIniciar.addEventListener("click", () => {
  cartaoFormulario.hidden = false;

  mostrarEtapa(0);

  cartaoFormulario.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});


/* VALIDAR O CAMPO DA ETAPA ATUAL */

function etapaValida() {
  const campo = etapas[etapaAtual].querySelector(
    "input, textarea"
  );

  if (!campo) {
    return false;
  }

  const valor = campo.value.trim();

  if (valor === "") {
    campo.setCustomValidity("Preencha este campo para continuar.");
  } else {
    campo.setCustomValidity("");
  }

  if (!campo.checkValidity()) {
    campo.reportValidity();
    campo.focus();
    return false;
  }

  return true;
}


/* BOTÕES PRÓXIMO */

document.querySelectorAll("[data-proximo]").forEach((botao) => {
  botao.addEventListener("click", () => {
    if (!etapaValida()) {
      return;
    }

    mostrarEtapa(etapaAtual + 1);
  });
});


/* BOTÕES VOLTAR */

document.querySelectorAll("[data-voltar]").forEach((botao) => {
  botao.addEventListener("click", () => {
    mostrarEtapa(etapaAtual - 1);
  });
});


/* ENVIAR O FORMULÁRIO */

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  // Confere novamente a última etapa antes do envio.
  if (!etapaValida()) {
    return;
  }

  const perfil = {
    nome: campoNome.value.trim(),
    hobbies: campoHobbies.value.trim(),
    interesses: campoInteresses.value.trim()
  };

  // A URL está vazia no config.js fornecido.
  if (
    typeof CONFIG === "undefined" ||
    !CONFIG.API_URL ||
    !CONFIG.API_URL.trim()
  ) {
    mostrarMensagem(
      "Tente mais tarde: a API de carreiras ainda não foi configurada."
    );

    return;
  }

  /*
   * A API ainda precisa ser integrada.
   *
   * Antes de enviar o perfil, precisamos confirmar o endpoint,
   * o formato esperado pela API e a estrutura da resposta.
   * Não redirecionamos para resultado.html antes de receber
   * uma resposta válida.
   */

  mostrarMensagem(
    "A URL está configurada, mas a integração com a API ainda precisa ser concluída."
  );

  console.log(
    "Perfil preenchido. Integração pendente:",
    perfil
  );
});

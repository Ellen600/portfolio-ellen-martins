// ===== Menu dinâmico (celular): abre e fecha ao clicar no botão =====
const botaoMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu');

botaoMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', aberto);
});
// Fecha o menu ao escolher uma seção
menu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
  })
);

// ===== Tema claro/escuro =====
const botaoTema = document.getElementById('btn-tema');
const raiz = document.documentElement;

function aplicarTema(tema) {
  if (tema === 'escuro') raiz.setAttribute('data-tema', 'escuro');
  else raiz.removeAttribute('data-tema');
  botaoTema.textContent = tema === 'escuro' ? 'Tema claro' : 'Tema escuro';
}

// Lembra a escolha da pessoa (se o navegador permitir)
let temaSalvo = 'claro';
try { temaSalvo = localStorage.getItem('tema') || 'claro'; } catch (e) {}
aplicarTema(temaSalvo);

botaoTema.addEventListener('click', () => {
  const novo = raiz.getAttribute('data-tema') === 'escuro' ? 'claro' : 'escuro';
  aplicarTema(novo);
  try { localStorage.setItem('tema', novo); } catch (e) {}
});

// ===== Formulário de contato: validação e envio simulado =====
const form = document.getElementById('form-contato');
const confirmacao = document.getElementById('confirmacao');
const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // formato usuario@dominio.com

// Mostra ou limpa a mensagem de erro de um campo
function marcarErro(campo, texto) {
  document.getElementById('erro-' + campo.id).textContent = texto;
  campo.classList.toggle('invalido', texto !== '');
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault(); // não recarrega a página
  confirmacao.textContent = '';

  const nome = form.nome, email = form.email, mensagem = form.mensagem;
  let valido = true;

  if (nome.value.trim() === '') { marcarErro(nome, 'Digite seu nome.'); valido = false; }
  else marcarErro(nome, '');

  if (email.value.trim() === '') { marcarErro(email, 'Digite seu e-mail.'); valido = false; }
  else if (!formatoEmail.test(email.value.trim())) {
    marcarErro(email, 'Use um e-mail válido, como usuario@dominio.com.'); valido = false;
  } else marcarErro(email, '');

  if (mensagem.value.trim() === '') { marcarErro(mensagem, 'Escreva sua mensagem.'); valido = false; }
  else marcarErro(mensagem, '');

  if (!valido) return;

  // Envio simulado: limpa os campos e mostra a confirmação
  form.reset();
  confirmacao.textContent = 'Mensagem enviada com sucesso!';
});

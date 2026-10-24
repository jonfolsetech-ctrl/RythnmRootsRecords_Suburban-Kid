const menu = document.querySelector<HTMLButtonElement>('.menu');
const nav = document.querySelector<HTMLElement>('#nav');

menu?.addEventListener('click', () => {
  if (!nav) return;
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? '×' : '☰';
});

nav?.querySelectorAll<HTMLAnchorElement>('a').forEach((anchor) => {
  anchor.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    if (menu) menu.textContent = '☰';
  });
});

const year = document.querySelector<HTMLElement>('#year');
if (year) year.textContent = String(new Date().getFullYear());

document.querySelector<HTMLFormElement>('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const recipient = 'YOUR-LABEL-EMAIL@example.com';

  if (recipient === 'YOUR-LABEL-EMAIL@example.com') {
    const formNote = document.querySelector<HTMLElement>('#form-note');
    if (formNote) {
      formNote.textContent = 'Setup required: replace YOUR-LABEL-EMAIL@example.com in script.ts with your real label email. This starter form is not connected to a server.';
    }
    return;
  }

  const name = document.querySelector<HTMLInputElement>('#name')?.value ?? '';
  const email = document.querySelector<HTMLInputElement>('#email')?.value ?? '';
  const topic = document.querySelector<HTMLSelectElement>('#topic')?.value ?? '';
  const message = document.querySelector<HTMLTextAreaElement>('#message')?.value ?? '';

  location.href = `mailto:${recipient}?subject=${encodeURIComponent(`RhythmRoots Records: ${topic}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`)}`;
});
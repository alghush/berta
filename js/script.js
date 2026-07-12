// ---- MODAL RESERVAS — sin cambios ----
let sectorReserva = 'Adentro';

function abrirModalReserva() {
  document.getElementById('modal-reserva-overlay').classList.add('activo');
}
function cerrarModalReserva() {
  document.getElementById('modal-reserva-overlay').classList.remove('activo');
}
function elegirSectorReserva(sector, btn) {
  sectorReserva = sector;
  document.querySelectorAll('#modal-reserva-overlay .sector-btn').forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');
}
function enviarReserva() {
  const nombre  = document.getElementById('reserva-nombre').value;
  const fecha   = document.getElementById('reserva-fecha').value;
  const turno   = document.getElementById('reserva-turno').value;
  const adultos = document.getElementById('reserva-adultos').value || '0';
  const ninos   = document.getElementById('reserva-ninos').value   || '0';

  if (!nombre || !fecha || !turno) {
    alert('Por favor completá nombre, fecha y turno.');
    return;
  }

  abrirWhatsApp(`Hola! Quiero hacer una reserva. Nombre: ${nombre}. Fecha: ${fecha}. Turno: ${turno}. Adultos: ${adultos}. Niños: ${ninos}. Sector: ${sectorReserva}.`);
  cerrarModalReserva();
}
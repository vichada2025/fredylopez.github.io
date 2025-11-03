document.getElementById('getLocationBtn').addEventListener('click', function () {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '<p>Obteniendo ubicación... ⏳</p>';

  if (!navigator.geolocation) {
    resultDiv.innerHTML = '<p>❌ Geolocalización no soportada en este dispositivo.</p>';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=16`;
      const link = `<a href="${mapUrl}" target="_blank">${mapUrl}</a>`;
      navigator.clipboard.writeText(mapUrl).then(() => {
        resultDiv.innerHTML = `<p>✅ ¡Ubicación copiada al portapapeles!</p><p>${link}</p><p>Pégala en el formulario de Fredy López.</p>`;
      }).catch(() => {
        resultDiv.innerHTML = `<p>📍 Enlace generado:</p><p>${link}</p><p>Copia y pégalo manualmente.</p>`;
      });
    },
    (error) => {
      let msg = '❌ No se pudo obtener la ubicación.';
      if (error.code === 1) msg = '⚠️ Por favor, permite el acceso a la ubicación.';
      resultDiv.innerHTML = `<p>${msg}</p>`;
    }
  );
});
// Simulasikan pengambilan saldo dari database atau sesi
const saldo = 500000; // Gantilah ini dengan logika pengambilan saldo yang sesungguhnya

// Tampilkan saldo dalam kartu di halaman view_balance.html
const balanceCard = document.getElementById('balance-card');
balanceCard.innerHTML = `
  <p>Your current balance is:</p>
  <h3>${saldo} IDR</h3>
`;
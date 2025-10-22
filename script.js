// Menunggu seluruh dokumen HTML dimuat (best practice)
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Definisikan semua elemen yang kita butuhkan
    const fabButton = document.getElementById('fab-chat-button');
    const chatWidget = document.getElementById('chat-widget');
    const closeButton = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatLog = document.getElementById('chat-log');
    
    // 2. Definisikan endpoint API Anda
    const apiEndpoint = 'https://api.fandirr.my.id/ai/gpt?model=gpt-3.5-turbo&prompt=';

    // 3. Fungsi untuk membuka/menutup jendela chat
    function toggleChat() {
        chatWidget.classList.toggle('show');
        fabButton.classList.toggle('hidden'); // Sembunyikan/tampilkan FAB
    }

    // 4. Pasang event listener ke tombol FAB dan tombol Close
    fabButton.addEventListener('click', toggleChat);
    closeButton.addEventListener('click', toggleChat);

    // 5. Fungsi helper untuk menambahkan pesan ke log
    function appendMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', type); // type = 'user', 'ai', atau 'typing'
        messageElement.innerHTML = `<p>${message}</p>`;
        
        chatLog.appendChild(messageElement);
        
        // Selalu scroll ke pesan terbaru
        chatLog.scrollTop = chatLog.scrollHeight;
        
        return messageElement; // Mengembalikan elemen untuk referensi
    }

    // 6. Logika utama saat form (pesan) dikirim
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah halaman reload saat form disubmit
        
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return; // Jangan kirim jika input kosong

        // a. Tampilkan pesan pengguna di log
        appendMessage(userMessage, 'user');
        chatInput.value = ''; // Kosongkan field input

        // b. Tampilkan indikator "sedang mengetik" (UX yang baik)
        const typingIndicator = appendMessage('AI sedang mengetik...', 'typing');

        try {
            // c. Panggil API menggunakan 'fetch'
            // encodeURIComponent memastikan spasi/simbol aman untuk URL
            const response = await fetch(apiEndpoint + encodeURIComponent(userMessage));
            
            if (!response.ok) {
                throw new Error('Respon jaringan tidak baik.');
            }
            
            const data = await response.json();
            
            // d. Hapus indikator "sedang mengetik"
            chatLog.removeChild(typingIndicator);

            // e. Ambil balasan dari struktur JSON
            let aiReply = 'Maaf, terjadi kesalahan saat mengambil balasan.'; // Pesan error default
            if (data.status === 'success' && data.result && data.result.reply) {
                aiReply = data.result.reply;
            }

            // f. Tampilkan balasan AI di log
            appendMessage(aiReply, 'ai');

        } catch (error) {
            console.error('Error fetching AI response:', error);
            // Hapus "sedang mengetik" jika terjadi error
            chatLog.removeChild(typingIndicator);
            // Tampilkan pesan error di chat
            appendMessage('Maaf, saya tidak bisa terhubung ke server AI saat ini. Coba lagi nanti.', 'ai');
        }
    });
});
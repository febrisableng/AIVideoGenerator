document.addEventListener('DOMContentLoaded', () => {
    const addCharacterButton = document.getElementById('add-character');
    const additionalCharactersDiv = document.getElementById('additional-characters');
    const generatePromptButton = document.getElementById('generate-prompt');
    const promptIdOutput = document.getElementById('prompt-id');
    const promptEnContainer = document.getElementById('prompt-en-container');
    const dialogTypeSelect = document.getElementById('dialog-type'); // Changed to dialogTypeSelect
    const dialogContentPerCharacterDiv = document.getElementById('dialog-content-per-character');
    const resetPromptOutputButton = document.getElementById('reset-prompt-output');

    // Theme switch elements
    const themeSwitch = document.getElementById('checkbox');
    const modeLabel = document.querySelector('.mode-label');

    let characterCount = 1;

    // Function to set the theme
    function setTheme(isDarkMode) {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            modeLabel.textContent = 'Dark Mode';
        } else {
            document.body.classList.remove('dark-mode');
            modeLabel.textContent = 'Light Mode';
        }
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Load saved theme from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        themeSwitch.checked = true;
        setTheme(true);
    } else {
        themeSwitch.checked = false;
        setTheme(false);
    }

    // Event listener for theme switch
    themeSwitch.addEventListener('change', (event) => {
        setTheme(event.target.checked);
    });

    // Comprehensive translations for camera movements
    const cameraMovementTranslations = {
        'Action Run': { en: 'Action Run', id: 'Lari Aksi' },
        'Arc': { en: 'Arc', id: 'Busur' },
        'Bullet Time': { en: 'Bullet Time', id: 'Waktu Peluru' },
        'Car Grip': { en: 'Car Grip', id: 'Genggaman Mobil' },
        'Crane-up': { en: 'Crane-up', id: 'Angkat Derek' },
        'Crash Zoom-in': { en: 'Crash Zoom-in', id: 'Zoom Mendadak Masuk' },
        'Dolly In': { en: 'Dolly In', id: 'Dolly Masuk' },
        'Dolly Out': { en: 'Dolly Out', id: 'Dolly Keluar' },
        'Dolly Right': { en: 'Dolly Right', id: 'Dolly Kanan' },
        'Dolly Zoom-in': { en: 'Dolly Zoom-in', id: 'Dolly Zoom Masuk' },
        'Dutch Angle': { en: 'Dutch Angle', id: 'Sudut Belanda' },
        'Focus Change': { en: 'Focus Change', id: 'Perubahan Fokus' },
        'FPV Drone': { en: 'FPV Drone', id: 'Drone FPV' },
        'Fisheye': { en: 'Fisheye', id: 'Mata Ikan' },
        'Handheld': { en: 'Handheld', id: 'Genggam' },
        'Hyperlapse': { en: 'Hyperlapse', id: 'Hiperlapse' },
        'Lazy Susan': { en: 'Lazy Susan', id: 'Lazy Susan' },
        'Lens Flare': { en: 'Lens Flare', id: 'Kilatan Lensa' },
        'Levitation': { en: 'Levitation', id: 'Levitasi' },
        'Low Shutter': { en: 'Low Shutter', id: 'Rana Lambat' },
        'Pan Left': { en: 'Pan Left', id: 'Geser Kiri' },
        'Pan Right': { en: 'Pan Right', id: 'Geser Kanan' },
        'Pedestal Down': { en: 'Pedestal Down', id: 'Pijakan Bawah' },
        'Pedestal Up': { en: 'Pedestal Up', id: 'Pijakan Atas' },
        'Rap Flex': { en: 'Rap Flex', id: 'Fleksibel Rap' },
        'Robo Arm': { en: 'Robo Arm', id: 'Lengan Robot' },
        'Roll': { en: 'Roll', id: 'Putar' },
        'Static Shot': { en: 'Static Shot', id: 'Bidikan Statis' },
        'Super Dolly-in': { en: 'Super Dolly-in', id: 'Super Dolly Masuk' },
        'Through Object-in': { en: 'Through Object-in', id: 'Melalui Objek Masuk' },
        'Tilt Down': { en: 'Tilt Down', id: 'Miring Bawah' },
        'Tilt Up': { en: 'Tilt Up', id: 'Miring Atas' },
        'Track Left': { en: 'Track Left', id: 'Lacak Kiri' },
        'Track Right': { en: 'Track Right', id: 'Lacak Kanan' },
        '360 Orbit': { en: '360 Orbit', id: 'Orbit 360' },
        'Zoom In': { en: 'Zoom In', id: 'Perbesar' },
        'Zoom Out': { en: 'Zoom Out', id: 'Perkecil' },
    };

    const timeTranslations = {
        'Pagi Cerah': { en: 'bright morning', id: 'Pagi Cerah' },
        'Pagi Hari berkabut': { en: 'foggy morning', id: 'Pagi Hari berkabut' },
        'Siang Terik': { en: 'scorching noon', id: 'Siang Terik' },
        'Sore Menjelang Senja': { en: 'late afternoon nearing dusk', id: 'Sore Menjelang Senja' },
        'Malam Hari Tenang': { en: 'calm night', id: 'Malam Hari Tenang' },
        'Dini Hari Berkabut': { en: 'foggy early morning', id: 'Dini Hari Berkabut' },
    };

    const weatherTranslations = {
        'Cerah Berawan': { en: 'partly cloudy', id: 'Cerah Berawan' },
        'Hujan Gerimis': { en: 'light drizzle', id: 'Hujan Gerimis' },
        'Hujan Deras': { en: 'heavy rain', id: 'Hujan Deras' },
        'Berkabut Tebal': { en: 'dense fog', id: 'Berkabut Tebal' },
        'Berangin Kencang': { en: 'strong winds', id: 'Berangin Kencang' },
        'Badai Petir': { en: 'thunderstorm', id: 'Badai Petir' },
        'Bersalju': { en: 'snowy', id: 'Bersalju' },
    };

    const cameraStyleTranslations = {
        'Realistic & Cinematic': { en: 'realistic and cinematic', id: 'Realistic & Cinematic' },
        'Dokumenter': { en: 'documentary', id: 'Dokumenter' },
        'Futuristik': { en: 'futuristic', id: 'Futuristik' },
        'Vintage Efek VHS': { en: 'vintage VHS effect', id: 'Vintage Efek VHS' },
        'Animasi 3D': { en: '3D animation', id: 'Animasi 3D' },
        'Pixel': { en: 'pixel art', id: 'Pixel' },
        'Kartun': { en: 'cartoon', id: 'Kartun' },
        'Black and White': { en: 'black and white', id: 'Black and White' },
    };

    const cameraAngleTranslations = {
        'Eye Level': { en: 'eye-level', id: 'Eye Level (Setinggi mata)' },
        'Low Angle': { en: 'low-angle', id: 'Low Angle (Sudut rendah)' },
        'High Angle': { en: 'high-angle', id: 'High Angle (Sudut tinggi)' },
        'Bird’s Eye View': { en: `bird's-eye view`, id: `Bird’s Eye View` },
        'Worm’s Eye View': { en: `worm's-eye view`, id: `Worm’s Eye View` },
        'Over The Shoulder': { en: `over the shoulder`, id: `Over The Shoulder (Atas bahu)` },
        'POV': { en: `POV (Point Of View)`, id: `POV (Point Of View Subjek)` },
    };

    const focusTranslations = {
        'Fokus tajam pada subjek utama': { en: 'sharp focus on the main subject', id: 'Fokus tajam pada subjek utama' },
        'Fokus dangkal dengan latar belakang blur': { en: 'shallow focus with blurred background', id: 'Fokus dangkal dengan latar belakang blur' },
        'Fokus dalam pada seluruh adegan': { en: 'deep focus on the entire scene', id: 'Fokus dalam pada seluruh adegan' },
    };

    const lightingTranslations = {
        'Cahaya alami yang lembut': { en: 'soft natural light', id: 'Cahaya alami yang lembut' },
        'Pencahayaan studio dramatis': { en: 'dramatic studio lighting', id: 'Pencahayaan studio dramatis' },
        'Siluet saat matahari terbenam': { en: 'sunset silhouette', id: 'Siluet saat matahari terbenam' },
        'Cahaya neon vibran': { en: 'vibrant neon light', id: 'Cahaya neon vibran' },
        'Cahaya alami matahari terbit': { en: 'natural sunrise light', id: 'Cahaya alami matahari terbit' },
        'Cahaya terang dan cerah': { en: 'bright and clear light', id: 'Cahaya terang dan cerah' },
        'Cahaya low/remang remang': { en: 'low/dim light', id: 'Cahaya low/remang remang' },
        'Cahaya kontras tinggi': { en: 'high contrast light', id: 'Cahaya kontras tinggi' },
    };

    const colorGradingTranslations = {
        'Gradasi warna alami': { en: 'natural color grading', id: 'Gradasi warna alami' },
        'Hangat dan Cerah': { en: 'warm and bright', id: 'Hangat dan Cerah' },
        'Dingin dan Gelap': { en: 'cool and dark', id: 'Dingin dan Gelap' },
        'Monochrome': { en: 'monochrome', id: 'Monochrome' },
        'Vibrant dan Saturasi tinggi': { en: 'vibrant and high saturation', id: 'Vibrant dan Saturasi tinggi' },
        'Pudar Nostalgik': { en: 'faded nostalgic', id: 'Pudar Nostalgik' },
    };

    // Function to update dialog character options and dialog content inputs
    function updateCharacterRelatedFields() {
        dialogContentPerCharacterDiv.innerHTML = ''; // Clear existing dialog inputs

        for (let i = 1; i <= characterCount; i++) {
            const charNameInput = document.getElementById(`char${i}-name`);
            const charName = charNameInput ? charNameInput.value || `Karakter ${i}` : `Karakter ${i}`;

            const dialogInputGroup = document.createElement('div');
            dialogInputGroup.className = 'input-group dialog-content-input';
            dialogInputGroup.id = `dialog-input-char${i}`;
            // Display will be controlled by dialogTypeSelect change event
            dialogInputGroup.innerHTML = `
                <label for="dialog-content-char${i}">Isi Dialog ${charName}:</label>
                <textarea id="dialog-content-char${i}" rows="2" placeholder="Masukkan dialog untuk ${charName}"></textarea>
            `;
            dialogContentPerCharacterDiv.appendChild(dialogInputGroup);
        }
        // Apply initial visibility based on dialog type
        toggleDialogContentVisibility();
    }

    // Function to toggle visibility of dialog content inputs
    function toggleDialogContentVisibility() {
        const isDialogEnabled = dialogTypeSelect.value !== 'Tanpa dialog';
        document.querySelectorAll('.dialog-content-input').forEach(inputDiv => {
            inputDiv.style.display = isDialogEnabled ? 'block' : 'none';
        });
    }

    // Function to attach event listeners to character name inputs
    function attachCharacterNameListeners() {
        for (let i = 1; i <= characterCount; i++) {
            const charNameInput = document.getElementById(`char${i}-name`);
            if (charNameInput) {
                charNameInput.removeEventListener('input', updateCharacterRelatedFields); // Prevent duplicate listeners
                charNameInput.addEventListener('input', updateCharacterRelatedFields);
            }
        }
    }

    // Initial update for character related fields
    updateCharacterRelatedFields();
    attachCharacterNameListeners(); // Attach listeners for initial character

    // Event listener for adding new characters
    addCharacterButton.addEventListener('click', () => {
        characterCount++;
        const newCharacterHtml = `
            <div class="character-input-group" id="char-group-${characterCount}">
                <h3>Karakter ${characterCount}</h3>
                <button type="button" class="remove-character" data-char-id="${characterCount}">X</button>
                <div class="input-group">
                    <label for="char${characterCount}-name">Nama Karakter ${characterCount}:</label>
                    <input type="text" id="char${characterCount}-name" placeholder="Contoh: Detektif, Pria Tua, Wanita">
                </div>
                <div class="input-group">
                    <label for="char${characterCount}-nationality">Kewarganegaraan Karakter ${characterCount}:</label>
                    <input type="text" id="char${characterCount}-nationality" placeholder="Contoh: Indonesia, Jepang">
                </div>
                <div class="input-group">
                    <label for="char${characterCount}-characteristic">Karakteristik Subjek ${characterCount}:</label>
                    <input type="text" id="char${characterCount}-characteristic" placeholder="Contoh: Berani, Tangguh, Lemah Gemulai, Macho">
                </div>
                <div class="input-group">
                    <label for="char${characterCount}-action">Aksi Utama Karakter ${characterCount}:</label>
                    <input type="text" id="char${characterCount}-action" placeholder="Contoh: Sedang bertarung, Sedang duduk, Sedang tidur">
                </div>
                <div class="input-group">
                    <label for="char${characterCount}-emotion">Emosi Karakter ${characterCount}:</label>
                    <input type="text" id="char${characterCount}-emotion" placeholder="Contoh: Marah, Cemas, Gembira">
                </div>
            </div>
        `;
        additionalCharactersDiv.insertAdjacentHTML('beforeend', newCharacterHtml);

        // Add event listener for the new remove button
        document.querySelector(`#char-group-${characterCount} .remove-character`).addEventListener('click', (event) => {
            const charIdToRemove = event.target.dataset.charId;
            document.getElementById(`char-group-${charIdToRemove}`).remove();
            // Re-index remaining characters if needed (for simplicity, we'll just remove the div for now)
            // A more robust solution would re-index IDs or use a data structure to manage characters
            characterCount--; // Decrement character count if a character is removed
            updateCharacterRelatedFields();
            attachCharacterNameListeners(); // Re-attach listeners after character removal
        });
        updateCharacterRelatedFields(); // Update dialog fields for new character
        attachCharacterNameListeners(); // Attach listener for the new character
    });

    // Event listener for dialog type change
    dialogTypeSelect.addEventListener('change', toggleDialogContentVisibility);

    // Initial call to set visibility on load
    toggleDialogContentVisibility();

    // --- Copy to clipboard functionality ---
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.currentTarget.dataset.target;
            let textToCopy = '';

            if (targetId === 'prompt-en-container') {
                // For English prompt, copy all child text content, including editable textareas
                const container = document.getElementById(targetId);
                const paragraphs = container.querySelectorAll('p');
                const textareas = container.querySelectorAll('textarea');

                paragraphs.forEach(p => textToCopy += p.textContent + '\n');
                textareas.forEach(textarea => textToCopy += textarea.value + '\n');
            } else {
                const targetElement = document.getElementById(targetId);
                if (targetElement.tagName === 'TEXTAREA') {
                    textToCopy = targetElement.value;
                } else if (targetElement.tagName === 'DIV') {
                    textToCopy = targetElement.textContent; // For general div content
                }
            }
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert('Copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    });

    // --- Reset functionality ---
    document.querySelectorAll('.reset-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.currentTarget.dataset.target;
            if (targetId) {
                // Specific field reset
                const targetElement = document.getElementById(targetId);
                if (targetElement.tagName === 'TEXTAREA' || targetElement.tagName === 'INPUT') {
                    targetElement.value = '';
                }
            } else if (event.currentTarget.id === 'reset-prompt-output') {
                // Reset both prompt outputs
                promptIdOutput.value = '';
                promptEnContainer.innerHTML = '';
            }
        });
    });

    generatePromptButton.addEventListener('click', () => {
        const data = {};

        // Gather Character Data
        data.characters = [];
        for (let i = 1; i <= characterCount; i++) {
            const charName = document.getElementById(`char${i}-name`)?.value || '';
            const charNationality = document.getElementById(`char${i}-nationality`)?.value || '';
            const charCharacteristic = document.getElementById(`char${i}-characteristic`)?.value || '';
            const charAction = document.getElementById(`char${i}-action`)?.value || '';
            const charEmotion = document.getElementById(`char${i}-emotion`)?.value || '';
            const charDialog = document.getElementById(`dialog-content-char${i}`)?.value || '';

            if (charName) {
                data.characters.push({
                    name: charName,
                    nationality: charNationality,
                    characteristic: charCharacteristic,
                    action: charAction,
                    emotion: charEmotion,
                    dialog: charDialog
                });
            }
        }

        // Gather Latar Data
        data.latar = {
            location: document.getElementById('location').value,
            time: document.getElementById('time').value,
            weather: document.getElementById('weather').value,
            season: document.getElementById('season').value
        };

        // Gather Kamera Data
        data.kamera = {
            style: document.getElementById('camera-style').value,
            movement: document.getElementById('camera-movement').value,
            angle: document.getElementById('camera-angle').value,
            focus: document.getElementById('focus').value,
            lighting: document.getElementById('lighting').value,
            colorGrading: document.getElementById('color-grading').value
        };

        // Gather Audio Data
        data.audio = {
            dialogType: document.getElementById('dialog-type').value,
            voiceMood: document.getElementById('voice-mood').value,
            environmentalSound: document.getElementById('environmental-sound').value,
            backgroundMusic: document.getElementById('background-music').value
        };

        // Gather Video Quality & Duration Data
        data.videoSpecs = {
            quality: document.getElementById('video-quality').value,
            duration: document.getElementById('video-duration').value,
            ratio: document.getElementById('video-ratio').value
        };

        data.additionalDetails = document.getElementById('additional-details').value;

        // Generate Indonesian Prompt
        const promptId = generateIndonesianPrompt(data);
        promptIdOutput.value = promptId;

        // Generate English Prompt
        const promptEnHtml = generateEnglishPromptHtml(data);
        promptEnContainer.innerHTML = promptEnHtml;
    });

    function generateIndonesianPrompt(data) {
        const timeId = timeTranslations[data.latar.time]?.id || data.latar.time;
        const weatherId = weatherTranslations[data.latar.weather]?.id || data.latar.weather;
        const cameraStyleId = cameraStyleTranslations[data.kamera.style]?.id || data.kamera.style;
        const cameraAngleId = cameraAngleTranslations[data.kamera.angle]?.id || data.kamera.angle;
        const focusId = focusTranslations[data.kamera.focus]?.id || data.kamera.focus;
        const lightingId = lightingTranslations[data.kamera.lighting]?.id || data.kamera.lighting;
        const colorGradingId = colorGradingTranslations[data.kamera.colorGrading]?.id || data.kamera.colorGrading;

        let prompt = `Sebuah video sinematik yang mendalam, berfokus pada visual yang tajam dan penceritaan yang kuat. Video ini menampilkan:\n\n`;

        data.characters.forEach((char, index) => {
            prompt += `- **Karakter ${index + 1}**: ${char.name}, seorang individu berkebangsaan ${char.nationality} dengan karakteristik yang menonjol yaitu **${char.characteristic}**. Karakter ini terlibat dalam aksi **${char.action}**, dan secara ekspresif menampilkan emosi ${char.emotion}.\n`;
        });

        prompt += `\n**Latar Adegan Detail:**\n`;
        prompt += `Adegan ini berlokasi di **${data.latar.location}**, pada ${timeId}. Cuaca di lokasi tersebut ${weatherId} yang pekat, menciptakan suasana khas musim ${data.latar.season}.\n`;

        prompt += `\n**Pengaturan Kamera & Visual yang Canggih:**\n`;
        const cameraMovementId = cameraMovementTranslations[data.kamera.movement] ? cameraMovementTranslations[data.kamera.movement].id : data.kamera.movement;
        prompt += `Video ini diambil dengan gaya visual **${cameraStyleId}**, menampilkan pergerakan kamera **${cameraMovementId}** yang sangat dinamis. Pengambilan gambar dilakukan dari sudut ${cameraAngleId}, dengan fokus ${focusId}, dan diterangi oleh ${lightingId}.\n`;
        
        if (data.kamera.colorGrading) {
            prompt += `Gradasi Warna: **${colorGradingId}**, yang memberikan sentuhan visual yang unik.\n`;
        }

        prompt += `\n**Elemen Audio yang Kaya & Atmosferik:**\n`;
        prompt += `Elemen audio mencakup jenis dialog **${data.audio.dialogType}**, dengan mood suara yang **${data.audio.voiceMood}**. Suara lingkungan sekitar adalah ${data.audio.environmentalSound}, dan didukung oleh musik latar ${data.audio.backgroundMusic}, menciptakan atmosfer yang mendalam.\n`;

        if (data.audio.dialogType !== 'Tanpa dialog' && data.characters.length > 0) {
            data.characters.forEach(char => {
                if (char.dialog) {
                    prompt += `Isi Dialog ${char.name}: "${char.dialog}"\n`;
                }
            });
        }

        prompt += `\n**Spesifikasi Teknis Video:**\n`;
        prompt += `Video ini memiliki kualitas **${data.videoSpecs.quality}**, dengan durasi tepat ${data.videoSpecs.duration}, dan disajikan dalam rasio aspek ${data.videoSpecs.ratio}.\n`;

        if (data.additionalDetails) {
            prompt += `\n**Detail Tambahan Penting:**\n`;
            prompt += `${data.additionalDetails}\n`;
        }

        return prompt;
    }

    function generateEnglishPromptHtml(data) {
        const timeEn = timeTranslations[data.latar.time]?.en || data.latar.time;
        const weatherEn = weatherTranslations[data.latar.weather]?.en || data.latar.weather;
        const cameraStyleEn = cameraStyleTranslations[data.kamera.style]?.en || data.kamera.style;
        const cameraAngleEn = cameraAngleTranslations[data.kamera.angle]?.en || data.kamera.angle;
        const focusEn = focusTranslations[data.kamera.focus]?.en || data.kamera.focus;
        const lightingEn = lightingTranslations[data.kamera.lighting]?.en || data.kamera.lighting;
        const colorGradingEn = colorGradingTranslations[data.kamera.colorGrading]?.en || data.kamera.colorGrading;

        let promptHtml = '';

        promptHtml += '<p>A deep cinematic video, focusing on sharp visuals and strong storytelling. This video features:</p>';

        data.characters.forEach((char, index) => {
            const nationality = char.nationality.toLowerCase() === 'indonesia' ? 'Indonesian' : char.nationality;
            promptHtml += `<p>- <strong>Character ${index + 1}</strong>: ${char.name}, an ${nationality} national with prominent characteristics of <strong>${char.characteristic}</strong>. This character is involved in the action of <strong>${char.action}</strong>, and expressively displays an emotion of ${char.emotion}.</p>`;
        });

        promptHtml += '<p><strong>Detailed Scene Setting:</strong></p>';
        promptHtml += `<p>This scene is located in <strong>${data.latar.location}</strong>, at ${timeEn}. The weather at the location is ${weatherEn}, creating a distinctive atmosphere for the ${data.latar.season.toLowerCase()} season.</p>`;

        promptHtml += '<p><strong>Advanced Camera & Visual Settings:</strong></p>';
        const cameraMovementEn = cameraMovementTranslations[data.kamera.movement] ? cameraMovementTranslations[data.kamera.movement].en : data.kamera.movement;
        promptHtml += `<p>The video is shot with a <strong>${cameraStyleEn}</strong> visual style, featuring dynamic camera movement: <strong>${cameraMovementEn}</strong>. The shot is taken from an ${cameraAngleEn} angle, with ${focusEn}, and illuminated by ${lightingEn}.</p>`;
        
        if (data.kamera.colorGrading) {
            promptHtml += `<p>Color Grading: <strong>${colorGradingEn}</strong>, which provides a unique visual touch.</p>`;
        }

        promptHtml += '<p><strong>Rich & Atmospheric Audio Elements:</strong></p>';
        const dialogTypeEn = data.audio.dialogType.toLowerCase() === 'tanpa dialog' ? 'no dialog' : data.audio.dialogType.toLowerCase();
        promptHtml += `<p>Audio elements include dialog type: <strong>${dialogTypeEn}</strong>, with a voice mood that is <strong>${data.audio.voiceMood.toLowerCase()}</strong>. The environmental sound is ${data.audio.environmentalSound.toLowerCase()}, and it is supported by background music: ${data.audio.backgroundMusic.toLowerCase()}, creating a deep atmosphere.</p>`;

        if (data.audio.dialogType !== 'Tanpa dialog' && data.characters.length > 0) {
            data.characters.forEach(char => {
                if (char.dialog) {
                    promptHtml += `<p>Dialog Content for ${char.name}: <textarea class="editable-dialog" rows="2">${char.dialog}</textarea></p>`;
                } else {
                    promptHtml += `<p>Dialog Content for ${char.name}: <textarea class="editable-dialog" rows="2"></textarea></p>`;
                }
            });
        }

        promptHtml += '<p><strong>Video Technical Specifications:</strong></p>';
        const durationEn = data.videoSpecs.duration.replace(' detik', ' seconds');
        promptHtml += `<p>This video has a <strong>${data.videoSpecs.quality}</strong> quality, with an exact duration of ${durationEn}, and is presented in an aspect ratio of ${data.videoSpecs.ratio}.</p>`;

        if (data.additionalDetails) {
            promptHtml += '<p><strong>Important Additional Details:</strong></p>';
            promptHtml += `<p>${data.additionalDetails.replace(/Keduanya sedang bertarung dengan epik dan saling pukul/g, 'Both are fighting epically and punching each other')}</p>`;
        }

        return promptHtml;
    }
}); 
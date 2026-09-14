    document.addEventListener('DOMContentLoaded', () => {

        const themeToggleBtn = document.getElementById('themeToggle');
        const htmlElement = document.documentElement;

        const currentSavedTheme = localStorage.getItem('rentflow_theme') || 'dark';
        setTheme(currentSavedTheme);

        function setTheme(theme) {
            htmlElement.setAttribute('data-theme', theme);
            localStorage.setItem('rentflow_theme', theme);
        }

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                const currentTheme = htmlElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
            });
        }

        const carsDatabase = [
            {
                id: 1,
                name: "McLaren 570S Spider",
                category: "Desportivo",
                image: "/images/cars/car-01.webp",
                color: "#c8f33b",
                description: "Queremos que tenha uma experiência de aluguer sem stress, tornando simples alugar um carro — através de ferramentas de pesquisa fáceis, avaliações de clientes e vários locais de levantamento em Luanda e Talatona."
            },
            {
                id: 2,
                name: "Porsche 911 GT3 RS",
                category: "Desportivo",
                image: "/images/cars/car-02.webp",
                color: "#3b82f6",
                description: "Desfrute de engenharia de competição em estradas públicas com aerodinâmica ativa, direção de alta precisão e a potência brutal de um motor de alto rendimento."
            },
            {
                id: 3,
                name: "Lamborghini Huracán EVO",
                category: "Desportivo",
                image: "/images/cars/car-03.webp",
                color: "#eab308",
                description: "Liberte o prestígio italiano com motor V10 atmosférico. Uma máquina desenhada para proporcionar emoções indescritíveis e um visual inconfundível."
            },
            {
                id: 4,
                name: "Mercedes-AMG G 63",
                category: "SUV Luxo",
                image: "/images/cars/car-04.webp",
                color: "#a855f7",
                description: "O SUV de luxo definitivo que une uma presença imponente a um conforto interior absoluto e capacidade superior em qualquer trajeto executivo."
            },
            {
                id: 5,
                name: "Tesla Model S Plaid",
                category: "Elétrico",
                image: "/images/cars/car-05.webp",
                color: "#ef4444",
                description: "Aceleração recorde totalmente elétrica, autonomia estendida e tecnologia de vanguarda reunidas num sedan futurista de alto luxo."
            }
        ];

        let currentCarIndex = 0;

        const heroCarImage = document.getElementById('heroCarImage');
        const heroCarDescription = document.getElementById('heroCarDescription');
        const prevCarBtn = document.getElementById('prevCarBtn');
        const nextCarBtn = document.getElementById('nextCarBtn');

        function updateDynamicAccent(hexColor) {
            const root = document.documentElement;
            root.style.setProperty('--accent-color', hexColor);

            let r = 200, g = 243, b = 59;
            if (hexColor.startsWith('#') && hexColor.length === 7) {
                r = parseInt(hexColor.slice(1, 3), 16);
                g = parseInt(hexColor.slice(3, 5), 16);
                b = parseInt(hexColor.slice(5, 7), 16);
            }
            root.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.35)`);
        }

        function switchCar(index) {
            if (index < 0) {
                currentCarIndex = carsDatabase.length - 1;
            } else if (index >= carsDatabase.length) {
                currentCarIndex = 0;
            } else {
                currentCarIndex = index;
            }

            const car = carsDatabase[currentCarIndex];

            if (heroCarImage && heroCarDescription) {
                heroCarImage.classList.add('fade-out');
                heroCarDescription.classList.add('fade-out');

                setTimeout(() => {
                    heroCarImage.src = car.image;
                    heroCarImage.alt = car.name;
                    heroCarDescription.textContent = car.description;
                    updateDynamicAccent(car.color);

                    heroCarImage.classList.remove('fade-out');
                    heroCarDescription.classList.remove('fade-out');
                }, 350);
            }
        }

        if (prevCarBtn) {
            prevCarBtn.addEventListener('click', () => {
                switchCar(currentCarIndex - 1);
            });
        }

        if (nextCarBtn) {
            nextCarBtn.addEventListener('click', () => {
                switchCar(currentCarIndex + 1);
            });
        }

        const now = new Date();
        const returnDateDefault = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        now.setHours(22, 0, 0, 0);
        returnDateDefault.setHours(22, 0, 0, 0);

        function formatDateTimeLocal(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }

        const pickUpDateInput = document.getElementById('pickUpDateInput');
        const returnDateInput = document.getElementById('returnDateInput');

        if (pickUpDateInput && returnDateInput) {
            pickUpDateInput.value = formatDateTimeLocal(now);
            returnDateInput.value = formatDateTimeLocal(returnDateDefault);
        }

        const locationOptions = document.querySelectorAll('.location-option');
        const selectedLocationText = document.getElementById('selectedLocationText');

        locationOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                locationOptions.forEach(opt => opt.classList.remove('active'));
                e.currentTarget.classList.add('active');
                const locValue = e.currentTarget.getAttribute('data-value');
                if (selectedLocationText) {
                    selectedLocationText.textContent = locValue;
                }
            });
        });

        const searchForm = document.getElementById('searchForm');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const pickUpVal = new Date(pickUpDateInput.value);
                const returnVal = new Date(returnDateInput.value);

                if (returnVal <= pickUpVal) {
                    showToast('A data de devolução não pode ser anterior à data de retirada.', 'error');
                    return;
                }

                showToast('Pesquisa efetuada com sucesso! A carregar opções em Talatona...', 'success');
            });
        }

        function showToast(message, type = 'success') {
            const toastEl = document.getElementById('systemToast');
            const toastMessage = document.getElementById('toastMessage');
            
            if (!toastEl || !toastMessage) return;

            toastEl.className = `toast align-items-center text-white border-0 shadow-lg ${type === 'success' ? 'bg-success-custom' : 'bg-error-custom'}`;
            
            const iconClass = type === 'success' ? 'bi-check-circle-fill text-accent' : 'bi-exclamation-triangle-fill text-danger';
            toastMessage.innerHTML = `<i class="bi ${iconClass} fs-5"></i><span>${message}</span>`;

            const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
            bsToast.show();
        }

    });

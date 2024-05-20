document.addEventListener("DOMContentLoaded", () => {
    const countrySelect = document.getElementById('country-select');
    const tableBody = document.getElementById('holiday-table-body');

    function fetchHolidays(countryCode) {
        fetch(`https://date.nager.at/api/v3/PublicHolidays/2024/${countryCode}`)
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach(holiday => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${holiday.date}</td>
                        <td>${holiday.localName}</td>
                        <td>${holiday.name}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching holiday data:', error));
    }

    countrySelect.addEventListener('change', () => {
        fetchHolidays(countrySelect.value);
    });

    // Fetch holidays for the default selected country on load
    fetchHolidays(countrySelect.value);
});

document.addEventListener('DOMContentLoaded', () => {
  const reportTableBody = document.querySelector('.report-table-body');

  fetch('http://localhost:8080/reportview/reports')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(reports => {
      // Generate table rows based on the reports data
      reports.forEach(report => {
        const row = document.createElement('tr');

        const usernameCell = document.createElement('td');
        usernameCell.textContent = report.username;
        row.appendChild(usernameCell);

        const reasonCell = document.createElement('td');
        reasonCell.textContent = report.reason;
        row.appendChild(reasonCell);

        const otherReasonCell = document.createElement('td');
        otherReasonCell.textContent = report.otherReason;
        row.appendChild(otherReasonCell);

        const detailedDescriptionCell = document.createElement('td');
        detailedDescriptionCell.textContent = report.detailedDescription;
        row.appendChild(detailedDescriptionCell);

        reportTableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

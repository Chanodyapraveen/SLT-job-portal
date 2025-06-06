document.addEventListener('DOMContentLoaded', () => {
    // Handle search functionality
    const searchInput = document.getElementById('searchInput');
    const tableRows = document.querySelectorAll('.tableRow');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        tableRows.forEach(row => {
            const jobId = row.querySelector('.jobId').textContent.toLowerCase();
            const jobField = row.querySelector('.jobField').textContent.toLowerCase();
            const status = row.querySelector('.status').textContent.toLowerCase();
            
            if (jobId.includes(searchTerm) || jobField.includes(searchTerm) || status.includes(searchTerm)) {
                row.style.display = 'flex';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Handle delete job functionality
    const deleteButtons = document.querySelectorAll('.deleteIcon');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this job?')) {
                const jobId = button.getAttribute('data-id');
                try {
                    const response = await fetch(`/api/jobs/${jobId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    
                    if (response.ok) {
                        // Remove the row from the UI
                        button.closest('.tableRow').remove();
                        alert('Job deleted successfully');
                    } else {
                        alert('Failed to delete job');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred');
                }
            }
        });
    });
});
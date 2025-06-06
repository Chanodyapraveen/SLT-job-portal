document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('jobCreationForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            jobId: document.getElementById('jobId').value,
            jobField: document.getElementById('jobField').value,
            jobPosition: document.getElementById('jobPosition').value,
            contactNumber: document.getElementById('contactNumber').value,
            background: document.getElementById('background').value,
            salary: document.getElementById('salary').value,
            dueDate: document.getElementById('dueDate').value,
            companyEmail: document.getElementById('companyEmail').value,
            companyLocation: document.getElementById('companyLocation').value,
            workType: document.getElementById('workType').value,
            jobDescription: document.getElementById('jobDescription').value
        };
        
        try {
            // Send data to server
            const response = await fetch('/admin/job-creation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert('Job created successfully!');
                form.reset();
                // Optionally redirect to job listing page
                // window.location.href = '/admin/job-modification';
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the job.');
        }
    });
});
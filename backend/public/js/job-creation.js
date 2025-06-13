document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('jobCreationForm');
    
    // Check if user is authenticated
    const authToken = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Redirect to login if not authenticated or not admin
    if (!authToken || user.role !== 'admin') {
        window.location.href = '/login';
        return;
    }
    
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
            // Send data to server using the authToken from login
            const response = await fetch('/admin/job-creation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert('Job created successfully!');
                form.reset();
                // Optionally redirect to job listing page
                window.location.href = '/admin/job-modification';
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error creating job:', error);
            alert('An error occurred while creating the job. Please try again.');
        }
    });
});
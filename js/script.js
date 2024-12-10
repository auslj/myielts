// Form submission handling
document.getElementById('essay-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const submitBtn = document.getElementById('submit-btn');
    const spinner = submitBtn.querySelector('.loading-spinner');
    const buttonText = submitBtn.querySelector('.submit-button-content');
    
    // Show loading state
    spinner.style.display = 'inline-block';
    buttonText.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Submit form
    this.submit();
});

function validateForm() {
    const essayContent = document.getElementById('essay_content').value;
    const topicSource = document.querySelector('.source-btn.active').dataset.source;

    if (!essayContent.trim()) {
        alert('Please write your essay');
        return false;
    }

    if (topicSource === 'custom') {
        const customTopicType = document.getElementById('custom-topic-type').value;
        const topicTitle = document.getElementById('custom-topic-title').value;
        
        if (!customTopicType) {
            alert('Please select a topic type');
            return false;
        }
        if (!topicTitle) {
            alert('Please enter a topic title');
            return false;
        }
    } else {
        const topicType = document.getElementById('topic-type').value;
        if (!topicType) {
            alert('Please select a topic type');
            return false;
        }
    }

    return true;
}

// Topic source switching
document.querySelectorAll('.source-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Update button styles
        document.querySelectorAll('.source-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');

        const source = this.dataset.source;
        document.getElementById('topic_source').value = source;

        // Show/hide appropriate sections
        if (source === 'custom') {
            document.getElementById('custom-topic-section').style.display = 'block';
            document.getElementById('predefined-topic-section').style.display = 'none';
        } else {
            document.getElementById('custom-topic-section').style.display = 'none';
            document.getElementById('predefined-topic-section').style.display = 'block';
        }
    });
});

// Show/hide topic lists based on selection
document.getElementById('topic-type').addEventListener('change', function() {
    // Hide all topic lists
    document.querySelectorAll('.topic-list').forEach(list => {
        list.style.display = 'none';
    });
    
    // Show selected topic list
    const selectedType = this.value;
    if (selectedType) {
        document.getElementById(selectedType + '-topics').style.display = 'block';
    }
});

// Toggle topic content
document.querySelectorAll('.topic-header').forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const toggle = this.querySelector('.toggle');
        
        // Toggle display
        if (content.style.display === 'block') {
            content.style.display = 'none';
            toggle.textContent = '▼';
        } else {
            content.style.display = 'block';
            toggle.textContent = '▲';
        }
    });
});

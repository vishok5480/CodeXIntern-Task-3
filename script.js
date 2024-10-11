const summarizeBtn = document.getElementById('summarize-btn');
const urlInput = document.getElementById('url-input');
const summaryDiv = document.getElementById('summary');
const loadingDiv = document.getElementById('loading');

summarizeBtn.addEventListener('click', async () => {
    const articleUrl = urlInput.value.trim();
    if (!articleUrl) {
        showError('Please enter a valid URL.');
        return;
    }

    showLoading();

    const apiUrl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(articleUrl)}&lang=en&engine=2`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '0029fcb3cfmsh0e1a0622eca19ddp1728d6jsn79315c10cdba',
            'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        if (result.summary) {
            showSummary(result.summary);
        } else {
            showError('Unable to generate summary. Please try another article.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError(`Error: ${error.message}`);
    }
});

function showLoading() {
    summaryDiv.classList.add('hidden');
    summaryDiv.classList.remove('show');
    loadingDiv.classList.remove('hidden');
}

function showSummary(summary) {
    loadingDiv.classList.add('hidden');
    summaryDiv.innerHTML = `<h3>Summary:</h3><p>${summary}</p>`;
    summaryDiv.classList.remove('hidden');
    setTimeout(() => {
        summaryDiv.classList.add('show');
    }, 10);
}

function showError(message) {
    loadingDiv.classList.add('hidden');
    summaryDiv.innerHTML = `<p class="error">${message}</p>`;
    summaryDiv.classList.remove('hidden');
    setTimeout(() => {
        summaryDiv.classList.add('show');
    }, 10);
}

urlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        summarizeBtn.click();
    }
});
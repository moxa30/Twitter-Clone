document.addEventListener('DOMContentLoaded', () => {
    const tweetInput = document.getElementById('tweetInput');
    const postTweetButton = document.getElementById('postTweet');
    const tweetsContainer = document.getElementById('tweetsContainer');

    let tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    renderTweets();

    postTweetButton.addEventListener('click', () => {
        const tweetText = tweetInput.value.trim();
        if (tweetText) {
            const newTweet = {
                id: Date.now(),
                text: tweetText,
                likes: 0
            };
            tweets.push(newTweet);
            localStorage.setItem('tweets', JSON.stringify(tweets));
            renderTweets();
            tweetInput.value = '';
        }
    });

    function renderTweets() {
        tweetsContainer.innerHTML = '';
        tweets.sort((a, b) => b.id - a.id); 
        tweets.forEach(tweet => {
            const tweetDiv = document.createElement('div');
            tweetDiv.classList.add('tweet');

            const tweetContent = document.createElement('div');
            tweetContent.classList.add('tweet-content');
            tweetContent.textContent = tweet.text;

            const likeButton = document.createElement('button');
            likeButton.classList.add('like-button');
            likeButton.textContent = 'Like';
            likeButton.onclick = () => {
                tweet.likes++;
                updateLocalStorage();
                renderTweets();
            };

            const likeCount = document.createElement('span');
            likeCount.classList.add('like-count');
            likeCount.textContent = tweet.likes;

            tweetDiv.appendChild(tweetContent);
            tweetDiv.appendChild(likeButton);
            tweetDiv.appendChild(likeCount);
            tweetsContainer.appendChild(tweetDiv);
        });
    }

    function updateLocalStorage() {
        localStorage.setItem('tweets', JSON.stringify(tweets));
    }
});
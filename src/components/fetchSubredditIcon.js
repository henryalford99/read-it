const fetchSubredditIcon = async (subredditName) => {
    const defaultIconURL = 'https://styles.redditmedia.com/t5_6/styles/communityIcon_a8uzjit9bwr21.png';
    try {
      const response = await fetch(`https://www.reddit.com/${subredditName}/about.json`);
      if (response.ok) {
        const data = await response.json();
        return data.data.icon_img || defaultIconURL;
      }
    } catch (error) {
      console.error(`Error fetching icon for ${subredditName}:`, error);
    }
    return defaultIconURL;
};

export default fetchSubredditIcon;
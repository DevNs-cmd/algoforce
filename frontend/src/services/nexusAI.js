// nexusAI.js — AI service for Nexus IDE

export const parseFileBlocks = async (content) => {
  const fileBlocks = [];
  const regex = /<file\s+path=['"]([^'"]+)['"]\s+action=['"]([^'"]+)['"]>([\s\S]*?)<\/file>/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    fileBlocks.push({
      path: match[1],
      action: match[2],
      content: match[3].trim()
    });
  }

  return fileBlocks;
};

export const fetchStream = async (params, onToken, onComplete) => {
  try {
    const response = await fetch('/api/nexus/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let isFinished = false;
    let fullContent = '';

    while (!isFinished) {
      const { value, done } = await reader.read();
      if (done) {
        isFinished = true;
        break;
      }
      const token = decoder.decode(value);
      fullContent += token;
      onToken(token);
    }

    onComplete(fullContent);
  } catch (err) {
    console.error('Error fetching stream:', err);
    throw err;
  }
};

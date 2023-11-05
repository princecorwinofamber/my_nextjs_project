let intervalIds = {};

const RANDOM_MAX = Math.pow(2, 40);

// Assign a unique random key to the given setInterval id
// so that a malicious frontend cannot iterate through numbers to kill all
// SSE timers on the server
export function saveIntervalId(intervalId) {
  const key = Math.floor(Math.random() * RANDOM_MAX) + '-' + Date.now() + '-' + Math.floor(Math.random() * RANDOM_MAX);
  intervalIds[key] = intervalId;
  return key;
}

export function getIntervalId(key) {
  return intervalIds[key];
}

export function removeIntervalId(key) {
  const intervalId = intervalIds[key];
  delete intervalIds[key];
  return intervalId;
}

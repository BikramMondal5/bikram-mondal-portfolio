// Browser stub for Node.js process object
const processStub = {
  cwd: () => '/',
  env: {},
  browser: true,
  platform: 'browser',
  version: '',
  versions: {}
};

// Make sure process is available globally
if (typeof window !== 'undefined' && !window.process) {
  window.process = processStub;
}

export default processStub;

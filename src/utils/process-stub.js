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

// Named export for the minproc alias used by vfile
export const minproc = processStub;

// Default export for direct imports
export default processStub;

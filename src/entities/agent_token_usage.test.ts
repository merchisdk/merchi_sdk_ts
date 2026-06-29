import { Merchi } from '../merchi.js';

test('can record agent token usage', () => {
  const merchi = new Merchi();
  const usage = new merchi.AgentTokenUsage();
  expect(usage).toBeTruthy();
});

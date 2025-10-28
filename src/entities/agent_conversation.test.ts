import { Merchi } from '../merchi.js';

test('can make AgentConversation', () => {
  const merchi = new Merchi();
  const agentConversation = new merchi.AgentConversation();
  expect(agentConversation).toBeTruthy();
});

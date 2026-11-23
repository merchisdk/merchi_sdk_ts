import { Merchi } from '../merchi.js';

test('can make AgentSkill', () => {
  const merchi = new Merchi();
  const agentSkill = new merchi.AgentSkill();
  expect(agentSkill).toBeTruthy();
});

test('can make AgentSkillVersion', () => {
  const merchi = new Merchi();
  const version = new merchi.AgentSkillVersion();
  expect(version).toBeTruthy();
});

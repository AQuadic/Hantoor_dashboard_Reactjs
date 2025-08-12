// Re-export from fetchAgents.ts for backward compatibility
export {
  createAgent as addAgent,
  type CreateAgentPayload as AgentPayload,
  type Agent,
  type AgentCenter,
  type AgentName,
  type CenterDescription,
} from "./fetchAgents";

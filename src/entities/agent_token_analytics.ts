export interface AgentTokenAnalyticsSummary {
  percentageDifference?: number | null;
  totals?: number;
  previousTotals?: number;
}

export interface AgentTokenAnalyticsTimeseries {
  dates?: string[];
  totalTokens?: number[];
  promptTokens?: number[];
  completionTokens?: number[];
}

export interface ProfileAnalyticsSummaryMetric {
  percentageDifference?: number | null;
  totals?: number | { total?: number; currency?: string };
  previousTotals?: number | { total?: number; currency?: string };
}

export interface CompanyAnalyticsResponse {
  totalJobs?: ProfileAnalyticsSummaryMetric;
  completedJobs?: ProfileAnalyticsSummaryMetric;
  totalInvoices?: ProfileAnalyticsSummaryMetric;
  paymentsReceived?: ProfileAnalyticsSummaryMetric;
  agentTokenUsage?: AgentTokenAnalyticsSummary;
}

export interface DomainAnalyticsResponse extends CompanyAnalyticsResponse {}

export interface AgentTokenUsageRecordPayload {
  companyId?: number;
  domainId?: number;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  sourceType?: string;
  modelName?: string;
  agentConversationId?: number;
  supportConversationId?: number;
}

export interface AgentTokenUsageRecordResponse {
  agentTokenUsage?: {
    id?: number;
    companyId?: number;
    domainId?: number;
    totalTokens?: number;
  };
}

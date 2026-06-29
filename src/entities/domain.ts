import { Cart } from './cart.js';
import { Category } from './category.js';
import { Company } from './company.js';
import { DomainInvitation } from './domain_invitation.js';
import { DomainTag } from './domain_tag.js';
import { EnrolledDomain } from './enrolled_domain.js';
import { Entity } from '../entity.js';
import type {
  AgentTokenAnalyticsTimeseries,
  DomainAnalyticsResponse,
} from './agent_token_analytics.js';
import { MerchiFile } from './file.js';
import { InternalTag } from './internal_tag.js';
import { Invoice } from './invoice.js';
import { Job } from './job.js';
import { Menu } from './menu.js';
import { User } from './user.js';
import { Notification } from './notification.js';
import { Product } from './product.js';
import { Reminder } from './reminder.js';
import { Session } from './session.js';
import { SupplyDomain } from './supply_domain.js';
import { SeoDomainPage } from './seo_domain_page.js';
import { DomainChatSettings } from './domain_chat_settings.js';
import { Theme } from './theme.js';
import { DomainType } from '../constants/domain_types.js';
import { ShipmentMethod } from './shipment_method.js';
import { RequestOptions } from '../request.js';

export type StorefrontChangeRequestStatus =
  | 'created'
  | 'running'
  | 'preview_ready'
  | 'approved'
  | 'rejected';

export interface StorefrontChecksSummary {
  overall?: 'passing' | 'failing' | 'pending' | 'unknown';
  statusState?: string;
  counts?: {
    total?: number;
    passed?: number;
    failed?: number;
    pending?: number;
    neutral?: number;
  };
  updatedAt?: string;
}

export interface StorefrontExecutionEvent {
  timestamp: string;
  stage: string;
  level?: 'info' | 'error' | string;
  message: string;
  metadata?: Record<string, any>;
}

export interface StorefrontRequestContextImage {
  name: string;
  mimeType?: string | null;
  dataUrl: string;
}

export interface StorefrontV2ChangeRequestPayload {
  prompt: string;
  contextFilePaths?: string[];
  contextImages?: StorefrontRequestContextImage[];
  branchName?: string;
  startNewBranch?: boolean;
  clarificationAnswers?: Record<string, string | string[]>;
  generationBriefSummary?: string;
  generationBoilerplateFit?: string;
  clarificationSkipped?: boolean;
}

export interface StorefrontV2ChangeRequestRunPayload {
  status?: 'running' | 'preview_ready';
  branchName?: string;
  commitSha?: string;
  previewUrl?: string;
  summary?: string;
  pullRequestNumber?: number;
  checksSummary?: StorefrontChecksSummary;
  checksUpdatedAt?: string;
  errorDetails?: string;
}

export interface StorefrontV2ChangeRequestRejectPayload {
  errorDetails?: string;
}

export interface StorefrontV2ChangeRequest {
  id: number;
  domainId: number;
  storefrontV2Id: number;
  requestedByUserId?: number | null;
  status: StorefrontChangeRequestStatus;
  prompt: string;
  branchName?: string | null;
  commitSha?: string | null;
  pullRequestNumber?: number | null;
  previewUrl?: string | null;
  summary?: string | null;
  checksSummary?: StorefrontChecksSummary | null;
  checksUpdatedAt?: string | null;
  errorDetails?: string | null;
  executionEvents?: StorefrontExecutionEvent[] | null;
  creationDate?: string | null;
  updatedAt?: string | null;
}

export interface StorefrontV2Config {
  id?: number;
  domainId?: number;
  status?: 'provisioning' | 'ready' | 'failed' | 'archived' | string;
  starterTemplate?: string | null;
  urlStructure?: string | null;
  defaultBranch?: string | null;
  activePreviewBranchName?: string | null;
  activePreviewStartedAt?: string | null;
  activePreviewLastRequestId?: number | null;
  repoProvider?: string | null;
  repoOwner?: string | null;
  repoName?: string | null;
  vercelProjectId?: string | null;
  lastSuccessfulCommitSha?: string | null;
  approvedStarterTemplates?: string[];
  providerMode?: 'real' | 'deterministic' | 'unknown' | string;
  isProvisioned?: boolean;
  creationDate?: string | null;
  updatedAt?: string | null;
}

export interface StorefrontV2GetResponse {
  storefrontV2?: StorefrontV2Config;
  isProvisioned?: boolean;
  provisioned?: boolean;
  providerMode?: string;
  approvedStarterTemplates?: string[];
}

export interface StorefrontV2ProvisionPayload {
  starterTemplate?: string;
  urlStructure?: string;
}

export interface StorefrontV2StarterTemplateUrlStructureResult {
  starterTemplate: string;
  urlStructure: string;
}

export interface StorefrontV2SiteContextInput {
  url?: string;
  sourceUrl?: string;
}

export interface StorefrontV2GenerationBriefQuestionOption {
  id: string;
  label: string;
}

export interface StorefrontV2GenerationBriefQuestion {
  id: string;
  topicId: string;
  prompt: string;
  type: 'single' | 'multi' | 'text';
  options?: StorefrontV2GenerationBriefQuestionOption[];
  required?: boolean;
}

export interface StorefrontV2GenerationBriefGapTopic {
  id: string;
  category: string;
  severity: 'high' | 'medium' | 'low' | string;
  evidence: string;
  suggestedOptions?: string[];
}

export interface StorefrontV2GenerationBrief {
  planSummary: string;
  boilerplateFit: string;
  gapTopics: StorefrontV2GenerationBriefGapTopic[];
  questions: StorefrontV2GenerationBriefQuestion[];
  questionCount: number;
}

export interface StorefrontV2GenerationBriefPayload {
  siteContext: StorefrontV2SiteContext;
  urlStructure?: string;
  starterTemplate?: string;
}

export interface StorefrontV2ResetResult {
  status: string;
  isProvisioned: boolean;
  providerMode?: 'real' | 'deterministic' | 'unknown' | string;
  approvedStarterTemplates?: string[];
}

export interface StorefrontV2RepositoryTreeEntry {
  name: string;
  path: string;
  type: 'directory' | 'file';
}

export interface StorefrontV2RepositoryTree {
  path: string;
  ref: string;
  entries: StorefrontV2RepositoryTreeEntry[];
}

export interface StorefrontV2RepositoryBranches {
  defaultBranch: string;
  activeBranchName?: string | null;
  branches: string[];
}

export interface StorefrontV2RepositoryFile {
  path: string;
  ref: string;
  sha?: string;
  content: string;
}

export interface StorefrontV2RepositoryFileUpdate {
  path: string;
  branch: string;
  commitSha: string;
}

export interface StorefrontV2RepositoryFileUpdatePayload {
  path: string;
  content: string;
  message?: string;
  branch?: string;
}

export interface StorefrontV2Deployment {
  id: string;
  environment: 'preview' | 'production' | string;
  status: string;
  commitSha?: string | null;
  url?: string | null;
}

export interface StorefrontV2DeploymentLog {
  timestamp: string;
  level: string;
  message: string;
}

export interface StorefrontV2RollbackResult {
  status: string;
  targetCommitSha: string;
  deployment?: {
    deploymentId: string;
    status?: string;
  };
}

export interface StorefrontV2ProductPublishResult {
  action: 'deploy' | 'recache' | string;
  productName?: string | null;
  status?: string;
  productUrl?: string;
  deploymentId?: string;
  previewUrl?: string;
  branchName?: string;
  message?: string;
  httpStatus?: number;
}

export interface StorefrontV2CategoryPublishResult {
  action: 'deploy' | 'recache' | string;
  categoryName?: string | null;
  status?: string;
  categoryUrl?: string;
  deploymentId?: string;
  previewUrl?: string;
  branchName?: string;
  message?: string;
  httpStatus?: number;
}

export interface StorefrontV2ProductPublishPayload {
  productName?: string;
  productUrl?: string;
  branchName?: string;
}

export interface StorefrontV2CategoryPublishPayload {
  categoryName?: string;
  categoryUrl?: string;
  branchName?: string;
}

export interface StorefrontV2EmulationRoute {
  name?: string;
  path: string;
  pageType?: string;
  targetFile?: string;
}

export interface StorefrontV2EmulationSpec {
  routeContract?: {
    recommendedUrlStructure?: string;
    dynamicParams?: string[];
    routes?: StorefrontV2EmulationRoute[];
  };
  componentMapping?: Array<{
    section?: string;
    sourceSignals?: string[];
    boilerplateTargets?: string[];
    implementationNotes?: string;
  }>;
}

export interface StorefrontV2PageAnalysisItem {
  url: string;
  title?: string | null;
  description?: string | null;
  h1?: string | null;
  headings?: string[];
  contentPreview?: string | null;
}

export interface StorefrontV2SiteContext {
  sourceUrl: string;
  style?: {
    title?: string | null;
    description?: string | null;
    colors?: string[];
    fontFamilies?: string[];
  } | null;
  sitemap?: string[];
  navigation?: Array<{label?: string; url: string}>;
  categories?: string[];
  products?: string[];
  scrapedCategories?: string[];
  scrapedProducts?: string[];
  domainCatalog?: {
    categories?: Array<{id?: number; name?: string; slug?: string}>;
    products?: Array<{
      id?: number;
      name?: string;
      slug?: string;
      categories?: Array<{id?: number; name?: string; slug?: string}>;
    }>;
  } | null;
  catalogMapping?: {
    categories?: Array<{
      domainCategoryId?: number;
      domainCategoryName?: string;
      domainCategorySlug?: string;
      scrapedCategoryLabel?: string | null;
      matchedScrapedUrl?: string | null;
      matchSource?: string | null;
    }>;
    products?: Array<{
      domainProductId?: number;
      domainProductName?: string;
      domainProductSlug?: string;
      domainCategoryIds?: number[];
      domainCategoryNames?: string[];
      scrapedProductLabel?: string | null;
      matchedScrapedUrl?: string | null;
      matchSource?: string | null;
    }>;
  } | null;
  tracking?: Array<{provider?: string; value?: string}>;
  wireframe?: string[];
  stylesheets?: Array<{url: string; content: string}>;
  pageAnalysis?: StorefrontV2PageAnalysisItem[];
  emulationSpec?: StorefrontV2EmulationSpec | null;
  analysisMarkdown?: string | null;
  analysisFilePath?: string | null;
  analysisJsonFilePath?: string | null;
  analysisScreenshotPaths?: string[];
  analysisScreenshots?: Array<{
    name?: string;
    pageUrl?: string;
    path?: string;
    viewport?: string;
    width?: number;
    height?: number;
    screenshotUrl?: string;
    mimeType?: string;
    dataUrl?: string;
  }>;
  analysisBranch?: string | null;
  analysisCommitSha?: string | null;
  analysisJsonCommitSha?: string | null;
}

export class Domain extends Entity {
  protected static resourceName = 'domains';
  protected static singularName = 'domain';
  protected static pluralName = 'domains';

  @Domain.property({type: Date})
  public archived?: Date | null;

  @Domain.property()
  public id?: number;

  @Domain.property()
  public domain?: string;

  @Domain.property()
  public country?: string;

  @Domain.property()
  public currency?: string;

  @Domain.property()
  public callToActions?: string;

  @Domain.property()
  public callToActionDetails?: any[];

  @Domain.property()
  public isMaster?: boolean;

  @Domain.property()
  public deploymentOnline?: boolean;

  @Domain.property()
  public deploymentInProgress?: boolean;

  @Domain.property()
  public deploymentSucceeded?: boolean;

  @Domain.property()
  public deploymentMessage?: string;

  @Domain.property()
  public deploymentKey?: string;

  @Domain.property()
  public internalUseNotes?: string;

  @Domain.property()
  public internalUseAiContext?: string;

  @Domain.property()
  public aiContext?: string;

  @Domain.property()
  public domainType?: DomainType;

  @Domain.property()
  public subDomain?: string;

  @Domain.property()
  public emailDomain?: string;

  @Domain.property()
  public smsName?: string;

  @Domain.property()
  public showDomainPublicly?: boolean;

  @Domain.property()
  public publicAccessRestricted?: boolean;

  @Domain.property()
  public showDomainToAccessibleEntitiesOnly?: boolean;

  @Domain.property()
  public enableEmailNotifications?: boolean;

  @Domain.property()
  public enableSmsNotifications?: boolean;

  @Domain.property()
  public mailgunRecords?: any[];

  @Domain.property()
  public enableNotifications?: boolean;

  @Domain.property()
  public assignToAgent?: boolean;

  @Domain.property({ type: User })
  public merchiAgentUser?: User | null;

  @Domain.property({type: String})
  public trackingCodeGoogleConversion?: string | null;

  @Domain.property({type: String})
  public trackingCodeGoogleGlobal?: string | null;

  @Domain.property({type: String})
  public apiSecret?: string | null;

  @Domain.property({type: String})
  public webflowApiKey?: string | null;

  @Domain.property({type: String})
  public telegramChatId?: string;

  @Domain.property({type: String})
  public shopifyShopUrl?: string | null;

  @Domain.property()
  public shopifyIsActive?: boolean;

  @Domain.property({type: String})
  public qrShopQrCode?: string | null;

  @Domain.property({type: String})
  public unltdAiApiOrganizationId?: string;

  @Domain.property({type: String})
  public unltdAiApiSecretKey?: string;

  @Domain.property({type: String})
  public scalablePressApiKey?: string;

  @Domain.property({type: String})
  public googleMerchantApiKey?: string;

  @Domain.property({type: String})
  public googleMerchantId?: string;

  @Domain.property({type: Boolean})
  public googleProductReviewsFeedEnabled?: boolean;

  @Domain.property({type: String})
  public googleProductReviewsFeedToken?: string | null;

  @Domain.property({type: String})
  public googleProductReviewsFeedUrl?: string | null;

  @Domain.property({type: String})
  public socialBitchute?: string | null;

  @Domain.property({type: String})
  public socialDiscord?: string | null;

  @Domain.property({type: String})
  public socialFacebook?: string | null;

  @Domain.property({type: String})
  public socialGoogle?: string | null;

  @Domain.property({type: String})
  public socialInstagram?: string | null;

  @Domain.property({type: String})
  public socialLinkedin?: string | null;

  @Domain.property({type: String})
  public socialRumble?: string | null;

  @Domain.property({type: String})
  public socialTelegram?: string | null;

  @Domain.property({type: String})
  public socialTiktok?: string | null;

  @Domain.property({type: String})
  public socialX?: string | null;

  @Domain.property({type: String})
  public socialYoutube?: string | null;

  @Domain.property()
  public ownedBy?: Company;

  @Domain.property()
  public company?: Company;

  @Domain.property({type: MerchiFile})
  public logo?: MerchiFile | null;

  @Domain.property({type: MerchiFile})
  public favicon?: MerchiFile | null;

  @Domain.property({arrayType: 'ShipmentMethod'})
  public shipmentMethods?: ShipmentMethod[];

  @Domain.property()
  public activeTheme?: Theme;

  @Domain.property({arrayType: 'InternalTag'})
  public internalTags?: InternalTag[];

  @Domain.property({arrayType: 'DomainTag'})
  public tags?: DomainTag[];

  @Domain.property({arrayType: 'Domain'})
  public canSupply?: Domain[];

  @Domain.property({arrayType: 'Domain'})
  public suppliedBy?: Domain[];

  @Domain.property({arrayType: 'User'})
  public accessibleClients?: User[];

  @Domain.property({arrayType: 'Company'})
  public accessibleClientCompanies?: Company[];

  @Domain.property({arrayType: 'Menu'})
  public menus?: Menu[];

  @Domain.property({arrayType: 'Session'})
  public sessions?: Session[];

  @Domain.property({arrayType: 'Category'})
  public categories?: Category[];

  @Domain.property({arrayType: 'Notification'})
  public notifications?: Notification[];

  @Domain.property({arrayType: 'Reminder'})
  public reminders?: Reminder[];

  @Domain.property({arrayType: 'Product'})
  public products?: Product[];

  @Domain.property({arrayType: 'SupplyDomain'})
  public supplyProducts?: SupplyDomain[];

  @Domain.property({arrayType: 'Job'})
  public jobs?: Job[];

  @Domain.property({arrayType: 'User'})
  public jobsAssignees?: User[];

  @Domain.property({arrayType: 'Cart'})
  public carts?: Cart[];

  @Domain.property({arrayType: 'EnrolledDomain'})
  public enrollments?: EnrolledDomain[];

  @Domain.property({arrayType: 'Invoice'})
  public invoices?: Invoice[];

  @Domain.property({arrayType: 'DomainInvitation'})
  public domainInvitations?: DomainInvitation[];

  @Domain.property({arrayType: 'SeoDomainPage'})
  public seoDomainPages?: SeoDomainPage[];

  @Domain.property({ type: DomainChatSettings })
  public domainChatSettings?: DomainChatSettings | null;

  @Domain.property({arrayType: 'Theme'})
  public themes?: Theme[];

  public defaultTaxType = () => {
    if (this.company === undefined) {
      throw new Error('company is undefined, did you forget to embed it?');
    }
    if (this.company.defaultTaxType === undefined) {
      const err = 'company.defaultTaxType is undefined, did you forget to' +
        ' embed it?';
      throw new Error(err);
    }
    return this.company.defaultTaxType;
  };

  public getActiveTheme = (): Theme => {
    if (this.activeTheme === undefined) {
      throw new Error('activeTheme is undefined, did you forget to embed it?');
    }
    return this.activeTheme!;
  };

  private getDomainId = () => {
    if (this.id === undefined || this.id === null) {
      throw new Error('id is undefined, did you forget to set it?');
    }
    return this.id;
  };

  private storefrontV2DomainResource = (suffix = '') => {
    return `/domains/${this.getDomainId()}/storefront_v2/${suffix}`;
  };

  private storefrontV2Request = (
    resource: string,
    method: 'GET' | 'POST',
    payload?: Record<string, any>,
    queryParams?: Record<string, string | undefined>
  ) => {
    const query: Array<[string, string]> = [['skip_rights', 'y']];
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          query.push([key, value]);
        }
      });
    }
    const fetchOptions: RequestOptions = {
      method: method,
      query: query
    };
    if (payload !== undefined) {
      fetchOptions.body = JSON.stringify(payload);
      fetchOptions.headers = {'Content-Type': 'application/json'};
    }
    return this.merchi.authenticatedFetch(resource, fetchOptions);
  };

  public getStorefrontV2 = (): Promise<StorefrontV2GetResponse> => {
    return this.storefrontV2Request(this.storefrontV2DomainResource(), 'GET');
  };

  public provisionStorefrontV2 = (
    payload?: StorefrontV2ProvisionPayload
  ): Promise<{storefrontV2: StorefrontV2Config}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('provision/'),
      'POST',
      payload
    );
  };

  public resolveStarterTemplateUrlStructure = (
    payload: {starterTemplate: string}
  ): Promise<StorefrontV2StarterTemplateUrlStructureResult> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('starter_template/url_structure/'),
      'POST',
      payload
    ) as Promise<StorefrontV2StarterTemplateUrlStructureResult>;
  };

  public extractStorefrontV2SiteContext = (
    payload: StorefrontV2SiteContextInput
  ): Promise<{siteContext: StorefrontV2SiteContext}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('site_context/extract/'),
      'POST',
      payload
    ) as Promise<{siteContext: StorefrontV2SiteContext}>;
  };

  public createStorefrontV2GenerationBrief = (
    payload: StorefrontV2GenerationBriefPayload
  ): Promise<{generationBrief: StorefrontV2GenerationBrief}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('generation_brief/'),
      'POST',
      payload
    ) as Promise<{generationBrief: StorefrontV2GenerationBrief}>;
  };

  public resetStorefrontV2 = (): Promise<StorefrontV2ResetResult> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('reset/'),
      'POST'
    ) as Promise<StorefrontV2ResetResult>;
  };

  public createStorefrontChangeRequest = (
    payload?: StorefrontV2ChangeRequestPayload
  ): Promise<{storefrontChangeRequest: StorefrontV2ChangeRequest}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('requests/'),
      'POST',
      payload
    ) as Promise<{storefrontChangeRequest: StorefrontV2ChangeRequest}>;
  };

  public getStorefrontChangeRequest = (
    requestId: number | string
  ): Promise<{storefrontChangeRequest: StorefrontV2ChangeRequest}> => {
    return this.storefrontV2Request(
      `/storefront_change_requests/${String(requestId)}/`,
      'GET'
    ) as Promise<{storefrontChangeRequest: StorefrontV2ChangeRequest}>;
  };

  public getStorefrontChangeRequestEvents = (
    requestId: number | string
  ): Promise<{requestId: number; events: StorefrontExecutionEvent[]}> => {
    return this.storefrontV2Request(
      `/storefront_change_requests/${String(requestId)}/events/`,
      'GET'
    ) as Promise<{requestId: number; events: StorefrontExecutionEvent[]}>;
  };

  public runStorefrontChangeRequest = (
    requestId: number | string,
    payload?: StorefrontV2ChangeRequestRunPayload
  ): Promise<{storefrontChangeRequest: StorefrontV2ChangeRequest}> => {
    return this.storefrontV2Request(
      `/storefront_change_requests/${String(requestId)}/run/`,
      'POST',
      payload
    ) as Promise<{storefrontChangeRequest: StorefrontV2ChangeRequest}>;
  };

  public approveStorefrontChangeRequest = (
    requestId: number | string,
    payload?: Record<string, any>
  ): Promise<{storefrontChangeRequest: StorefrontV2ChangeRequest}> => {
    return this.storefrontV2Request(
      `/storefront_change_requests/${String(requestId)}/approve/`,
      'POST',
      payload
    ) as Promise<{storefrontChangeRequest: StorefrontV2ChangeRequest}>;
  };

  public rejectStorefrontChangeRequest = (
    requestId: number | string,
    payload?: StorefrontV2ChangeRequestRejectPayload
  ): Promise<{storefrontChangeRequest: StorefrontV2ChangeRequest}> => {
    return this.storefrontV2Request(
      `/storefront_change_requests/${String(requestId)}/reject/`,
      'POST',
      payload
    ) as Promise<{storefrontChangeRequest: StorefrontV2ChangeRequest}>;
  };

  public getStorefrontV2Deployments = (): Promise<{deployments: StorefrontV2Deployment[]}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('deployments/'),
      'GET'
    ) as Promise<{deployments: StorefrontV2Deployment[]}>;
  };

  public getStorefrontV2DeploymentLogs = (
    deploymentId: number | string
  ): Promise<{deploymentId: string; logs: StorefrontV2DeploymentLog[]}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource(`deployments/${String(deploymentId)}/logs/`),
      'GET'
    ) as Promise<{deploymentId: string; logs: StorefrontV2DeploymentLog[]}>;
  };

  public rollbackStorefrontV2 = (): Promise<{rollback: StorefrontV2RollbackResult}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('rollback/'),
      'POST'
    ) as Promise<{rollback: StorefrontV2RollbackResult}>;
  };

  public getStorefrontV2RepositoryTree = (input?: {
    path?: string;
    ref?: string;
  }): Promise<{repositoryTree: StorefrontV2RepositoryTree}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('repository_tree/'),
      'GET',
      undefined,
      input
    ) as Promise<{repositoryTree: StorefrontV2RepositoryTree}>;
  };

  public getStorefrontV2RepositoryBranches = (): Promise<{
    repositoryBranches: StorefrontV2RepositoryBranches;
  }> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('repository_branches/'),
      'GET'
    ) as Promise<{repositoryBranches: StorefrontV2RepositoryBranches}>;
  };

  public getStorefrontV2RepositoryFile = (
    path: string,
    input?: {ref?: string}
  ): Promise<{repositoryFile: StorefrontV2RepositoryFile}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('repository_file/'),
      'GET',
      undefined,
      {path, ...input}
    ) as Promise<{repositoryFile: StorefrontV2RepositoryFile}>;
  };

  public updateStorefrontV2RepositoryFile = (
    payload: StorefrontV2RepositoryFileUpdatePayload
  ): Promise<{repositoryFileUpdate: StorefrontV2RepositoryFileUpdate}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('repository_file/'),
      'POST',
      payload
    ) as Promise<{repositoryFileUpdate: StorefrontV2RepositoryFileUpdate}>;
  };

  public publishStorefrontV2Product = (
    payload?: StorefrontV2ProductPublishPayload
  ): Promise<{productPublish: StorefrontV2ProductPublishResult}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('products/publish/'),
      'POST',
      payload
    ) as Promise<{productPublish: StorefrontV2ProductPublishResult}>;
  };

  public publishStorefrontV2Category = (
    payload?: StorefrontV2CategoryPublishPayload
  ): Promise<{categoryPublish: StorefrontV2CategoryPublishResult}> => {
    return this.storefrontV2Request(
      this.storefrontV2DomainResource('categories/publish/'),
      'POST',
      payload
    ) as Promise<{categoryPublish: StorefrontV2CategoryPublishResult}>;
  };

  public getAnalytics = (): Promise<DomainAnalyticsResponse> => {
    return this.storefrontV2Request(
      `/domains/${this.getDomainId()}/analytics/`,
      'GET'
    ) as Promise<DomainAnalyticsResponse>;
  };

  public getAgentTokenAnalytics = (
    queryParams?: Record<string, string | undefined>
  ): Promise<AgentTokenAnalyticsTimeseries> => {
    return this.storefrontV2Request(
      `/domains/${this.getDomainId()}/agent_token_analytics/`,
      'GET',
      undefined,
      queryParams
    ) as Promise<AgentTokenAnalyticsTimeseries>;
  };
}

# Clip Financial

Clip Financial is a finance workflow consulting platform built with SvelteKit and AWS. The application provides a public-facing website for prospective clients, inquiry submission workflows, and integration with a serverless AWS backend for inquiry processing, auditing, and notifications.

## Features

### Marketing Website

- Responsive SvelteKit website
- Finance workflow consulting service information
- Discovery, assessment, and implementation process overview
- Contact and inquiry submission forms
- SEO metadata and Open Graph support

### Inquiry Management

- Submit workflow review requests
- Store inquiries in DynamoDB
- Inquiry status tracking
- New inquiry dashboard indicators
- Individual inquiry detail views
- Inquiry filtering by status
- Inquiry history and audit trail support

### Event-Driven Architecture

- Inquiry creation events published to EventBridge
- Fan-out processing to multiple consumers
- Independent notification and audit workflows
- Failure isolation between consumers

### Notifications

- SES email notifications
- Secrets Manager integration for email configuration
- Event-driven notification processing

### Auditing

- Dedicated audit records stored in DynamoDB
- SQS-backed audit processing
- Message retry support
- Event history tracking

### Security

- IAM least-privilege permissions
- AWS Secrets Manager for sensitive configuration
- Environment-based configuration
- CloudFront protected admin application

### Infrastructure

- AWS CDK Infrastructure as Code
- API Gateway
- Lambda
- DynamoDB
- EventBridge
- SQS
- SES
- Secrets Manager
- S3
- CloudFront

### CI/CD

- GitHub Actions deployment pipeline
- Automated builds
- Infrastructure deployment through CDK
- CloudFront cache invalidation

---

## Architecture

```text
User
 ↓
SvelteKit Website
 ↓
API Gateway
 ↓
Lambda
 ↓
DynamoDB

Inquiry Created
 ↓
EventBridge
 ├── Email Consumer
 │     ↓
 │    SES
 │
 └── Audit Queue
       ↓
      SQS
       ↓
   Audit Lambda
       ↓
    DynamoDB
```

---

## Technology Stack

### Frontend

- SvelteKit
- TypeScript
- Tailwind CSS

### Backend

- AWS Lambda
- API Gateway
- DynamoDB
- EventBridge
- SQS
- SES
- Secrets Manager

### Infrastructure

- AWS CDK
- CloudFront
- S3
- IAM

---

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Repository Structure

- `clip-web` — Public SvelteKit website
- `clip-admin` — React administrative application
- `infra` — AWS CDK infrastructure definitions
- `lambdas` — Serverless backend services
- `shared` — Shared TypeScript types and contracts

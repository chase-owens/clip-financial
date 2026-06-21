# Clip Financial

Clip Financial is a finance workflow consulting platform built using a modern serverless AWS architecture.

The project consists of a public-facing marketing website, an administrative application, Infrastructure as Code (IaC), and event-driven backend services used to process inquiries, maintain audit records, and deliver notifications.

---

## Overview

Clip Financial helps organizations identify bottlenecks in finance and accounting workflows by providing:

- Workflow assessments
- Process optimization recommendations
- Operational consulting
- Inquiry management
- Audit tracking
- Automated notification workflows

---

## Architecture

```text
Customer
    │
    ▼
SvelteKit Website
    │
    ▼
API Gateway
    │
    ▼
Lambda Functions
    │
    ▼
DynamoDB

Inquiry Created
    │
    ▼
EventBridge
 ├── Email Consumer
 │      ▼
 │     SES
 │
 └── Audit Queue
         ▼
        SQS
         ▼
    Audit Lambda
         ▼
      DynamoDB
```

---

## Repository Structure

```text
clip-financial/
│
├── clip-web-prod/      Public SvelteKit website
├── clip-admin/         React administration portal
├── infra/              AWS CDK infrastructure
├── lambdas/            Serverless backend services
├── shared/             Shared TypeScript types
│
└── README.md
```

### Applications

#### clip-web-prod

Public-facing website built with:

- SvelteKit
- TypeScript
- Tailwind CSS

Features:

- Marketing pages
- Services overview
- Contact forms
- Inquiry submission workflow
- SEO optimization

---

#### clip-admin

Administrative application built with:

- React
- TypeScript
- React Router

Features:

- Content management
- Inquiry management
- Dashboard metrics
- Inquiry status updates
- Audit visibility

Protected through CloudFront authentication.

---

#### infra

Infrastructure as Code using AWS CDK.

Resources include:

- API Gateway
- Lambda
- DynamoDB
- EventBridge
- SQS
- SES
- Secrets Manager
- S3
- CloudFront
- IAM

---

#### lambdas

Serverless backend services responsible for:

- Creating inquiries
- Listing inquiries
- Updating inquiries
- Managing content
- Audit processing
- Email notifications

---

#### shared

Shared TypeScript contracts used across:

- Website
- Admin application
- Lambda services

---

## AWS Services Used

| Service         | Purpose                     |
| --------------- | --------------------------- |
| API Gateway     | Public API endpoints        |
| Lambda          | Business logic              |
| DynamoDB        | Inquiry and audit storage   |
| EventBridge     | Event routing               |
| SQS             | Asynchronous processing     |
| SES             | Email notifications         |
| Secrets Manager | Secure configuration        |
| S3              | Static assets and content   |
| CloudFront      | Content delivery            |
| IAM             | Security and permissions    |
| CDK             | Infrastructure provisioning |

---

## Key Patterns

### Event-Driven Architecture

Inquiry creation publishes an event to EventBridge.

Consumers process the event independently:

- Email notifications
- Audit record creation

---

### Failure Isolation

Audit processing and email notifications are decoupled from inquiry creation.

Failures in downstream consumers do not impact the customer experience.

---

### Infrastructure as Code

All production infrastructure is managed through AWS CDK.

Infrastructure changes are version-controlled and deployed through code.

---

## Development

### Install Dependencies

```bash
npm install
```

### Website

```bash
cd clip-web-prod
npm run dev
```

### Admin

```bash
cd clip-admin
npm run dev
```

### Infrastructure

```bash
cd infra
npx cdk deploy
```

---

## Future Enhancements

- Dead Letter Queue (DLQ) support
- Message redrive workflows
- Optimistic concurrency controls
- Enhanced audit history views
- Cognito-based authentication
- Role-based access control

import type { INotification } from "~/types";

export const NOTIFICATIONS: INotification[] = [
  // Customer Success & Sales
  {
    notificationId: "CSS-2026-00542",
    type: "customerSuccess",
    subject: "Onboarding Abandoned",
    summary:
      "Greenwood International Schools started onboarding 7 days ago but has not completed. Please follow up to help them complete onboarding.",
    relatedSchool: {
      schoolId: "SCH1350",
      schoolName: "Greenwood International Schools",
      schoolStatus: "ACTIVE",
      schoolCode: "GRNFD-0054",
      contactPerson: "Mr. Samuel Okafor",
      phoneNumber: "+234 903 345 3456",
      emailAddress: "admin@greenwood.edu.ng",
      state: "Lagos",
      country: "Nigeria",
      dateStarted: "May 17, 2026",
    },
    receivedAt: "2026-08-14T06:50:00Z",
    priority: "LOW",
    isRead: false,
    isArchived: false,
    assignedToMe: false,
    category: "Onboarding",
    notificationStatus: "IN_PROGRESS",
    description:
      "Greenwood International Schools started onboarding on May 17, 2026 but has not completed the required setup steps. Please follow up to help them complete onboarding.",
    onboardingProgress: {
      schoolInformation: "COMPLETED",
      adminAccountSetup: "COMPLETED",
      schoolProfileSetup: "COMPLETED",
      subscriptionPlan: "COMPLETED",
      paymentMethod: "PENDING",
      inviteStaff: "PENDING",
    },
    actionHistory: [
      {
        userId: "USR001",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-08-14T06:50:00Z",
      },
      {
        userId: "USR002",
        actionTaken:
          "Checked onboarding status. Waiting for payment method to be added.",
        TimeStamp: "2026-07-14T06:50:00Z",
      },
    ],
    notificationLifecycle: [
      {
        stage: "GENERATED",
        TimeStamp: "2026-04-14T06:50:00Z",
      },
      {
        stage: "ASSIGNED",
        TimeStamp: "2026-06-14T06:50:00Z",
      },
      {
        stage: "VIEWED",
        TimeStamp: "pending",
      },
      {
        stage: "ACTION_TAKEN",
        TimeStamp: "pending",
      },
    ],
  },

  // Finance
  {
    notificationId: "FIN-2026-07512",
    type: "finance",
    subject: "Failed Subscription Payment",
    summary: "payment of NGN 250,00 for Standard annual Plan ",
    financeType: "DISPUTE",
    relatedSchool: {
      schoolId: "SCH2461",
      schoolName: "Royal Crest Academy",
      schoolStatus: "ACTIVE",
      schoolCode: "RCA-0054",
      contactPerson: "Mr. Samuel Okafor",
      phoneNumber: "+234 803 123 4567",
      emailAddress: "admin@royalcrest.edu.ng",
      subscriptionplan: "STANDARD",
      subscriptionStatus: "PAYMENT_FAILED",
      nextBillingDate: "Jun 24, 2026",
    },
    amount: 250000,
    receivedAt: "2026-08-10T09:10:00Z",
    priority: "HIGH",
    isRead: false,
    isArchived: false,
    assignedToMe: false,
    assignedMember: {
      userId: "USR003",
    },
    category: "Finance",
    notificationStatus: "NEW",
    description:
      "Subscription payment of NGN 250,000 for the Standard Annual Plan has failed.The payment was attempted on August 24, 2026 at 10:25 AM via Paystack. Failure reason: Insufficient balance in the card.",
    paymentInformation: {
      amount: 250000,
      paymentReference: "PSK_98230123_ABCD",
      paymentMethod: "CARD",
      cardType: "MASTERCARD",
      cardNumber: "1234567890123456",
      // paymentMethod: "BANK_TRANSFER",
      // bankName: "Access Bank",
      // accountNumber: "1234567890",
      attemptedOn: "2026-08-24T10:25:00Z",
      failureReason: "Insufficient balance in the card",
    },
    actionHistory: [
      {
        userId: "USR003",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-08-14T06:50:00Z",
      },
      {
        userId: "USR004",
        actionTaken:
          "Checked onboarding status. Waiting for payment method to be added.",
        TimeStamp: "2026-07-14T06:50:00Z",
      },
      {
        userId: "USR005",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-03-18T06:50:00Z",
      },
    ],
    notificationLifecycle: [
      {
        stage: "GENERATED",
        TimeStamp: "2026-04-14T06:50:00Z",
      },
      {
        stage: "ASSIGNED",
        TimeStamp: "2026-06-14T06:50:00Z",
      },
      {
        stage: "VIEWED",
        TimeStamp: "pending",
      },
      {
        stage: "ACTION_TAKEN",
        TimeStamp: "pending",
      },
    ],
  },

  // Customer Support
  {
    notificationId: "CS-2026-00112",
    type: "customerSupport",
    subject: "Payment gateway not working",
    summary: "Our parents are unable to make payments online.",
    relatedSchool: {
      schoolId: "SCH6699",
      schoolName: "Excel Scholars Academy",
      schoolStatus: "ACTIVE",
      schoolCode: "ESA-0054",
      contactPerson: "Mr John Adeyemi",
      phoneNumber: "+234 803 123 4567",
      emailAddress: "admin@excelscholars.edu.ng",
      subscriptionplan: "STANDARD",
      subscriptionStatus: "PAYMENT_FAILED",
      nextBillingDate: "Jun 24, 2026",
    },
    notificationStatus: "NEW",
    receivedAt: "2026-08-10T09:10:00Z",
    priority: "HIGH",
    isRead: false,
    isArchived: false,
    assignedToMe: false,
    assignedMember: {
      userId: "USR006",
    },
    category: "Escalated Ticket",
    description:
      "Our parents are unable to make payments. After entering card details and clicking pay, it shows an error. This has been reported by multiple parents.",
    ticketInformation: {
      slaResponseTime: "6 hours",
      firstResponseTime: "4 hours",
      firstResponseDue: "2026-05-24T12:15:00Z",
      resolutionDue: "2026-05-24T04:15:00Z",
      slaStatus: "1h 30m Overdue",
      currentAssignee: {
        userId: "USR006",
      },
    },
    customerMessage: {
      message:
        "Our parents are unable to make payments. After entering card details and clicking pay, it shows an error. This has been reported by multiple parents.",
      attachments: [
        {
          id: "ATT-001",
          fileName: "Screenshot_2026-08-24_14-32.png",
          fileType: "PNG",
          fileSizeBytes: 2_097_152, // 2 MB in bytes
          url: "/images/customerScreenShot.png",
        },
        {
          id: "ATT-002",
          fileName: "Error_log.txt",
          fileType: "TXT",
          fileSizeBytes: 8_600, // 8.4 KB in bytes
          url: "/files/error_log_cs-2026-00112.txt",
        },
      ],
    },
    actionHistory: [
      {
        userId: "USR7006",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-08-14T06:50:00Z",
      },
      {
        userId: "USR001",
        actionTaken:
          "Checked onboarding status. Waiting for payment method to be added.",
        TimeStamp: "2026-07-14T06:50:00Z",
      },
    ],
    notificationLifecycle: [
      {
        stage: "GENERATED",
        TimeStamp: "2026-04-14T06:50:00Z",
      },
      {
        stage: "ASSIGNED",
        TimeStamp: "2026-06-14T06:50:00Z",
      },
      {
        stage: "VIEWED",
        TimeStamp: "pending",
      },
      {
        stage: "ACTION_TAKEN",
        TimeStamp: "pending",
      },
    ],
  },

  // Security
  {
    notificationId: "SEC-2026-00674",
    type: "security",
    subject: "Multiple Failed Login Attempts",
    summary: "User john.doe@brightway.edu.ng had 6 failed login attempts",
    relatedSchool: {
      schoolId: "SCH2964",
      schoolName: "Brightway Academy",
      schoolStatus: "ACTIVE",
      schoolCode: "BRGA-0012",
      contactPerson: "Mr John Adeyemi",
      phoneNumber: "+234 903 123 6789",
      emailAddress: "admin@brightway.edu.ng",
      subscriptionplan: "STANDARD",
      subscriptionStatus: "ACTIVE",
    },
    notificationStatus: "NEW",
    receivedAt: "2026-07-24T09:10:00Z",
    priority: "HIGH",
    isRead: false,
    isArchived: false,
    assignedToMe: false,
    category: "Access Threat",
    detectedAt: "2026-04-05T04:10:00Z",
    description:
      "We detected 10 consecutive failed login attempts on the user account from the IP address 197.210.78.123. The account may be under a brute attack.",
    userDetails: {
      userId: "USR653",
      userEmail: "john.doe@brightway.edu.ng",
      userName: "Johndej_2",
      fullName: "John Doe",
      role: "School Admin",
      lastSuccessfulLogin: "2026-05-24T09:10:00Z",
      userAccountStatus: "INACTIVE",
    },
    securityEventDetails: {
      ipAddress: "197.210.78.123",
      device: "Windows 10 Chrome 124.0",
      failedAttempts: "10",
      firstAttempt: "2026-05-24T10:15:00Z",
      lastAttempt: "2026-05-24T10:25:00Z",
      threatType: "Brute Force Attack",
      riskScore: "85/100",
      geoRisk: "HIGH",
    },
    actionHistory: [
      {
        userId: "USR007",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-08-14T06:50:00Z",
      },
      {
        userId: "USR008",
        actionTaken:
          "Checked onboarding status. Waiting for payment method to be added.",
        TimeStamp: "2026-07-14T06:50:00Z",
      },
    ],
    notificationLifecycle: [
      {
        stage: "GENERATED",
        TimeStamp: "2026-04-14T06:50:00Z",
      },
      {
        stage: "ASSIGNED",
        TimeStamp: "2026-06-14T06:50:00Z",
      },
      {
        stage: "VIEWED",
        TimeStamp: "pending",
      },
      {
        stage: "ACTION_TAKEN",
        TimeStamp: "pending",
      },
    ],
  },

  // System
  {
    notificationId: "SYS-2032-00542",
    type: "system",
    subject: "Paystack Webhook Failure",
    summary: "Failed to process webhook for transaction ref PSK_90230123",
    relatedComponent: "Payment Gateway",
    receivedAt: "2026-08-10T09:10:00Z",
    priority: "HIGH",
    isRead: false,
    isArchived: false,
    assignedToMe: false,
    systemType: "Integration",
    category: "System",
    SystemService: "Finance",
    notificationStatus: "NEW",
    description:
      "Failed to process webhook for transaction reference PSK_ABCD from Paystack. The webhook delivery returned a 400 Bad Request error",
    affectedSystem: {
      systemName: "Payment Gateway (Paystack)",
      systemStatus: "ACTIVE",
      environment: "Production",
      lastSuccessfulDelivery: "2026-08-10T09:10:00Z",
      endpointUrl: "https://api.schoolean.com/webhooks/paystack",
      failureCount: "5 Consecutive failures",
      nextRetry: "2026-08-10T09:10:00Z",
      region: "Nigeria",
    },
    technicalDetails: {
      transactionReference: "PSK_98230123_ABCD",
      httpStatusCode: "400 Bad Request",
      errorMessage: "Invalid event type",
      payloadSize: "2.48 KB",
      webhookAttempt: "5 of 8",
      responseTime: "245 ms",
      requestId: "req_9f8a2d7e1c4b2",
      occurredAt: "2026-06-10T09:10:00Z",
    },
    actionHistory: [
      {
        userId: "USR009",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-08-14T06:50:00Z",
      },
      {
        userId: "USR001",
        actionTaken:
          "Checked onboarding status. Waiting for payment method to be added.",
        TimeStamp: "2026-07-14T06:50:00Z",
      },
    ],
    notificationLifecycle: [
      {
        stage: "GENERATED",
        TimeStamp: "2026-04-14T06:50:00Z",
      },
      {
        stage: "ASSIGNED",
        TimeStamp: "2026-06-14T06:50:00Z",
      },
      {
        stage: "VIEWED",
        TimeStamp: "pending",
      },
      {
        stage: "ACTION_TAKEN",
        TimeStamp: "pending",
      },
    ],
  },
];

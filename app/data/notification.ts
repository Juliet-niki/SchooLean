import type { INotification } from "~/types";

export const NOTIFICATIONS: INotification[] = [
  // Customer Success & Sales
  {
    notificationId: "CSS-2026-00542",
    type: "customerSuccess",
    subject: "Onboarding Abandoned",
    summary:
      "Royal Crest Academy started onboarding 7 days ago but has not completed. Please follow up to help them complete onboarding.",
    relatedSchool: {
      schoolId: "SCH2461",
      schoolName: "Royal Crest Academy",
      schoolStatus: "ACTIVE",
      schoolCode: "RCA-0054",
      contactPerson: "Mr. Samuel Okafor",
      phoneNumber: "+234 903 345 3456",
      emailAddress: "admin@royalcrest.edu.ng",
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
      "Royal Crest Academy started onboarding on May 17, 2026 but has not completed the required setup steps. Please follow up to help them complete onboarding.",
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
        userId: "USR123",
        userName: "Emily Amadi",
        profilePic: "/images/teamMember1.jpg",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-08-14T06:50:00Z",
        isCurrentUser: true,
      },
      {
        userId: "USR455",
        userName: "John Akandu",
        profilePic: "/images/teamMember2.jpg",
        actionTaken:
          "Checked onboarding status. Waiting for payment method to be added.",
        TimeStamp: "2026-07-14T06:50:00Z",
        isCurrentUser: false,
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
      schoolId: "SCH5461",
      schoolName: "Greenfield Int. School",
      schoolStatus: "ACTIVE",
      schoolCode: "GRNFD-0054",
      contactPerson: "Mr. Samuel Okafor",
      phoneNumber: "+234 803 123 4567",
      emailAddress: "admin@greenfield.edu.ng",
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
      userId: "USR653",
      userName: "Emily Amadi",
      profilePic: "/images/teamMember3.jpg",
    },
    category: "Finance",
    notificationStatus: "NEW",
    description:
      "Subscription payment of NGN 250,000 for the Standard Annual Plan has failed.The payment was attempted on August 24, 2026 at 10:25 AM via Paystack. Failure reason: Insufficient balance in the card.",
    paymentInformation: {
      amount: 250000,
      paymentReference: "PSK_98230123_ABCD",
      paymentMethod: "VISA ****4242",
      attemptedOn: "2026-08-24T10:25:00Z",
      failureReason: "Insufficient balance in the card",
    },
    actionHistory: [
      {
        userId: "USR123",
        userName: "Emily Amadi",
        profilePic: "/images/teamMember1.jpg",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-08-14T06:50:00Z",
        isCurrentUser: false,
      },
      {
        userId: "USR455",
        userName: "John Akandu",
        profilePic: "/images/teamMember2.jpg",
        actionTaken:
          "Checked onboarding status. Waiting for payment method to be added.",
        TimeStamp: "2026-07-14T06:50:00Z",
        isCurrentUser: true,
      },
      {
        userId: "USR396",
        userName: "Mercy Ekenna",
        profilePic: "/images/teamMember3.jpg",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-03-18T06:50:00Z",
        isCurrentUser: false,
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
      schoolId: "SCH5461",
      schoolName: "Future Leaders School",
      schoolStatus: "ACTIVE",
      schoolCode: "FLS-0054",
      contactPerson: "Mr John Adeyemi",
      phoneNumber: "+234 803 123 4567",
      emailAddress: "admin@futureleaders.edu.ng",
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
      userId: "USR852",
      userName: "Sarah Obi",
      profilePic: "/images/teamMember2.jpg",
    },
    category: "Escalated Ticket",
    description:
      "Our parents are unable to make payments. After entering card details and clicking pay, it shows an error. This has been reported by multiple parents.",
    ticketInformation: {
      slaResponseTime: "Socus",
      firstResponseTime: "4 hours",
      firstResponseDue: "2026-05-24T12:15:00Z",
      resolutionDue: " 2026-05-24T04:15:00Z",
      slaStatus: "1h 30m Overdue",
      currentAssignee: {
        userId: "USR164",
        userName: " Emily Amadi",
        profilePic: "/images/teamMember2.jpg",
        isCurrentUser: false,
      },
    },
    customerMessage: {
      message:
        "Our parents are unable to make payments. After entering card details and clicking pay, it shows an error. This has been reported by multiple parents.",
      messageDate: "2026-05-24T12:15:00Z",
    },
    actionHistory: [
      {
        userId: "USR7430",
        userName: "Emily Amadi",
        profilePic: "/images/teamMember1.jpg",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-08-14T06:50:00Z",
        isCurrentUser: false,
      },
      {
        userId: "USR455",
        userName: "John Akandu",
        profilePic: "/images/teamMember2.jpg",
        actionTaken:
          "Checked onboarding status. Waiting for payment method to be added.",
        TimeStamp: "2026-07-14T06:50:00Z",
        isCurrentUser: false,
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
        userId: "USR342",
        userName: "Emily Amadi",
        profilePic: "/images/teamMember1.jpg",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-08-14T06:50:00Z",
        isCurrentUser: false,
      },
      {
        userId: "USR455",
        userName: "John Akandu",
        profilePic: "/images/teamMember2.jpg",
        actionTaken:
          "Checked onboarding status. Waiting for payment method to be added.",
        TimeStamp: "2026-07-14T06:50:00Z",
        isCurrentUser: true,
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
      webhookRequestId: "req_9f8a2d7e1c4b2",
      occurredAt: "2026-06-10T09:10:00Z",
    },
    actionHistory: [
      {
        userId: "USR123",
        userName: "Emily Amadi",
        profilePic: "/images/teamMember1.jpg",
        actionTaken:
          "Sent email reminder to the school admin to complete onboarding.",
        TimeStamp: "2026-08-14T06:50:00Z",
        isCurrentUser: true,
      },
      {
        userId: "USR455",
        userName: "John Akandu",
        profilePic: "/images/teamMember2.jpg",
        actionTaken:
          "Checked onboarding status. Waiting for payment method to be added.",
        TimeStamp: "2026-07-14T06:50:00Z",
        isCurrentUser: false,
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

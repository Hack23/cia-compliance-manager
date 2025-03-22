import { SecurityLevel } from "../../types/cia";
import { CIADetails } from "../../types/cia-services";
import { getSecurityLevelColorPair } from "../../utils/colorUtils";

/**
 * Detailed availability security options for each security level
 *
 * ## Business Perspective
 *
 * These options define the technical and business implications of different
 * availability security levels, focusing on uptime guarantees, recovery times,
 * and business continuity considerations. 🔄
 */
const availabilityData: Record<SecurityLevel, CIADetails> = {
  None: {
    description:
      "No availability measures are in place. The system is prone to frequent, unpredictable outages.",
    technical:
      "No redundancy, backup systems, monitoring, or disaster recovery procedures are implemented.",
    businessImpact:
      "Severe disruptions occur during outages, potentially resulting in revenue losses estimated at 5-10% annually under prolonged conditions.",
    capex: 0,
    opex: 0,
    bg: getSecurityLevelColorPair("None").bg,
    text: getSecurityLevelColorPair("None").text,
    recommendations: [
      "Implement basic monitoring to detect outages early",
      "Establish a rudimentary backup process with periodic testing",
      "Document manual recovery procedures with clear roles",
      "Establish baseline uptime metrics to gauge current performance",
      "Identify and prioritize critical systems for improvement",
    ],
    uptime: "<90%",
    businessImpactDetails: {
      summary: "Comprehensive impact analysis",
      financial: {
        description:
          "Prolonged outages can lead to significant revenue loss, estimated at 5-10% of annual revenue.",
        riskLevel: "Critical",
        annualRevenueLoss: "5-10% of annual revenue",
      },
      operational: {
        description:
          "Operations are severely disrupted with recovery timelines that are highly unpredictable.",
        riskLevel: "Critical",
        meanTimeToRecover: "Unpredictable (hours to days)",
      },
      regulatory: {
        description:
          "Likely violates basic service agreements and regulatory requirements.",
        riskLevel: "High",
        complianceViolations: ["SLAs", "Basic industry standards"],
      },
    },
    securityIcon: "⚠️",
    valuePoints: [
      "No availability value",
      "Systems may be unavailable for extended periods",
      "Unpredictable outages disrupt business operations",
      "No disaster recovery procedures in place",
      "Not suitable for business-critical applications",
    ],
    technicalImplementation: {
      description: "No availability measures or redundancy implemented",
      implementationSteps: [
        "No implementation required as no controls are in place",
        "Consider documenting current system architecture as a baseline",
      ],
      effort: {
        development: "None",
        maintenance: "None",
        expertise: "None",
      },
    },
  },
  Low: {
    description:
      "Basic availability measures are present but have significant limitations, leading to extended downtime during disruptions.",
    technical:
      "Reliance on manual backup processes and limited monitoring, with basic recovery documentation.",
    businessImpact:
      "Moderate disruptions can lead to revenue losses estimated at 3-5% annually, heavily dependent on recovery speed.",
    capex: 5,
    opex: 3,
    bg: getSecurityLevelColorPair("Low").bg,
    text: getSecurityLevelColorPair("Low").text,
    recommendations: [
      "Implement scheduled backups and test recovery procedures regularly",
      "Set up basic monitoring alerts for early detection",
      "Document recovery processes and establish a communication protocol for outages",
    ],
    uptime: "95%",
    rto: "24-48 hours",
    rpo: "24 hours",
    mttr: "12-24 hours",
    businessImpactDetails: {
      summary: "Comprehensive impact analysis",
      financial: {
        description:
          "Revenue impact is estimated at around 3-5% annually due to extended downtimes.",
        riskLevel: "High",
        annualRevenueLoss: "3-5% of annual revenue",
      },
      operational: {
        description:
          "Business disruptions are significant and require manual intervention, leading to slower recovery.",
        riskLevel: "High",
        meanTimeToRecover: "12-24 hours",
      },
    },
    securityIcon: "🔑",
    valuePoints: [
      "Basic availability with minimal protection against outages",
      "Manual recovery processes that require significant time",
      "Scheduled backups but with large recovery point objectives",
      "Suitable for non-critical internal systems",
      "Provides a foundational availability posture",
    ],
    technicalImplementation: {
      description: "Basic manual backup and recovery processes",
      implementationSteps: [
        "Set up scheduled system backups",
        "Document basic recovery procedures",
        "Implement simple monitoring with email alerts",
      ],
      effort: {
        development: "Days (1-5)",
        maintenance: "Weekly manual checks",
        expertise: "Junior IT staff",
      },
    },
  },
  Moderate: {
    description:
      "Standard availability measures that yield acceptable uptime with planned disaster recovery processes.",
    technical:
      "Scheduled backups, automated monitoring with alerts, documented recovery procedures, and partial redundancy for key components.",
    businessImpact:
      "Occasional disruptions are generally contained, with revenue losses estimated at 1-3% annually.",
    capex: 15,
    opex: 10,
    bg: getSecurityLevelColorPair("Moderate").bg,
    text: getSecurityLevelColorPair("Moderate").text,
    recommendations: [
      "Enhance redundancy for mission-critical systems",
      "Automate backup and disaster recovery testing",
      "Integrate comprehensive monitoring with defined SLAs",
    ],
    uptime: "99%",
    rto: "4-8 hours",
    rpo: "4 hours",
    mttr: "2-4 hours",
    businessImpactDetails: {
      summary: "Comprehensive impact analysis",
      financial: {
        description:
          "Revenue impact is modest, estimated at approximately 1-3% annually, assuming typical outage scenarios.",
        riskLevel: "Medium",
        annualRevenueLoss: "1-3% of annual revenue",
      },
      operational: {
        description:
          "Disruptions occur infrequently and recovery is relatively quick.",
        riskLevel: "Medium",
        meanTimeToRecover: "2-4 hours",
      },
    },
    securityIcon: "🔓",
    valuePoints: [
      "Balanced availability with standard protection measures",
      "Semi-automated recovery procedures",
      "Regular backups with moderate recovery point objectives",
      "Suitable for standard business applications",
      "Meets basic availability requirements for most operations",
    ],
    technicalImplementation: {
      description: "Standard availability controls with some automation",
      implementationSteps: [
        "Implement automated backup systems",
        "Set up monitoring and alerting infrastructure",
        "Deploy basic redundancy for key components",
        "Create and test disaster recovery procedures",
      ],
      effort: {
        development: "Weeks (2-4)",
        maintenance: "Scheduled weekly maintenance",
        expertise: "Mid-level IT staff",
      },
    },
  },
  High: {
    description:
      "Robust availability measures with high redundancy and automated recovery systems ensure near-continuous operations.",
    technical:
      "N+1 redundancy, multi-region standby systems, automated failover, comprehensive monitoring, and regular disaster recovery testing.",
    businessImpact:
      "Business continuity is well-maintained with negligible revenue impact (generally under 1%).",
    capex: 30,
    opex: 20,
    bg: getSecurityLevelColorPair("High").bg,
    text: getSecurityLevelColorPair("High").text,
    recommendations: [
      "Deploy N+1 redundancy for all critical systems",
      "Implement automated failover and real-time monitoring",
      "Conduct regular disaster recovery drills and define escalation procedures",
    ],
    uptime: "99.9%",
    rto: "15-60 minutes",
    rpo: "15 minutes",
    mttr: "10-30 minutes",
    businessImpactDetails: {
      summary: "Comprehensive impact analysis",
      financial: {
        description:
          "Revenue impact is minimal, generally estimated at less than 1% of annual revenue.",
        riskLevel: "Low",
        annualRevenueLoss: "<1% of annual revenue",
      },
      operational: {
        description:
          "Disruptions are rare and recovery is almost instantaneous due to automation.",
        riskLevel: "Low",
        meanTimeToRecover: "10-30 minutes",
      },
      strategic: {
        description:
          "High reliability can support market expansion and reinforces customer trust.",
        riskLevel: "Low",
      },
    },
    securityIcon: "🔒",
    valuePoints: [
      "Strong availability with robust protection against outages",
      "Automated failover and rapid recovery capabilities",
      "Near real-time replication with minimal data loss risk",
      "Suitable for business-critical applications",
      "Supports high-value customer-facing services",
    ],
    technicalImplementation: {
      description: "Advanced availability architecture with automated recovery",
      implementationSteps: [
        "Deploy N+1 redundancy across all critical infrastructure",
        "Implement automated failover mechanisms",
        "Set up comprehensive monitoring and alerting",
        "Establish regular disaster recovery testing",
      ],
      effort: {
        development: "Months (1-3)",
        maintenance: "Continuous monitoring, weekly testing",
        expertise: "Senior IT specialists",
      },
    },
  },
  "Very High": {
    description:
      "Maximum availability with continuous operations enabled by multi-region redundancy, real-time replication, and fully automated recovery.",
    technical:
      "N+2 redundancy, active-active multi-region architecture, real-time replication, and automated remediation ensure near-zero downtime.",
    businessImpact:
      "Operational continuity is nearly uninterrupted under normal conditions, with revenue impact considered negligible—though extreme events remain a risk.",
    capex: 60,
    opex: 40,
    bg: getSecurityLevelColorPair("Very High").bg,
    text: getSecurityLevelColorPair("Very High").text,
    recommendations: [
      "Implement N+2 redundancy across all critical components",
      "Deploy an active-active multi-region architecture with real-time replication",
      "Establish fully automated remediation systems and 24/7 operations support",
      "Conduct regular chaos engineering exercises to stress-test resilience",
    ],
    uptime: "99.99%",
    rto: "<5 minutes",
    rpo: "<1 minute",
    mttr: "<5 minutes",
    businessImpactDetails: {
      summary: "Comprehensive impact analysis",
      financial: {
        description:
          "Revenue losses due to availability issues are negligible under normal conditions.",
        riskLevel: "Minimal",
      },
      operational: {
        description:
          "Business operations are maintained nearly continuously with rapid, automated recovery.",
        riskLevel: "Minimal",
        meanTimeToRecover: "<5 minutes",
      },
      strategic: {
        description:
          "Superior reliability offers a competitive advantage in high-demand markets.",
        riskLevel: "Minimal",
      },
      regulatory: {
        description:
          "Exceeds stringent regulatory and SLA requirements for availability.",
        riskLevel: "Minimal",
        complianceViolations: [],
      },
    },
    securityIcon: "🔐",
    valuePoints: [
      "Maximum availability with comprehensive protection",
      "Active-active multi-region deployment with instant failover",
      "Real-time replication with virtually no data loss",
      "Suitable for mission-critical systems with zero downtime requirements",
      "Supports high-frequency financial transactions and life-critical systems",
    ],
    technicalImplementation: {
      description: "Enterprise-grade high availability infrastructure",
      implementationSteps: [
        "Implement N+2 redundancy across all system components",
        "Deploy active-active architecture across multiple regions",
        "Set up real-time data replication and synchronization",
        "Implement automated self-healing mechanisms",
        "Establish continuous chaos engineering testing",
      ],
      effort: {
        development: "Months (4-6+)",
        maintenance: "24/7 operations team, continuous monitoring",
        expertise: "Senior availability specialists and architects",
      },
    },
  },
};

export default availabilityData;

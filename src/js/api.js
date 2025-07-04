// API functions for Zone01 GraphQL endpoint
import { getCurrentToken } from "./auth.js";

const API_BASE = "https://zone01normandie.org/api";
const GRAPHQL_ENDPOINT = `${API_BASE}/graphql-engine/v1/graphql`;

// Fetch complete user data (essential + extended)
export async function fetchUserData() {
  const token = getCurrentToken();
  if (!token) throw new Error("Not authenticated");

  try {
    const essentialData = await fetchEssentialUserData();
    const extendedData = await fetchExtendedUserData();

    const combinedData = {
      ...essentialData,
      ...extendedData,
    };

    return combinedData;
  } catch (error) {
    throw error;
  }
}

// Fetch user profile and basic XP data
async function fetchEssentialUserData() {
  const query = `
    {
      user {
        id
        login
        profile
        attrs
        campus
        createdAt
        updatedAt
      }
      xp: transaction(where: {type: {_eq: "xp"}}, order_by: {createdAt: desc}, limit: 1000) {
        id
        userId
        type
        amount
        objectId
        createdAt
        path
        campus
        eventId
      }
    }
  `;

  const response = await graphqlRequest(query);

  if (!response.data) {
    throw new Error("No data received from GraphQL");
  }

  const user = response.data.user?.[0];
  if (!user) {
    throw new Error("No user data found");
  }

  const transactions = response.data.xp || [];

  // Calculate XP by category
  const cursusXP = transactions
    .filter(
      (t) =>
        !t.path.includes("piscine-go") &&
        !t.path.includes("piscine-js") &&
        !t.path.includes("/raid-") &&
        !t.path.includes("-raid-")
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const piscineGoXP = transactions
    .filter(
      (t) =>
        t.path.includes("piscine-go") &&
        !t.path.includes("/raid-") &&
        !t.path.includes("-raid-") &&
        !t.path.includes("/bonus-") &&
        !t.path.includes("-bonus-")
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const piscineJsXP = transactions
    .filter(
      (t) =>
        t.path.includes("piscine-js") &&
        !t.path.includes("/raid-") &&
        !t.path.includes("-raid-") &&
        !t.path.includes("/bonus-") &&
        !t.path.includes("-bonus-")
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const totalXP = cursusXP + piscineGoXP + piscineJsXP;

  return {
    ...user,
    transactions,
    totalXP,
    cursusXP,
    piscineGoXP,
    piscineJsXP,
    auditRatio: 1.0,
    cursusAuditRatio: 1.0,
    progresses: [],
    auditsUp: [],
    auditsDown: [],
    stats: {
      totalUp: 0,
      totalDown: 0,
      cursusUp: 0,
      cursusDown: 0,
    },
  };
}

// Fetch progress data and audit information
async function fetchExtendedUserData() {
  const query = `
    {
      progress(order_by: {createdAt: desc}, limit: 500) {
        id
        userId
        objectId
        grade
        createdAt
        updatedAt
        path
        isDone
        campus
        object {
          id
          name
          type
        }
      }
      audits_up: transaction(where: {type: {_eq: "up"}}, order_by: {createdAt: desc}, limit: 300) {
        id
        createdAt
        path
        amount
      }
      audits_down: transaction(where: {type: {_eq: "down"}}, order_by: {createdAt: desc}, limit: 300) {
        id
        createdAt
        path
        amount
      }
    }
  `;

  try {
    const response = await graphqlRequest(query);

    if (!response.data) {
      return {
        progresses: [],
        auditsUp: [],
        auditsDown: [],
        auditRatio: 1.0,
        cursusAuditRatio: 1.0,
        stats: { totalUp: 0, totalDown: 0, cursusUp: 0, cursusDown: 0 },
      };
    }

    const progresses = response.data.progress || [];
    const auditsUp = response.data.audits_up || [];
    const auditsDown = response.data.audits_down || [];

    // Calculate audit ratios
    const totalUp = auditsUp.reduce((sum, audit) => sum + audit.amount, 0);
    const totalDown = auditsDown.reduce((sum, audit) => sum + audit.amount, 0);
    const auditRatio =
      totalDown === 0 ? 1.0 : Math.round((totalUp / totalDown) * 10) / 10;

    const cursusAuditsUp = auditsUp.filter(
      (a) => !a.path.includes("piscine-go") && !a.path.includes("piscine-js")
    );
    const cursusAuditsDown = auditsDown.filter(
      (a) => !a.path.includes("piscine-go") && !a.path.includes("piscine-js")
    );
    const cursusUp = cursusAuditsUp.reduce(
      (sum, audit) => sum + audit.amount,
      0
    );
    const cursusDown = cursusAuditsDown.reduce(
      (sum, audit) => sum + audit.amount,
      0
    );
    const cursusAuditRatio =
      cursusDown === 0 ? 1.0 : Math.round((cursusUp / cursusDown) * 10) / 10;

    return {
      progresses,
      auditsUp,
      auditsDown,
      auditRatio,
      cursusAuditRatio,
      stats: {
        totalUp,
        totalDown,
        cursusUp,
        cursusDown,
      },
    };
  } catch (error) {
    // Return defaults if extended data fails
    return {
      progresses: [],
      auditsUp: [],
      auditsDown: [],
      auditRatio: 1.0,
      cursusAuditRatio: 1.0,
      stats: { totalUp: 0, totalDown: 0, cursusUp: 0, cursusDown: 0 },
    };
  }
}

// Execute GraphQL query with authentication
async function graphqlRequest(query) {
  const token = getCurrentToken();
  if (!token) throw new Error("Not authenticated");

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      throw new Error(jsonResponse.errors[0].message);
    }

    return jsonResponse;
  } catch (error) {
    throw new Error("Failed to fetch data from API: " + error.message);
  }
}

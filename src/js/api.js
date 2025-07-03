// This file contains functions for making API calls and managing user data.

import { getCurrentToken } from "./auth.js";

const API_BASE = "https://zone01normandie.org/api";
const GRAPHQL_ENDPOINT = `${API_BASE}/graphql-engine/v1/graphql`;

export async function fetchUserData() {
  const token = getCurrentToken();
  if (!token) throw new Error("Not authenticated");

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
      progress(order_by: {createdAt: asc}) {
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
      xp: transaction(where: {type: {_eq: "xp"}}, order_by: {createdAt: asc}) {
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
      # Transactions pour les audits effectués (up)
      audits_up: transaction(where: {type: {_eq: "up"}}, order_by: {createdAt: asc}) {
        id
        createdAt
        path
        amount
      }
      # Transactions pour les audits reçus (down)  
      audits_down: transaction(where: {type: {_eq: "down"}}, order_by: {createdAt: asc}) {
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
      throw new Error("No data received from GraphQL");
    }

    const user = response.data.user?.[0];
    if (!user) {
      throw new Error("No user data found");
    }

    // Récupérer les transactions et les progrès
    const transactions = response.data.xp || [];
    const progresses = response.data.progress || [];

    // Récupérer les données d'audit
    const auditsUp = response.data.audits_up || [];
    const auditsDown = response.data.audits_down || [];

    // Calculer le ratio d'audit global
    const totalUp = auditsUp.reduce((sum, audit) => sum + audit.amount, 0);
    const totalDown = auditsDown.reduce((sum, audit) => sum + audit.amount, 0);
    const auditRatio =
      totalDown === 0 ? 1.0 : Math.round((totalUp / totalDown) * 10) / 10;

    // Calculer le ratio d'audit pour le cursus (en excluant les piscines)
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

    // Calculer les XP par section avec filtrage précis
    const cursusXP = transactions
      .filter(
        (t) =>
          !t.path.includes("piscine-go") &&
          !t.path.includes("piscine-js") &&
          !t.path.includes("/raid-") && // Exclure les raids du cursus
          !t.path.includes("-raid-") // Exclure aussi les raids avec ce format
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
      progresses,
      auditsUp,
      auditsDown,
      auditRatio,
      cursusAuditRatio,
      totalXP,
      cursusXP,
      piscineGoXP,
      piscineJsXP,
      stats: {
        totalUp,
        totalDown,
        cursusUp,
        cursusDown,
      },
    };
  } catch (error) {
    console.error("Error processing user data:", error);
    throw error;
  }
}

export async function fetchUserTransactions() {
  const token = getCurrentToken();
  if (!token) throw new Error("Not authenticated");

  const query = `
    {
      transaction(where: {type: {_eq: "xp"}}, order_by: {createdAt: asc}) {
        id
        amount
        createdAt
        path
      }
    }
  `;

  const response = await graphqlRequest(query);
  if (!response.data || !response.data.transaction) {
    console.error("GraphQL response:", response);
    throw new Error("Invalid GraphQL response structure");
  }
  return response.data.transaction;
}

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
      console.error("GraphQL Errors:", jsonResponse.errors);
      throw new Error(jsonResponse.errors[0].message);
    }

    return jsonResponse;
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw new Error("Failed to fetch data from API: " + error.message);
  }
}

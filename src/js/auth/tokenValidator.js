// Token validation
const API_BASE = "https://zone01normandie.org/api";
const GRAPHQL_ENDPOINT = `${API_BASE}/graphql-engine/v1/graphql`;

export async function validateToken(token) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          user {
            id
            login
          }
        }`,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return !data.errors && data.data?.user?.id;
  } catch (error) {
    return false;
  }
}

export function cleanAndValidateToken(token) {
  const cleanToken = token.replace(/"/g, "");

  if (!cleanToken || cleanToken.length < 10) {
    throw new Error("Invalid token received");
  }

  return cleanToken;
}

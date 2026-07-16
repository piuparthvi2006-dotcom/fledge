import assert from "node:assert/strict";
import test from "node:test";
import {
  buildOutlookAuthorizationUrl,
  createPkceValues,
} from "./authorizeOutlook.js";

test("Outlook authorization requests delegated mail access and a refresh token", () => {
  const url = new URL(buildOutlookAuthorizationUrl({
    authorityTenant: "organizations",
    clientId: "client-id",
    codeChallenge: "challenge",
    redirectUri: "http://127.0.0.1:8787/callback",
    state: "state-value",
  }));

  assert.equal(url.hostname, "login.microsoftonline.com");
  assert.equal(url.pathname, "/organizations/oauth2/v2.0/authorize");
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("state"), "state-value");
  assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  assert.match(url.searchParams.get("scope"), /Mail\.Read/);
  assert.match(url.searchParams.get("scope"), /offline_access/);
});

test("PKCE creates a verifier and SHA-256 challenge", () => {
  const { codeChallenge, codeVerifier } = createPkceValues();

  assert.ok(codeVerifier.length >= 43);
  assert.ok(codeChallenge.length >= 43);
  assert.notEqual(codeChallenge, codeVerifier);
  assert.doesNotMatch(codeVerifier, /[+/=]/);
  assert.doesNotMatch(codeChallenge, /[+/=]/);
});

const fetch = require('node-fetch');
const { AuthenticationError } = require('apollo-server-express');
const JWTVerifier = require('@okta/jwt-verifier');
const okta = require('@okta/okta-sdk-nodejs');

// Env variables
require('dotenv').config({ path: '.env.local' });

const basicAuth = Buffer.from(
    [
        process.env.OKTA_CLIENT_ID,
        process.env.OKTA_CLIENT_SECRET,
    ].join(':')
).toString('base64');

const getToken = async ({ username, password }) => {
    //${process.env.OKTA_TOKEN}
    const response = await fetch(`${process.env.OKTA_ORG_URL}/oauth2/v1/token`, {
        method: 'POST',
        headers: {
            authorization: `Basic ${basicAuth}`,
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username,
            password,
            grant_type: 'password',
            scope: 'openid',
        }).toString(),
    });

    const { error_description, access_token } = await response.json();

    if (error_description) 
        throw new AuthenticationError(error_description);

    return access_token;
};

const verifier = new JWTVerifier({
    issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
    clientId: process.env.OKTA_CLIENT_ID,
});

const getUserIdFromToken = async (token) => {
    if (!token) return;

    try {
        const jwt = await verifier.verifyAccessToken(token)
        return jwt.claims.sub;
    } catch (error) {
        // ignore
    }
};

const client = new okta.Client({
    orgUrl: process.env.OKTA_ORG_URL,
    token: process.env.OKTA_TOKEN,
});

const getUser = async (userId) => {
    if (!userId) return;

    try {
        const user = await client.getUser(userId);
        return user.profile;
    } catch (error) {
        // ignore
    }
};

module.exports = { getToken, getUserIdFromToken, getUser };
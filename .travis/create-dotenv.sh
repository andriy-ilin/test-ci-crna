#!/bin/sh

# Create firebase config
echo "FIREBASE_API_KEY=${FIREBASE_API_KEY}" > .env
echo "FIREBASE_AUTH_DOMAIN=${FIREBASE_AUTH_DOMAIN}" >> .env
echo "FIREBASE_AUTH_DOMAIN=${FIREBASE_AUTH_DOMAIN}" >> .env
echo "FIREBASE_DATABASE_URL=${FIREBASE_DATABASE_URL}" >> .env
echo "FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}" >> .env
echo "FIREBASE_STORAGE_BUCKET=${FIREBASE_STORAGE_BUCKET}" >> .env
echo "FIREBASE_MESSAGING_SENDER_ID=${FIREBASE_MESSAGING_SENDER_ID}" >> .env
echo "FIREBASE_AUTH_MAIL=${FIREBASE_AUTH_MAIL}" >> .env
echo "FIREBASE_AUTH_PASS=${FIREBASE_AUTH_PASS}" >> .env
echo "PUSH_ENDPOINT=${PUSH_ENDPOINT}" >> .env
echo "PUSH_SECRET_CODE=${PUSH_SECRET_CODE}" >> .env
echo "PUSH_APP_NAME=${PUSH_APP_NAME}" >> .env

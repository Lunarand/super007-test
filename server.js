name: super007-test-server

on:
  workflow_dispatch:

jobs:
  server:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Install cloudflared
        run: |
          wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
          chmod +x cloudflared-linux-amd64
          sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared

      - name: Start test server
        run: |
          node server.js &
          sleep 5

      - name: Start Cloudflare Tunnel
        run: |
          cloudflared tunnel --no-autoupdate --url http://localhost:8080 run --token ${{ secrets.CF_TUNNEL_TOKEN }}

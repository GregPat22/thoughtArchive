#!/bin/bash
set -e

echo "=== Node version ==="
node --version
echo "=== pnpm version ==="
pnpm --version
echo "=== Checking vendor dir ==="
ls -la vendor/ 2>&1 || echo "No vendor dir"
echo "=== Checking motion-plus ==="
ls -la node_modules/motion-plus/package.json 2>&1 || echo "motion-plus not found"
echo "=== Running next build ==="
pnpm run build

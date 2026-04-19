import { danger, fail, schedule, warn } from 'danger'
import yarn from 'danger-plugin-yarn'

const { created_files, modified_files, deleted_files } = danger.git

schedule(yarn())
const pr = danger.github.pr

const MAX_FILES_CHANGED = 20
const MAX_LINES_CHANGED = 1200
const MAX_DELETIONS = 400
const MAX_ADDITIONS = 1000

const filesChangedCount =
  created_files.length + modified_files.length + deleted_files.length

const additions = pr.additions
const deletions = pr.deletions
const totalChanges = additions + deletions

if (filesChangedCount > MAX_FILES_CHANGED) {
  fail(
    `PR is too large: ${filesChangedCount} files changed. Limit is ${MAX_FILES_CHANGED}. Split it into smaller PRs.`,
  )
}

if (totalChanges > MAX_LINES_CHANGED) {
  fail(
    `PR is too large: ${totalChanges} lines changed (${additions} additions, ${deletions} deletions). Limit is ${MAX_LINES_CHANGED}.`,
  )
}

if (additions > MAX_ADDITIONS) {
  fail(`Too many additions: ${additions}. Limit is ${MAX_ADDITIONS}.`)
}

if (deletions > MAX_DELETIONS) {
  warn(`Large deletion set: ${deletions}. Limit is ${MAX_DELETIONS}.`)
}

const blockedPatterns = [
  /^dist\//,
  /^build\//,
  /\.next\//,
  /package-lock\.json$/,
]

const blockedFiles = [...created_files, ...modified_files].filter((file) =>
  blockedPatterns.some((pattern) => pattern.test(file)),
)

if (blockedFiles.length > 0) {
  fail(
    `Do not include generated/build artifacts in PRs:\n- ${blockedFiles.join('\n- ')}`,
  )
}

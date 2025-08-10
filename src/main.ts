import { getGum } from './installer'
import * as core from '@actions/core'

/** Installs Gum for use in GitHub Actions workflows. */
export async function run(): Promise<void> {
  try {
    const version = core.getInput('version', { trimWhitespace: true })
    await getGum(version)
  } catch (e: unknown) {
    if (e instanceof Error) {
      core.setFailed(e.message)
    }

    throw e
  }
}

import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as fs from 'fs'
import os from 'os'
import * as path from 'path'

type DownloadInfo = {
  url: string
  filename: string
}

export async function getGum(
  version: string,
  osArch = os.arch(),
): Promise<string> {
  const osType = os.type()

  // Check if the platform is supported
  if (osType === 'Windows_NT') {
    throw new Error(
      'Windows is not currently supported by gum releases. Only Linux and macOS are supported.',
    )
  }

  const resolvedVersion =
    version === '' || version === 'latest' ? await getLatestVersion() : version

  const gumPath = tc.find('gum', resolvedVersion, osArch)
  if (gumPath) {
    core.info(`Located Gum in cache at: ${gumPath}`)
    return gumPath
  }

  core.info(`Attempting to download Gum ${resolvedVersion}...`)
  return await installGumVersion(resolvedVersion, osType, osArch)
}

async function installGumVersion(
  version: string,
  osType: string,
  osArch: string,
): Promise<string> {
  const downloadInfo = getDownloadInfo(version, osType, osArch)

  core.info(`Downloading Gum from: ${downloadInfo.url}`)
  const downloadPath = await tc.downloadTool(downloadInfo.url)

  core.debug('Extracting Gum...')
  const extractedPath = await tc.extractTar(downloadPath, undefined, 'xz')

  const cachedPath = await tc.cacheDir(extractedPath, 'gum', version, osArch)

  const architecture = mapOSArch(osArch)
  const cleanVersion = version.startsWith('v') ? version.slice(1) : version
  const extractedDirName = `gum_${cleanVersion}_${osType}_${architecture}`
  const binDir = path.join(cachedPath, extractedDirName)

  const binaryName = 'gum'
  const binaryPath = path.join(binDir, binaryName)

  if (fs.existsSync(binaryPath)) {
    core.debug(`Found gum binary at: ${binaryPath}`)
    fs.chmodSync(binaryPath, '755')
    core.addPath(binDir)
  } else {
    core.warning(`Binary ${binaryName} not found at ${binaryPath}`)
    const files = fs.readdirSync(cachedPath, { recursive: true })
    core.debug(`Files in cached directory: ${files.join(', ')}`)
    core.addPath(cachedPath)
  }

  core.info(`Gum ${version} installed successfully`)
  return cachedPath
}

async function getLatestVersion(): Promise<string> {
  const headers: Record<string, string> = {
    'User-Agent': 'unfunco/setup-gum',
  }

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(
    'https://api.github.com/repos/charmbracelet/gum/releases/latest',
    { headers },
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch latest version: ${response.statusText}`)
  }

  const data = (await response.json()) as { tag_name: string }

  return data.tag_name
}

function getDownloadInfo(
  version: string,
  osType: string,
  osArch: string,
): DownloadInfo {
  const architecture = mapOSArch(osArch)
  const cleanVersion = version.startsWith('v') ? version.slice(1) : version

  const filename = `gum_${cleanVersion}_${osType}_${architecture}.tar.gz`
  const url = `https://github.com/charmbracelet/gum/releases/download/v${cleanVersion}/${filename}`

  return { url, filename }
}

function mapOSArch(osArch: string): string {
  switch (osArch) {
    case 'x64':
      return 'x86_64'
    case 'arm64':
      return 'arm64'
    case 'arm':
      return 'armv7'
    case 'ia32':
      return 'i386'
    default:
      throw new Error(`Unsupported architecture: ${osArch}`)
  }
}

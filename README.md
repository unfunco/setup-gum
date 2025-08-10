# Gum for GitHub Actions

![CI](https://github.com/unfunco/setup-gum/actions/workflows/ci.yaml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)

<img src="assets/images/octocat.jpg" alt="Octocat blowing a bubblegum bubble" width="300" align="right" style="padding: 0 0 0 10px">

[Gum] is a tool for glamorous shell scripts, made by [Charm]. This GitHub Action
installs Gum on your GitHub Actions runner, allowing you to use it in your
workflows. It supports Ubuntu and macOS runners.

> [!NOTE]
> I am not affiliated with [Charm] or the [Gum] project.

## 🔧 Getting started

### Usage instructions

The following example demonstrates how to use the action in a GitHub Actions job
to install a specific version of Gum and verify the installation by displaying
the version number.

```yaml
- name: Set up Gum
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  uses: unfunco/setup-gum@main
- name: Verify installation
  run: |
    gum style \
      --align center \
      --bold \
      --border-foreground 212 \
      --border double \
      --foreground 212 \
      --margin "1 2" \
      --padding "2 4" \
      --width 50 \
      "$(gum --version) installed."
```

### Development and testing

#### Requirements

- [Node.js] 20.x and [npm] 10+

Clone the repository, change into the `setup-gum` directory, install the
development dependencies, and create an `.env` file by copying the example
included in the root of the repository, once completed you have everything you
need to develop and test the action locally.

```bash
git clone git@github.com:unfunco/setup-gum.git
cd setup-tools
npm install
cp .env.example .env
```

Make changes and run the unit tests to ensure everything is working as expected.
There are additional commands available to format the code and build the action
for production use, these will be run automatically when you commit changes to
the repository.

```bash
npm run test
```

You can also run the action locally, the following command will run the action
with the environment variables defined in your `.env` file. Running it for the
first time will download the tools specified in your `.env` file, subsequent
runs will detect the locally cached versions.

```bash
npm run locally
```

## License

© 2025 [Daniel Morris]\
Made available under the terms of the [MIT License].

[charm]: https://charm.land
[daniel morris]: https://unfun.co
[gum]: https://github.com/charmbracelet/gum
[node.js]: https://nodejs.org
[npm]: https://www.npmjs.com
[mit license]: LICENSE.md

# Gum in GitHub Actions

[Gum] is a tool for glamorous shell scripts.

## Getting started

### Usage instructions

```yaml
- name: Set up Gum
  uses: unfunco/setup-gum@v1
- name: Display the Gum version
  run: gum --version
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

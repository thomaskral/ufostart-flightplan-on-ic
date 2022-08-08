## 1 Runtime environment

runtime dependencies:

- Ubuntu 20\*/MacOS
- [Internet Computer SDK](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove)
- [nvm](https://github.com/nvm-sh/nvm)
- node v16.15.1
- yarn (package manager)
- [direnv](https://direnv.net/)

## 2 Usage

### 2.1 Running project in local environment

For local development the (1) internet computer backend and the (1) vite.js dev server has to be running

#### 2.1.1 Starting & stopping local dev environment

**start**

```shell
yarn backend:up       # starts the local replica & deploys canisters
yarn dev              # starts the local vite.js dev server
```

**stop**

```shell
[ctrl] + [c]        # kills the local vite.js dev server
yarn backend:down   # stops the local replica and performs a cleanup
```

## 3 Code quality tools

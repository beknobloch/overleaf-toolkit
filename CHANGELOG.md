## [1.5.3](https://github.com/beknobloch/Underbranch/compare/v1.5.2...v1.5.3) (2025-05-01)


### Bug Fixes

* add quotes around paths to prevent misinterpretations ([8577f4a](https://github.com/beknobloch/Underbranch/commit/8577f4af0af56e4fd10a0e7132e01aca9bab2ff7))

## [1.5.2](https://github.com/beknobloch/Underbranch/compare/v1.5.1...v1.5.2) (2025-05-01)


### Bug Fixes

* **release:** correctly upload and download artifacts for release for MacOS, Windows, and Linux ([35e2759](https://github.com/beknobloch/Underbranch/commit/35e27595bbb5afa21546a1a93b6138ceb0c73904))

## [1.5.1](https://github.com/beknobloch/Underbranch/compare/v1.5.0...v1.5.1) (2025-05-01)


### Bug Fixes

* **release:** add proper sequencing of OS releases and add Linux build support ([e1af46b](https://github.com/beknobloch/Underbranch/commit/e1af46b278ee9ea9f16fcb38fe7ac86bc0cbcd57))

# [1.5.0](https://github.com/beknobloch/Underbranch/compare/v1.4.0...v1.5.0) (2025-05-01)


### Bug Fixes

* added dialog box catch if Git Bash cannot be found on Windows ([43c9ea9](https://github.com/beknobloch/Underbranch/commit/43c9ea986a33825940125a3551b8d9dd6d2b3236))
* **data:** correctly create in-application data directories ([59e7fef](https://github.com/beknobloch/Underbranch/commit/59e7fefa05a5c80b7aa90e4a44b750d65dd29275))
* **release:** make release attaches explicit to prevent incorrect launcher attachments ([ab4811b](https://github.com/beknobloch/Underbranch/commit/ab4811b2465fce530fa5175510ba0021e429bbff))
* **release:** prevent publication on npm ([3d92106](https://github.com/beknobloch/Underbranch/commit/3d9210625f0404b92199c4bf55dd017c8a59e373))
* **UX:** displays ip address with port number ([11e6b65](https://github.com/beknobloch/Underbranch/commit/11e6b65efe64053c5dbfeffcbd88badae6d1f390))
* **windows:** replaced Git Bash with WSL ([461a6e9](https://github.com/beknobloch/Underbranch/commit/461a6e95ff6e4a55fc2daedaf59fbd31a1c1a570))
* **windows:** runs git bash in correct environment ([560f354](https://github.com/beknobloch/Underbranch/commit/560f354e625b7a48c327b6404a7feeed91d8a2ac))


### Features

* **UX:** add quit confirmation dialog to main window ([8925f3b](https://github.com/beknobloch/Underbranch/commit/8925f3b50ef2331a58dbe0e9f7af49fbb3263713))
* **UX:** added tip window with provided address to help users share projects ([7c307c4](https://github.com/beknobloch/Underbranch/commit/7c307c48792be77dff1fef3b36d834fd601f72d7))
* **UX:** closing Underbranch now automatically stops running containers and informs the user with a pop-up window ([654acfd](https://github.com/beknobloch/Underbranch/commit/654acfdb4db6800602ef5371daaea5a331f024a1))

# [1.4.0](https://github.com/beknobloch/overleaf-toolkit/compare/v1.3.1...v1.4.0) (2025-04-17)


### Bug Fixes

* **package.json:** remove duplicate reference to /src ([6ef4cbf](https://github.com/beknobloch/overleaf-toolkit/commit/6ef4cbf94a47ccaea37462d0677a9ae90894127d))


### Features

* **UX:** added loading window with status logs for better transparency on startup ([1e0ac17](https://github.com/beknobloch/overleaf-toolkit/commit/1e0ac17b9f5d5cd270eb3e3337f2fdc92fcdaba1))

## [1.3.1](https://github.com/beknobloch/overleaf-toolkit/compare/v1.3.0...v1.3.1) (2025-04-17)


### Bug Fixes

* **docker compose:** added proper quoting to DOCKER_BIN variable to prevent path issue ([417bf1b](https://github.com/beknobloch/overleaf-toolkit/commit/417bf1b4fa99498e6f650aed61d1dd952f508117))
* **updating TexLive:** fixed a syntax mistake with the cp command ([79b3227](https://github.com/beknobloch/overleaf-toolkit/commit/79b322718472db7a98e6b955a20413e1ddbdaa12))

# [1.3.0](https://github.com/beknobloch/overleaf-toolkit/compare/v1.2.10...v1.3.0) (2025-04-16)


### Bug Fixes

* **opening Docker:** refactored UBR_open-docker and added a maximum amount of time that Underbranch will wait for Docker to become available before failing (3 min) ([55fd46c](https://github.com/beknobloch/overleaf-toolkit/commit/55fd46c9a945e0b4b0a48b68a09d32d18b657274))
* **packages:** added check for docker installation in UBR_install-package ([9c75e4a](https://github.com/beknobloch/overleaf-toolkit/commit/9c75e4a47053ad4ddd71559412eff62853390c7a))
* **verifying port:** added maximum waiting time for the port to be verified before failing ([de9464f](https://github.com/beknobloch/overleaf-toolkit/commit/de9464f195a4e59da46821cb61c0bff5302ffdf6))


### Features

* **packages:** added UBR_install-package-wrapper to add support for installing packages on Windows using WSL ([76c839e](https://github.com/beknobloch/overleaf-toolkit/commit/76c839e292ce9d7a3a67222e4bb8d775b6bf99df))

## [1.2.10](https://github.com/beknobloch/overleaf-toolkit/compare/v1.2.9...v1.2.10) (2025-04-16)


### Bug Fixes

* **Windows:** Made fixes to main.js to avoid potential problems with launching on win32 ([a51d786](https://github.com/beknobloch/overleaf-toolkit/commit/a51d786ce8b4cea822e889e99ebd5e0aaef55966))

## [1.2.9](https://github.com/beknobloch/overleaf-toolkit/compare/v1.2.8...v1.2.9) (2025-04-15)


### Bug Fixes

* **docker:** modified the access locations for Docker images so that the installed application on MacOS has correct permissions ([e320e39](https://github.com/beknobloch/overleaf-toolkit/commit/e320e39a46b2f4d9300ab6353218613e8f5fd31c))

## [1.2.8](https://github.com/beknobloch/overleaf-toolkit/compare/v1.2.7...v1.2.8) (2025-04-10)


### Bug Fixes

* added missing import ([d7082eb](https://github.com/beknobloch/overleaf-toolkit/commit/d7082ebbf4d8504a10c214c2c8ce4f32c5fa9700))
* **bash:** Added support for using Git bash when starting Underbranch on Windows ([7bfbe93](https://github.com/beknobloch/overleaf-toolkit/commit/7bfbe93583761e03e3629e01e95b099f4dc96170))
* **bash:** variable name typo fixed ([0214fc2](https://github.com/beknobloch/overleaf-toolkit/commit/0214fc22dc6fc4a6e89e3d2187f471aa6fa7b21e))
* bug fix ([e8562eb](https://github.com/beknobloch/overleaf-toolkit/commit/e8562ebd45a00d34a054e70d29be00d7c52de884))
* **docker check:** add conditional to correctly check the existence of a Docker installation for Windows users ([72afec1](https://github.com/beknobloch/overleaf-toolkit/commit/72afec1953cb58b80bdb009e0cb7be59d22a7bb1))
* **packages:** installing packages in prod ([fed1040](https://github.com/beknobloch/overleaf-toolkit/commit/fed1040f8995e506596dfd701b88b161be1a21ac))
* replaced incorrect variable reference ([977c9a4](https://github.com/beknobloch/overleaf-toolkit/commit/977c9a46b889d944c44e2a5786ae348463bf1d33))

## [1.2.7](https://github.com/beknobloch/overleaf-toolkit/compare/v1.2.6...v1.2.7) (2025-03-13)


### Bug Fixes

* **docker:** finished making scripts agnostic to OS ([dd9b955](https://github.com/beknobloch/overleaf-toolkit/commit/dd9b9551111710f01047b4ea140e61aba2f8c676))

## [1.2.6](https://github.com/beknobloch/overleaf-toolkit/compare/v1.2.5...v1.2.6) (2025-03-13)


### Bug Fixes

* **docker:** made scripts agnostic to both Docker installation location and OS when opening Docker Desktop ([eed6a14](https://github.com/beknobloch/overleaf-toolkit/commit/eed6a14bfed9db3e09bdb1fcf34b625b0849a2c5))

## [1.2.5](https://github.com/beknobloch/overleaf-toolkit/compare/v1.2.4...v1.2.5) (2025-03-13)


### Bug Fixes

* **release:** added GitHub access token to test builds ([7260825](https://github.com/beknobloch/overleaf-toolkit/commit/7260825c749e778e1623a87a067edbadcb9189a9))

## [1.2.4](https://github.com/beknobloch/overleaf-toolkit/compare/v1.2.3...v1.2.4) (2025-03-12)


### Bug Fixes

* **release:** corrected icon.ico format ([19c2d5f](https://github.com/beknobloch/overleaf-toolkit/commit/19c2d5f82dc9b7fac0e317505314ca306d8df4df))

## [1.2.3](https://github.com/beknobloch/overleaf-toolkit/compare/v1.2.2...v1.2.3) (2025-03-12)


### Bug Fixes

* **release:** removed bad specification from package.json ([9704e25](https://github.com/beknobloch/overleaf-toolkit/commit/9704e2548e2350546734a40548c2a141ec7a47dc))

## [1.2.2](https://github.com/beknobloch/overleaf-toolkit/compare/v1.2.1...v1.2.2) (2025-03-05)


### Bug Fixes

* **image creation:** fixed issue with images not being created ([80dd22c](https://github.com/beknobloch/overleaf-toolkit/commit/80dd22c10e2916ed57d628c658a9540b4bbfd864))

## [1.2.1](https://github.com/beknobloch/overleaf-toolkit/compare/v1.2.0...v1.2.1) (2025-02-27)


### Bug Fixes

* **installer:** add missing arrow element to MacOS visual installer ([51b6250](https://github.com/beknobloch/overleaf-toolkit/commit/51b6250fb4d81a54e51cec40bfd67e24110d7ce1))

# [1.2.0](https://github.com/beknobloch/overleaf-toolkit/compare/v1.1.0...v1.2.0) (2025-02-24)


### Features

* **MacOS:** added nicer MacOS installation visual ([c59aabb](https://github.com/beknobloch/overleaf-toolkit/commit/c59aabbf1f07964dd56508ed55d0609800490d63))

# [1.1.0](https://github.com/beknobloch/overleaf-toolkit/compare/v1.0.1...v1.1.0) (2025-02-24)


### Features

* **release:** repaired configurations for Windows nsis installer wizard ([3a2e83c](https://github.com/beknobloch/overleaf-toolkit/commit/3a2e83c08d27c69a3022bb440cf53b56beec840f))

## [1.0.1](https://github.com/beknobloch/overleaf-toolkit/compare/v1.0.0...v1.0.1) (2025-02-24)


### Bug Fixes

* **release:** corrected team name as test of automated release workflow ([59f7d91](https://github.com/beknobloch/overleaf-toolkit/commit/59f7d91511b291e74753a49d8e214adbec00956c))

# 1.0.0 (2025-02-24)


### Bug Fixes

* **nginx:** typo ([7f9f816](https://github.com/beknobloch/overleaf-toolkit/commit/7f9f81673b989d0d918fcd1d60c253cfe17bc9f7))
* **release:** add GitHub Actions token to build process ([d26526c](https://github.com/beknobloch/overleaf-toolkit/commit/d26526c048ac44c035813ceb2d02847a31c84247))
* **release:** fix to release.yaml ([31a345b](https://github.com/beknobloch/overleaf-toolkit/commit/31a345b56f6e54614c92d007a53b4843671d839b))

# Changelog

## 2024-10-29
### Added
- Pull new images from `bin/upgrade` ahead of stopping containers

## 2024-10-24
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `5.2.1`.
- Drop support for Docker Compose v1. [How to switch to Compose V2](https://docs.docker.com/compose/releases/migrate/#how-do-i-switch-to-compose-v2).
  Docker Compose v1 has reached its End Of Life in July 2023.

### Changed
- If set, the `overleaf.rc` entry `GIT_BRIDGE_IMAGE` must be specified without the version now.

  Example:
  ```diff
  -GIT_BRIDGE_IMAGE=my.registry.com/overleaf/git-bridge:5.1.1
  +GIT_BRIDGE_IMAGE=my.registry.com/overleaf/git-bridge
  ```

## 2024-09-24
### Added
- Print warning when running `bin/up` without detach mode

## 2024-09-11
### Added
- Add loud warning to `bin/doctor` when not using Sandboxed Compiles/`SIBLING_CONTAINERS_ENABLED=true`
- Add loud warning for using Community Edition with `SIBLING_CONTAINERS_ENABLED=true`

## 2024-09-03
### Added
- Add a new config option `OVERLEAF_LOG_PATH` for making [application logs](https://github.com/overleaf/overleaf/wiki/Log-files) available on the Docker host.

## 2024-08-27
### Added
- Surface `MONGO_VERSION` from `bin/doctor`

## 2024-08-20
### Fixed
- Fix unquoting of variables (e.g. `ALL_TEX_LIVE_DOCKER_IMAGES`)

## 2024-08-13
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `5.1.1`.

## 2024-07-30
### Added
- New `bin/run-script` command

## 2024-07-29
### Fixed
- Sandboxed Compiles is available for Server Pro only

## 2024-07-17
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `5.1.0`.

- `SIBLING_CONTAINERS_ENABLED` is now set to `true` for new installs in [`config-seed/overleaf.rc`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/overleaf.rc).

  We strongly recommend enabling the [Sandboxed Compiles feature](https://github.com/overleaf/toolkit/blob/master/doc/sandboxed-compiles.md) 
  for existing installations as well.
 
- Added "--appendonly yes" configuration to redis.

  Redis persistence documentation: https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/

- Updated mongo to 6.0 in [`config-seed/overleaf.rc`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/overleaf.rc).

  Mongo image name needs to be split between `MONGO_IMAGE` (with just the image name) and `MONGO_VERSION` in `config/overleaf.rc`.

## 2024-07-16
### Added
- Added support for Mongo 6.0.

## 2024-07-12
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `5.0.7`.
  :warning: This is a security release. Please check the [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes-5.x.x#server-pro-507) for details.

  Note: Server Pro version 4.2.7 contains the equivalent security update for the 4.x.x release line.

## 2024-06-21
### Added
- Added warning for usage of legacy docker-compose v1.

  docker-compose v1 has reached its End Of Life in July 2023 (https://docs.docker.com/compose/migrate/).
  Support for docker-compose v1 in the Overleaf Toolkit will be dropped with the release of Server Pro 5.2.
  We recommend upgrading to Docker Compose v2 before then.

- Added warning for usage of End Of Life Docker versions before v23

## 2024-06-20
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `5.0.6`.
  :warning: This is a security release. Please check the [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes-5.x.x#server-pro-506) for details.

  Note: Server Pro version 4.2.6 contains the equivalent security update for the 4.x.x release line.

## 2024-06-11
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `5.0.5`.
  :warning: This is a security release. Please check the [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes-5.x.x#server-pro-505) for details.

  Note: Server Pro version 4.2.5 contains the equivalent security update for the 4.x.x release line.

## 2024-05-27
### Added
- Pull TeX Live images from `bin/up`

  You can disable the automatic pulling using `SIBLING_CONTAINERS_PULL=false` in your `config/overleaf.rc` file.

## 2024-05-24
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `5.0.4`.
  :warning: This is a security release. Please check the [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes-5.x.x#server-pro-504) for details.

## 2024-05-08
### Added
- Add warning for using docker installing via `snap`.

## 2024-04-22
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `5.0.3`.

  :warning: This is a security release. This release also fixes a critical bug in a database migration as included in release 5.0.1. The recovery procedure for doc versions has been updated compared to 5.0.2. Please check the [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes-5.x.x#server-pro-503) for details.

  Note: Server Pro version 4.2.4 contains the equivalent security update for the 4.x.x release line.

## 2024-04-22
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `5.0.2`.

  :warning: This is a security release. This release also fixes a critical bug in a database migration as included in release 5.0.1. Please check the [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes-5.x.x#server-pro-502) for details.

  Note: Server Pro version 4.2.4 contains the equivalent security update for the 4.x.x release line.
### Fixed
- Retracted release 5.0.2

  :warning: We have identified a few corner cases in the recovery procedure for docs.

## 2024-04-18
### Fixed
- Retracted release 5.0.1

  :warning: We have identified a critical bug in a database migration that causes data loss. Please defer upgrading to release 5.0.1 until further notice on the mailing list. Please hold on to any backups that were taken prior to upgrading to version 5.0.1.

## 2024-04-09
### Added

- Print column headers from `bin/images`
- List Git Bridge images via `bin/images`

## 2024-04-02
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `5.0.1`.

  :warning: This is a major release. Please check the [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes-5.x.x#server-pro-501) for details.

- Rebranded 'SHARELATEX_' variables to 'OVERLEAF_'


## 2024-02-27
### Fixed

- Relaunch `bin/upgrade` after updating Toolkit code.

  We are planning to expand the scope of the `bin/upgrade` script in a following release and these changes need to be applied _while_ running `bin/upgrade`.

  With this release there is a one-time requirement that you choose "Yes" to "Perform code update?" and "No" to "Upgrade image?". After the Toolkit code has been updated, run `bin/upgrade` again and choose to upgrade the image.

## 2024-02-16
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.2.3`.

  :warning: This is a security release. Please check the [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes--4.x.x#server-pro-423) for details.

## 2024-02-14
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.2.2`.

  :warning: This is a security release. Please check the [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes--4.x.x#server-pro-422) for details.

## 2024-01-12
### Added
- Updated Mongo version from 4.4 to 5.0 in config seed. Documentation on Mongo updates can be found [here](https://github.com/overleaf/overleaf/wiki/Updating-Mongo-version).

## 2023-11-10
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.2.0`.

## 2023-11-02
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.1.6`.
  The previous release `4.1.5` is an important bug fix release for the history system, see the full [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes--4.x.x#server-pro-415).

## 2023-10-24
### Added
- `bin/logs`: Pick up logs from history-v1 and project-history
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.1.4`.

## 2023-10-06
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.1.3`.

## 2023-09-18

### Added
- Prepare for addition of web-api service in upcoming Server Pro 4.2 release.

## 2023-09-06
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.1.1`.

  This is a bug fix release, see the full [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes--4.x.x#server-pro-411).

## 2023-08-24
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.1.0`.

  :warning: This is a security release. Please check the [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes--4.x.x#server-pro-410) for details.

## 2023-08-11
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.0.6`.

  From the [release notes](https://github.com/overleaf/overleaf/wiki/Release-Notes--4.x.x#server-pro-406):

  - Bring back the [History Migration Cleanup Script](https://github.com/overleaf/overleaf/wiki/Full-Project-History-Migration#clean-up-legacy-history-data) with a fix to free up mongo storage space.

    > :warning: We advise customers to re-run the script again as per the documentation.

## 2023-07-28
### Added
- Added support for a version suffix of `-with-texlive-full` to be able to load a custom image with TeXLive full backed in.

  Server Pro customers: We strongly recommend using [Sandboxed compiles](https://github.com/overleaf/toolkit/blob/master/doc/sandboxed-compiles.md) instead of running a custom TeXLive full installation. Please reach out to us if you have any questions or need help with setting up Sandboxed compiles in Server Pro.

## 2023-07-20
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.0.5`.

## 2023-07-14
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.0.4`.

## 2023-06-29
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.0.3`.
- 

## 2023-06-08
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.0.2`.
- 
## 2023-05-30
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `4.0.1`.

## 2023-05-16
### Added
- Use Docker Compose v2 by default. Fall back to Docker Compose v1 if v2 is
  unavailable.
### Fixed
- Propagate the `REDIS_PORT` variable to the sharelatex container

## 2023-05-15
### Added
- Support listing container logs with `bin/logs` command
- `bin/logs -n all` shows all logs for a given service

## 2023-05-11
### Added
- Change the location of the git-bridge data directory to /data/git-bridge
  inside the container

## 2023-05-01
### Added
- Start Mongo in a replica set by default

## 2023-04-14
### Fixed
- Fix openssl invocation on OS X

## 2023-04-13
### Fixed
- Ensure git bridge is disabled by default

## 2023-04-10
### Added
- Git bridge support in Server Pro 4.x

## 2023-03-21
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `3.5.5`.

## 2023-03-20
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `3.5.4`.

## 2023-03-16
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `3.5.3`.

## 2023-03-07
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `3.5.2`.

## 2023-03-06
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `3.5.1`.

## 2023-02-28
### Added
- Add variables for S3
- Extend doctor script to flag incomplete S3 config

## 2023-02-10
### Added
- Increase SIGKILL timeout for docker container to enable graceful shutdown in version 3.5 onwards

## 2023-01-11
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `3.4.0`.

## 2022-11-15
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `3.3.2`.

## 2022-10-13
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `3.3.0`.

## 2022-09-22
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `3.2.2`.

## 2022-08-16
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to `3.2.0`.
- Updated Mongo version from 4.2 to 4.4. Documentation on Mongo updates can be found [here](https://github.com/overleaf/overleaf/wiki/Updating-Mongo-version).
- Print warning when `SHARELATEX_LISTEN_IP` is not defined.

## 2021-10-13
### Added
- HTTP to HTTPS redirection.
  - Listen mode of the `sharelatex` container now `localhost` only, so the value of `SHARELATEX_LISTEN_IP` must be set to the public IP address for direct container access. 

## 2021-08-12
### Added
- Server Pro: New variable to control LDAP and SAML, `EXTERNAL_AUTH`, which can
  be set to one of `ldap`, `saml`, `none`. This is the preferred way to activate
  LDAP and SAML.  For backward compatibility, if this is not set, we fall back
  to the legacy behaviour of inferring which module to activate from the
  relevant environment variables.
  - This should not affect current installations. Please contact support if you
    encounter any problems
  - See [LDAP](./doc/ldap.md) and [SAML](./doc/saml.md) documentation for more

## 2020-11-25
### Added
- `bin/upgrade` displays any changes to the changelog and prompts for
   confirmation before applying the remote changes to the local branch.
### Misc
- Fix code linting errors in bin/ scripts

## 2020-11-19
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to 2.5.0
- Updated Mongo version from 3.6 to 4.0. Documentation on Mongo updates can be found [here](https://github.com/overleaf/overleaf/wiki/Updating-Mongo-version).

## 2020-10-22
### Added
- Updated default [`version`](https://github.com/overleaf/toolkit/blob/master/lib/config-seed/version) to 2.4.2


## 2020-10-21
### Added
- `bin/up` now passes along any supplied flags to `docker-compose`,
  for example: `bin/up -d` will run in detached mode
- Documentation on how to update environment variables. ([documentation](./doc/configuration.md))
### Fixed
- A typo


## 2020-10-09
### Added
- Add `SHARELATEX_PORT` option to `overleaf.rc` file, which defaults
  to `80`, same as the previous hard-coded value. ([documentation](./doc/overleaf-rc.md))

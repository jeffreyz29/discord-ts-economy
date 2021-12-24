# New package version 0.1.5 `⭐`

## Breaking changes

- Economy class no only inherits other low level classes. They must be exported independently.

## New Features

- New method **Withdraw**

## Changes

- Removed async method from db connection functions
- Cache version bummed down
- Classes no long extend ManagerBase class
- Some methods converted to more caching and less native db calls

## Bug  fixes

- Cache system from Normal js map to discordjs/collection package
- spelling to reward class
- Maximum call stack size exceeded in db class
- Looped classes

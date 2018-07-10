# package.json

There are some **dependencies** and **devDependencies** in the _package.json_ file for which it may not be readily
understood why they are listed. This is the explanation:

## dependencies

Dependency | Reason
--- | ---
broccoli-babel-transpiler | Version ^5.7.2 depends on `babel-core@^5.0.0` while version `^6.1.2` depends on `babel-core@^6.14.0` and `7.0.0-beta.1` relies on `babel-core@^7.0.0-beta.0`.  Until we upgrade this repository to a version of `ember-cli` > `2.12.3` we cannot introduce a version of `babel-core` >= `6.0.0`
ember-hook | is used in the templates of this repository's components to facilitate building a hierarchical structure of hooks and as such needs to become part of the source code

## devDependencies

Dependency | Reason
--- | ---
n/a | n/a

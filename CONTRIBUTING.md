# Contributing

## Getting started

Read the readme.md file.

## Issues

If you encounter an issue, first search and see if an issue already exists.
If an issue doesn't exist, open a new issue using a relevant issue form.

## Contributing to code

1. Fork the repository.
2. Create a working branch and work on your changes.
3. Commit the changes once you are happy with them.
4. When you're finished with the changes, create a pull request, also known as a PR.

## Versioning

**Remember to bump the version depending on breaking, feature or patch in every pull request**

Use npm version to bump the major, minor or patch version.
See 'npm version -help' in the terminal

**The pipeline will on every push to main:**

1. Create a tag with the version for the commit.
2. Create a release with the tag and version. This will also generate release notes.
3. Pack an npm package with the version specified.
4. Publish the npm package.

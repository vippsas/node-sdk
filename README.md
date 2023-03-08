# vipps-node
The official Vipps Javascript SDK for the Checkout and Epayment APIs.

**Features**

- Serialization/deserialization
- Authentication
- Network retries
- Idempotency

### Versioning

**Remember to bump the version depending on breaking, feature or patch in every pull request**

Use npm version to bump the major, minor or patch version. 
See 'npm version -help' in the terminal

**The pipeline will on every push to main:**

1. Create a tag with the version for the commit.
2. Create a release with the tag and version. This will also generate release notes.
3. Pack an npm package with the version specified.
4. Publish the npm package.
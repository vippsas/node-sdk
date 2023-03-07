# vipps-node
The official Vipps Javascript SDK for the Checkout and Epayment APIs.

**Features**

- Serialization/deserialization
- Authentication
- Network retries
- Idempotency

### Versioning

The patch version (major.minor.patch) is automatically bumped on every main push using https://www.npmjs.com/package/nerdbank-gitversioning based on the number of commits since last minor.

**How to set major and minor version**

Edit the version in the version.json file's version field.

**The pipeline will on every push to main:**

1. Create a tag with the version for the commit.
2. Create a release with the tag and version. This will also generate release notes.
3. Pack an npm package with the version specified.
4. Publish the npm package.

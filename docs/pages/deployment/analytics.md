---
id: "analytics"
title: "Analytics"
sidebar_label: "Collecting Analytics"
sidebar_position: 1
---
<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
## Why does LunaSec need metricsConfig?
We chose to make LunaSec an open-source project because we believe that open-source is a requirement for production
software. As a consequence of this, we are unable to collect metricsConfig on usage as easily as a proprietary application
would be able to (like a hosting SaaS product).

Our compromise for this was to create metricsConfig that are published from a LunaSec deployment by default. We have made an
effort to make these metricsConfig as low impact as possible in order to minimize the security impact of us collecting them.
The metricsConfig we collect are listed below. We have made this backend server publicly available for you to audit and review
specifically because we wish to remain as transparent as possible about our collection of data and to earn your trust.

## Disabling Metrics
As the developers of LunaSec, we ask that you please leave metricsConfig enabled unless you have a specific reason to do so.
We have created LunaSec and made it freely available for anybody to use, modify, and otherwise derive value from because
we believe in open-source software. Leaving metricsConfig sharing enabled is one of the easiest ways for you to give back and
contribute to LunaSec.

If you must disable metricsConfig because of security reasons, or otherwise, and you would still like to give back to LunaSec,
then please consider [contacting us](https://www.lunasec.io/contact) about subscribing to our paid support plan. Paid
support includes early access to security patches _before_ we publish them to our open-source repo, as well as giving us
the monetary means to continue building and supporting LunaSec.

Should you wish to disable metricsConfig collection, it may be disabled by setting:
```yaml
lunasec:
  ...
metricsConfig:
  disable_usage_statistic: true
```
in your YAML before LunaSec is deployed. Setting this flag will disable deploying the Lambda that collects metricsConfig every
24 hours.

Regardless, thank you for using LunaSec and helping to improve the security of software across the world. We really
appreciate it!

## Metrics Collection Process Overview
Metrics are published from the Tokenizer to AWS CloudWatch by default.

Once per day (every 24 hours) a Lambda is triggered that reads the metricsConfig data from CloudWatch and generates a summary
of the metricsConfig data. This data is an _aggregate sum_ of the data from CloudWatch. That means that we don't collect
information about the specific events like what data was Tokenized, when exactly the Tokenization occurred, or any other
data related to your deployment that isn't listed below. We intentionally read the metricsConfig data, add it all together,
and then publish only the aggregate data.

We're an open-source data security company -- we're not Facebook. We don't want your data because your data does not
make us any money. We only use this data to track our success over time and to help remind us why building LunaSec is
valuable for the world.

*Metrics Collected:*
- Deployed Version
- Number of Tokens Created
- Number of Tokens Detokenized
- Number of Grants Issued
- Random Nonce (unique per deployment for us to track usage over time and to help us filter fraudulent data)

## Example Metrics Request
This is an example JSON blob of what the metricsConfig data actually looks like:
```json
{
  "version": "0.0.1",
  "stack_id": "3d9c49ce-8367-43ec-8884-568c8d43faec",
  "metricsConfig": {
    "tokenizeSuccess": 4,
    "tokenizeFailure": 0,
    "detokenizeSuccess": 2,
    "detokenizeFailure": 0,
    "createGrantSuccess": 2,
    "createGrantFailure": 0
  }
}
```

If you want to take a look at the exact data that's being submitted, you can review the JSON Schema validator. It's in
the `./lib/apigateway-request-models.ts` file.

### Useful commands for dev

* `yarn run build`   compile typescript to js
* `yarn run watch`   watch for changes and compile
* `yarn run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Acknowledgements
This was built using the TypeScript AWS CDK. Thank you, Amazon, for letting us skip writing CloudFormation!

AWS Services used:
- API Gateway (validates the request and then directly feeds it into the stream)
- Kinesis Firehose (packs the data up into compressed blobs that are dumped into S3)
- S3 (stored the compressed chunks of JSON in a way that can be queried, i.e. a basic data warehouse)
- Athena (used to query the data in a SQL-like way)

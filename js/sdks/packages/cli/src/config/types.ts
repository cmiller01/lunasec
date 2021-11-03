/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
export interface LunaSecStackConfigOptions {
  development: DevConfigOptions;
  production: DeploymentConfigOptions;
}

export interface DevConfigOptions {
  applicationFrontEnd: string;
  applicationBackEnd: string;
  sessionJWKSURL: string;
  signingKey: string;
  localStackUrl?: string;
  localBuildArtifacts?: boolean;
}

export const devConfigOptionsDefaults: DevConfigOptions = {
  applicationFrontEnd: 'http://localhost:3000',
  applicationBackEnd: 'http://localhost:3001',
  sessionJWKSURL: '',
  signingKey:
    'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2Z0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktnd2dnU2tBZ0VBQW9JQkFRQ1dmV1pXYWdoR01NWkQKaWxWeHl3SG5JbmNNVWkxUjczTXNWVGlkcXF4OFZnbkxBcklDd2ZqekJRZVFGZlJsRzZ1Y1FTaWEzR2FQY1gwSAo1MW41UXNWN2NtY1d0WU9NM3RjNFhIS2ZjbDllUEJWOFI4RFlYRmdzdkdEQm5GOFVXOXhZS0hhT2gwQ1U4N3JvCnNHMTVKc0NseVc5S2VudmhrY0pJU3Z3TVVLL3N0VG5SM1NnZjdHR3MzV0hwZ3U4c1l0dDBVVm1tL0RWMnNGcFgKc28yODVIeTNpb3h0eE4wT1BsOVk4R1lwbmxwamg3ZWtwZnoxSUZ6d0sxaDhGeDlJenU3aVRGMFlpMzZlUnJiMQpMSXBKZ0hGWXR6aHNVd283QmFQRFNCNzh0dWZDMFVTVkQ1SEpPanNCS1A2ZzByY0pFNUUwQnJGajQ3UHlvdlRSCnk3QzZqZG85QWdNQkFBRUNnZ0VBVGxSM01BT0F5d2dZS28rV2FlU0EyUTNYYVZKY3hJa2VLYlV5QXQ4VGFLUmYKOUlzeW5MemFGNlJHaTNqaC9MNnFWR3FWK0FWQVhPbDFhdWZBclQxVURTMCsrMUwvWmhPWGNuNnNLdElkVWE5MApmM3ZacE1Sc0lOenNmOW9rb3pRdFBMWFMvOXptZ0tGY2FFRnN1ZUt4NDVrMWxFNnNySHh4NDY4a0FrVDlUUGM3CkJpQ3d2REMwM1VCUUdJaFdESGZjZzJ5aTA3VzVLb01VNjZSS0ZxMk5WT1NwdW1Tb2VyMjVNLytKNFZCc05mb3MKeEM0eEc3aWRTNzZZa21JalBMZnZjelZRUk9xNDlnblBnMHE2SWpBZHN2TVNjMHBhYUlYNkVmRUU4K2Ewd3VoWgpqTWUxQWd1V09OMEs0ajZXeHIrT0UwMEJJNjB0akhNaVdsU2JNU3R6QVFLQmdRREhlSHdOUWQ4dE5tYlhPOXB4CmxtdFVwNENOZ09FZEp6b2ZlOG9tRzl2K2gxNGxUcjFOVkZPT3VaSFFsZUFXZnl6ZDZFdmpicDY1VU4wa1h0QnEKOFllNHY5dkJ3S2thL3d1ODJPS0dKMmQ3aTF4Z2U3YjFiSEt4VVQ2Y0F2bFU4cmYzQTEwdHp0MHNMaVlEbythTQo3R25JMkZVU2t3OTg1YU5SNnFKSUtTcFJHd0tCZ1FEQkkyQ3hkd1F3L3ZNVVZvcGN4TzZTMThzNklvODdJV0dVCnpnZXpqZUpIYW1VV3JaSWJRZ2txRU1aWVZSdFhpVXBDZEJySHpNd2pXWFBmN3pVQzRPdWZlZzhVYkJneTNhWUsKMHBzMHlXZTY4VUJpOEdTK2M0M2lhb0pnSGVwcW9ydHVUNlZvdFRJaEN0SnhKYTFNTEZoMHBQbitCN2RFakFocApLbmk4azcyUGh3S0JnUUNTT3p6T1IwVkNrd2hQcjl4VHUwOVNEejRKL3JxSnNkRkZkVzNjQkQ2Q1dXRG1mdFArCmxkeHYzSkVPVm1HaWZIYzY4MnAzQUFpeW1KcVdhRC9vdHNxbDRWbE1zRjRJb1lOTVhiK3JVOFhrWjJWQWdsRzkKbUZSNHM3UHZrYXFSNFNLR250dTNrbGpJWThpUWtKNmJIMUhwNE5aMU9JUjVMcXhOaUhLUjdrUE1rd0tCZ0NmTQpvNE5PZEVXb2MrenYvR2tyaDhJb3g4OCtDZWYwZEFoWEFJMUdvcWQyekVnRkVvT2Rjd2dCRnU1aTgxUnhqU1R1CmlnbzhNS0RrTVJXblZIUTRaeldnMEhTejViU3RxaWEyeVpieUhmY08rZWFwaFFrZUJOSHdndGROc3Qyd2xSRWgKUm9PeU94ZEdCS0dlVXZ6TWNwbnUyVGs0MjlJN1RReG0zU1IzQ1d3SEFvR0JBS1FIZitncCtFUmFOcDExdU1OQgo0b3hpbHhwaklqeE8wOTE2WnkyUWFxTjlqSGV1RFc5YmdyWDBjQm1kdExPMjdRZE9EekVwcloyd1h5SDRDSGkxClRsQzdnSksvYlNUSnYyQnpwcUtjOVVQbXpiMnhTeFJaRnBiQkp3KytnRnF4UFlST0NqRWpIc2lmaWJxSmFPdzAKZkN3dzA5SlJDTkVsUU40R2FwRElXUlQ5Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K',
  localStackUrl: 'http://localhost:4566',
  localBuildArtifacts: false,
};

export type LunaSecServices = 'tokenizer-backend' | 'secure-frame-frontend' | 'analytics-collector';

export type ServiceVersions = Record<LunaSecServices, string>;

export type MetricProvider = 'none' | 'aws_cloudwatch';

export interface MetricConfigOptions {
  disabled: boolean;
  provider: MetricProvider;
  disableUsageStatisticsMetrics: boolean;
}

export const metricConfigOptionsDefaults: MetricConfigOptions = {
  disabled: false,
  provider: 'aws_cloudwatch',
  disableUsageStatisticsMetrics: false,
};

export interface DeploymentConfigOptions {
  stackVersion?: string;
  applicationFrontEnd?: string;
  applicationBackEnd?: string;
  sessionPublicKey?: string;
  sessionJwksEndpoint?: string;
  frontEndAssetsFolder?: string;
  localStackUrl?: string;
  serviceVersions?: ServiceVersions;
  localBuildArtifacts?: boolean;
  metrics: MetricConfigOptions;
}

export const deploymentConfigOptionsDefaults: DeploymentConfigOptions = {
  metrics: metricConfigOptionsDefaults,
};

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
import fs from 'fs';
import path from 'path';

import {
  deploymentConfigOptionsDefaults,
  devConfigOptionsDefaults,
  LunaSecStackConfigOptions,
  metricConfigOptionsDefaults,
} from './types';

export function loadLunaSecStackConfig(): LunaSecStackConfigOptions | undefined {
  let searchPath = process.cwd();
  while (searchPath !== '/') {
    const files = fs.readdirSync(searchPath);

    const configFile = files.filter((f) => f === 'lunasec.js');
    if (configFile.length !== 1) {
      searchPath = path.join(searchPath, '../');
      continue;
    }

    const configPath = path.join(searchPath, 'lunasec');
    console.log(`Loaded LunaSec stack config: ${configPath}.js`);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require(configPath);
    const lunaseConfig = config as LunaSecStackConfigOptions;

    const productionConfig = lunaseConfig.production ? lunaseConfig.production : { metrics: {} };
    return {
      development: {
        ...devConfigOptionsDefaults,
        ...(lunaseConfig.development ? lunaseConfig.development : {}),
      },
      production: {
        ...deploymentConfigOptionsDefaults,
        ...productionConfig,
        metrics: {
          ...metricConfigOptionsDefaults,
          ...productionConfig.metrics,
        },
      },
    };
  }
  return undefined;
}
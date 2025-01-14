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

import { findFileMatchingPatternSync } from '../utils/filesystem';

import { SecureFrameAssetFiles } from './types';

export function getSecureFrameAssets(secureFrameAssetFolder: string): SecureFrameAssetFiles {
  const mainScriptPattern = new RegExp(/^main(\.[a-f0-9]+|-dev)\.js$/);
  const mainStylePattern = new RegExp(/^main(\.[a-f0-9]+|)\.css$/);

  const jsAssetFolder = path.join(secureFrameAssetFolder, 'js');

  const mainScriptFilename = findFileMatchingPatternSync(jsAssetFolder, mainScriptPattern);
  if (mainScriptFilename === undefined) {
    throw new Error('unable to locate main script in secure frame front end');
  }
  const mainStyleFilename = findFileMatchingPatternSync(secureFrameAssetFolder, mainStylePattern);
  if (mainStyleFilename === undefined) {
    throw new Error('unable to locate main style in secure frame front end');
  }

  const mainScriptContent = fs.readFileSync(path.join(jsAssetFolder, mainScriptFilename));
  const mainStyleContent = fs.readFileSync(path.join(secureFrameAssetFolder, mainStyleFilename));

  // TODO (cthompson) currently aws s3 deployment for the cdk is broken so this code won't help us atm
  // const zip = new AdmZip();
  //
  // zip.addFile(mainScript, mainScriptContent);
  // zip.addFile(mainScript, mainStyleContent);
  //
  // const zipFileName = `secureFrameAssets_${new Date().toISOString()}.zip`;
  // const zipPath = path.join(os.tmpdir(), zipFileName);
  //
  // zip.writeZip(zipPath);

  return {
    files: {
      mainScript: {
        filename: mainScriptFilename,
        content: mainScriptContent,
      },
      mainStyle: {
        filename: mainStyleFilename,
        content: mainStyleContent,
      },
    },
  };
}
